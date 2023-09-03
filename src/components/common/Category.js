import { StyleSheet, TouchableOpacity, Text } from "react-native";

const Category = ({ category, selected, onClick }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[
        styles.container,
        { backgroundColor: selected ? "#495E57" : "rgba(0,0,0,0.1)" },
      ]}
    >
      <Text
        style={[styles.textStyle, { color: selected ? "#EDEFEE" : "#495E57" }]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  textStyle: {
    fontWeight: "700",
  },
});
