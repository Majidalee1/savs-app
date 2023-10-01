import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { HomeStyle } from "../styles/HomeStyle";
import { useNavigation } from "@react-navigation/native";

const ListItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        console.log(item.id);
        navigation.navigate("Details", { id: item?.id });
      }}
      style={HomeStyle.homeItemContainer}
    >
      <Image
        source={{ uri: item?.yoast_head_json?.og_image[0]?.url || "" }}
        style={HomeStyle.homeItemImg}
      />
      <View style={HomeStyle.HomeItemTextContainer}>
        <Text style={HomeStyle.HomeItemText_id}>{item?.id}</Text>

        <Text style={HomeStyle.HomeItemTitle}>
          {item?.yoast_head_json?.title}
        </Text>

        <Text style={HomeStyle.HomeItemText}>
          {item?.date?.split("T")[0]?.split("-")[0] +
            "-" +
            item?.date?.split("T")[0]?.split("-")[1] +
            "-" +
            item?.date?.split("T")[0]?.split("-")[2] || ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ListItem);
