import { Text, TouchableOpacity } from "react-native";

const Button = ({ title, bgcolour, ListComponent, ...props }) => {
  return (
    <TouchableOpacity
      {...props}
      style={{
        backgroundColor: bgcolour,
        borderRadius: ListComponent ? 10 : 30,
        margin: ListComponent ? 0 : 10,
        padding: ListComponent ? 0 : 10,
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 15,
          margin: 10,
          color: "white",
          textAlign: "center",
        }}
      >
        {title}
        {"\n"}
        {"Press to Retry"}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
