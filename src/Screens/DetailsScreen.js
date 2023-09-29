import axios from "axios";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import RenderHtml from "react-native-render-html";
import { DetailStyle } from "../styles/DetailStyle";
import { acfToDate } from "../utils/DateSplitter";

const DetailsScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [Response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDetails = async () => {
    try {
      console.log({ id });
      setLoading(true);
      const response = await axios.get(
        `https://savs-southend.org/wp-json/wp/v2/event/16803`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
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
  }, [id]);

  const { year, month, day } = acfToDate(Response?.acf?.date);
  const {
    year: year2,
    month: month2,
    day: day2,
  } = acfToDate(Response?.acf?.date_to);

  const windowDimensions = useWindowDimensions();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView style={DetailStyle.container}>
        {loading ? (
          <View style={{ flex: 1, marginTop: 20, justifyContent: "center" }}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : error ? (
          <Text style={{ textAlign: "center", fontSize: 20 }}>
            {error.message || "Something went wrong"}
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
      <TouchableOpacity
        style={{
          backgroundColor: error ? "#c20f08" : "#218838",
          borderRadius: 30,
          margin: 10,
          padding: 10,
        }}
        onPress={() => {
          // navigation.navigate("Web", { url: Response?.link });
        }}
      >
        {error ? (
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              margin: 10,
              color: "white",
              textAlign: "center",
            }}
          >
            An error occured
          </Text>
        ) : (
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              margin: 10,
              color: "white",
              textAlign: "center",
            }}
          >
            {loading ? "Loading..." : "More infomation / Book"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default DetailsScreen;
