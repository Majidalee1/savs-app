import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HomeStyle } from "../styles/HomeStyle";
import ListItem from "./ListItem";
import Button from "./Button";

const ListComponent = ({ per_page, post_type, fields }) => {
  const insets = useSafeAreaInsets();
  const [Response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isLastPageReached, setIsLastPageReached] = useState(false);

  const { isConnected } = NetInfo.useNetInfo();

  const getResponse = async () => {
    if (isLastPageReached && page != 1) return;
    try {
      setError(null);
      if (isConnected === null) {
        setError({ message: "No Internet Connection" });
        return;
      }
      setLoading(true);

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
            fields: fields,
          },
        }
      );

      if (response.data.length < 10) {
        setIsLastPageReached(true);
      }

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

  useMemo(() => {
    getResponse();
  }, [isConnected]);

  return (
    <View style={[HomeStyle.container, { paddingTop: insets.top }]}>
      <View style={HomeStyle.componentOne}>
        <FlatList
          data={Response}
          extraData={Response}
          onPointerDown={() => console.log("down")}
          onEndReachedThreshold={0.5}
          keyExtractor={(item) => String(item.id)}
          initialNumToRender={per_page}
          refreshing={loading}
          onRefresh={() => {
            setPage(1);
            getResponse();
          }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            Response.length > 0 &&
            loading && (
              <ActivityIndicator
                size="large"
                color="#b50096"
                style={{ margin: 10 }}
              />
            )
          }
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
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    marginTop: 20,
                  }}
                >
                  {error?.message}
                </Text>
              </View>
            )
          }
          onStartReachedThreshold={0.1}
          onEndReached={() => {
            if (Response.length === 0) return;
            setPage((prev) => prev + 1);
            getResponse();
          }}
          renderItem={({ item }) => <ListItem item={item} />}
        />
      </View>
      {error?.message === "No Internet Connection" && (
        <Button
          title="Please Check Internet Connection"
          bgcolour="#c20f08"
          onPress={() => {
            setPage(1);
            getResponse();
          }}
          ListComponent={true}
        />
      )}
    </View>
  );
};

export default ListComponent;
