import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HomeStyle } from "../styles/HomeStyle";
import Button from "./Button";
import ListItem from "./ListItem";

const ListComponent = ({ per_page = 10, post_type, fields }) => {
  const insets = useSafeAreaInsets();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isLastPageReached, setIsLastPageReached] = useState(false);

  const { isConnected = true } = NetInfo.useNetInfo();

  const fetchData = async () => {
    if ((isLastPageReached && page !== 1) || loading) return;

    try {
      setError(null);

      if (isConnected === null) {
        setError({ message: "No Internet Connection" });
        return;
      }

      setLoading(true);

      console.log("fetching data for page", page);
      const response = await axios.get(
        `https://savs-southend.org/wp-json/wp/v2/${post_type}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          params: {
            per_page: per_page,
            page: page,
            _fields: fields,
            act_format: "standard",
            _embed: true,
          },
        }
      );

      // if (response.data.length < 10) {
      //   // setIsLastPageReached(true);
      // }

      if (page === 1) {
        setData(response.data);
      } else {
        setData((prevData) => [...prevData, ...response.data]);
      }
    } catch (err) {
      console.log(`error in fetching data ${err}`);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // , [page, per_page, isLastPageReached, isConnected]);

  useEffect(() => {
    fetchData();
  }, []);

  const renderFooter = () => {
    if (isLastPageReached && data.length === 0) {
      return (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text>No data available.</Text>
        </View>
      );
    }

    if (loading) {
      return (
        <ActivityIndicator
          size="large"
          color="#b50096"
          style={{ margin: 10 }}
        />
      );
    }

    return null;
  };

  const onRefresh = () => {
    console.log("onRefresh activated");
    setPage(1);
    fetchData();
  };

  const onEndReached = () => {
    console.log(
      `reach end page ${page} and loading ${loading},end reached ${isLastPageReached}`
    );
    if (!isLastPageReached && !loading) {
      console.log("onEndReached activated", page);
      setPage((prevPage) => prevPage + 1);
      fetchData();
    }
  };

  return (
    <View style={[HomeStyle.container, { paddingTop: insets.top }]}>
      <FlatList
        data={data}
        initialNumToRender={per_page}
        refreshing={loading}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.5}
        keyExtractor={(item) => `${item.id}-${item.title.rendered}`}
        onEndReached={onEndReached}
        ListEmptyComponent={
          error?.message && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ textAlign: "center", fontSize: 20, marginTop: 20 }}
              >
                {error?.message}
              </Text>
            </View>
          )
        }
        renderItem={({ item }) => <ListItem item={item} />}
      />
      {error && (
        <Button
          title={error?.message || "Something went wrong"}
          bgcolour="#c20f08"
          onPress={() => {
            setPage(1);
            fetchData();
          }}
          ListComponent={true}
        />
      )}
    </View>
  );
};

export default ListComponent;
