import { View, Text } from "react-native";
import React from "react";
import DetailsComponent from "../components/DetailsComponent";

const DetailsScreen = ({ route }) => {
  const { id } = route.params;

  return <DetailsComponent id={id} post_type="event" fields="id,title" />;
};

export default DetailsScreen;
