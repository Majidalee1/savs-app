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
        source={{
          uri:
            item._embedded["wp:featuredmedia"][0]?.media_details?.sizes
              ?.thumbnail?.source_url || "https://picsum.photos/200/300",
        }}
        style={HomeStyle.homeItemImg}
      />
      <View style={HomeStyle.HomeItemTextContainer}>
        <Text style={HomeStyle.HomeItemText_id}>{item?.id}</Text>

        <Text style={HomeStyle.HomeItemTitle}>{item?.title.rendered}</Text>

        <Text style={HomeStyle.HomeItemText}>{item.acf.date}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ListItem);
