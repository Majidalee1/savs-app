import axios from "axios";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeItem from "../components/HomeItem";
import { HomeStyle } from "../styles/HomeStyle";

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const [Response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const getResponse = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://savs-southend.org/wp-json/wp/v2/posts",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          params: {
            per_page: 10,
            page: page,
          },
        }
      );

      if (page === 1) {
        setResponse(response.data);
      } else {
        setResponse((prev) => [...prev, ...response.data]);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const handleEndReached = () => {
    if (!loading) {
      const itemsLeft = Response.length - page * 10;
      if (itemsLeft <= 8) {
        setPage(page + 1);
        getResponse();
      }
    }
  };

  useMemo(() => {
    getResponse();
  }, []);

  return (
    <View style={[HomeStyle.container, { paddingTop: insets.top }]}>
      <View style={HomeStyle.componentOne}>
        <FlatList
          data={Response}
          extraData={Response}
          onPointerDown={() => console.log("down")}
          onEndReachedThreshold={0.5}
          keyExtractor={(contact, index) => String(index)}
          // key={(item) => console.log(item.id)}
          refreshing={loading}
          onRefresh={() => {
            setPage(1);
            getResponse();
          }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            loading ? (
              <ActivityIndicator
                size="large"
                color="#b50096"
                style={{ margin: 10 }}
              />
            ) : null
          }
          ListEmptyComponent={
            error ? (
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  margin: 10,
                  color: "red",
                  textAlign: "center",
                }}
                key={Math.random() * 10000}
              >
                {error?.message}
              </Text>
            ) : null
          }
          onEndReached={handleEndReached}
          renderItem={({ item, index }) => (
            <HomeItem item={item} key={item.id} />
          )}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
