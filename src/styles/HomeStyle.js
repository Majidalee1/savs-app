import { StyleSheet } from "react-native";

export const HomeStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#eee",
  },
  componentOne: {
    flex: 1,
  },
  componentTwo: {
    height: 40,
    backgroundColor: "#b50096",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  // Home Item style
  homeItemContainer: {
    marginBottom: 20,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 2,
  },
  homeItemImg: {
    width: "30%",
    height: 80,
    margin: 10,
    borderRadius: 10,
  },
  HomeItemTextContainer: {
    paddingRight: 10,
    width: "70%",
    flexDirection: "column",
    justifyContent: "space-between",
    flexShrink: 1,
    padding: 5,
  },
  HomeItemTitle: {
    fontSize: 17,
    fontWeight: "700",
    flexShrink: 1,
    textAlign: "left",
    color: "#333",
    padding: 1,
    flexWrap: "wrap",
  },
  HomeItemText_id: {
    fontSize: 13,
    alignSelf: "flex-end",
    fontWeight: "500",
    color: "#999",
  },
  HomeItemText: {
    fontSize: 13,
    color: "#999",
    fontWeight: "600",
  },
});
