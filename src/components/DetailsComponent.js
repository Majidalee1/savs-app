import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import RenderHtml from "react-native-render-html";
import Button from "../components/Button";
import { DetailStyle } from "../styles/DetailStyle";
import { acfToDate } from "../utils/DateSplitter";
import { useNavigation } from "@react-navigation/native";
import SkeletonPlaceholder from "expo-react-native-skeleton-placeholder";

const DetailsComponent = ({ post_type, id, fields }) => {
  const navigation = useNavigation();
  const [Response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { isConnected } = NetInfo.useNetInfo();

  const fetchDetails = async () => {
    try {
      setError(null);
      if (isConnected === null) {
        setError({ message: "No Internet Connection" });
        return;
      }

      setLoading(true);
      const response = await axios.get(
        `https://savs-southend.org/wp-json/wp/v2/${post_type}/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          params: {
            fields: fields,
          },
        }
      );
      setResponse(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useMemo(() => {
    fetchDetails();
  }, [id, isConnected]);

  const { year, month, day } = acfToDate(Response?.acf?.date || "");
  const {
    year: year2,
    month: month2,
    day: day2,
  } = acfToDate(Response?.acf?.date_to || "");

  const windowDimensions = useWindowDimensions();

  const RecallApi = () => {
    if (!loading) {
      console.log("recall api");
      fetchDetails();
    } else if (!loading && !error) {
      navigation.navigate("webview", {
        url: Response?.acf?.booking_link || "",
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView
        style={DetailStyle.container}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <SkeletonPlaceholder
            highlightColor="#F5F5F5"
            angle={-30}
            shimmerWidth={windowDimensions.width}
            enabled={true}
            direction="right"
            borderRadius={25}
            speed={900}
            backgroundColor="#EAEAEA"
          >
            <View
              style={{
                marginHorizontal: 20,
                marginTop: 10,
              }}
            >
              <SkeletonPlaceholder.Item height={253} />
            </View>
            <View
              style={{
                flex: 1,
                margin: 20,
              }}
            >
              <SkeletonPlaceholder.Item
                width={"100%"}
                height={450}
                marginBottom={10}
              />
            </View>
          </SkeletonPlaceholder>
        ) : error ? (
          <Text style={{ textAlign: "center", fontSize: 20 }}>
            {error?.message || "Something went wrong"}
          </Text>
        ) : (
          <>
            <View style={DetailStyle.ImageContainer}>
              <Image
                source={{
                  uri: Response?.yoast_head_json?.og_image[0]?.url || "",
                }}
                style={DetailStyle.Image}
              />
            </View>
            <View style={DetailStyle.textContainer}>
              <Text style={DetailStyle.Title}>
                {Response?.yoast_head_json?.title || ""}
              </Text>
              <Text style={DetailStyle.Date}>
                <Text style={{ fontWeight: "bold" }}>Date: </Text>
                {day + "-" + month + "-" + year} from{" "}
                {day2 + "-" + month2 + "-" + year2}
              </Text>
              {Response?.acf?.time_from && (
                <Text style={DetailStyle.Date}>
                  <Text style={{ fontWeight: "bold" }}>Time: </Text>
                  {Response?.acf?.time_from || ""}
                </Text>
              )}

              <Text style={DetailStyle.Price}>
                <Text style={{ fontWeight: "bold" }}>Price: </Text>
                {Response?.acf?.price || ""}
              </Text>
              <Text style={DetailStyle.Organizer}>
                <Text style={{ fontWeight: "bold" }}>Organizer: </Text>
                {Response?.acf?.organiser || ""}
              </Text>
              <Text style={DetailStyle.Location}>
                <Text style={{ fontWeight: "bold" }}>Location: </Text>
                {Response?.acf?.location || ""}
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                Description:
              </Text>
              <RenderHtml
                source={{ html: Response?.content?.rendered || "" }}
                contentWidth={windowDimensions.width}
              />
            </View>
          </>
        )}
      </ScrollView>

      <Button
        title={
          loading
            ? "Loading..."
            : error
            ? "Try Again"
            : error?.message === "No Internet Connection"
            ? "No Internet Connection"
            : "More infomation / Book"
        }
        bgcolour={
          error
            ? "#c20f08"
            : error?.message === "No Internet Connection"
            ? "#c20f08"
            : loading
            ? "#218834"
            : "#b50096"
        }
        onPress={RecallApi}
      />
    </View>
  );
};

export default DetailsComponent;
