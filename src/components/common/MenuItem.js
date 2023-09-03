import { Image, Text, View } from "react-native";

const MenuItem = ({ name, description, price, image }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
      }}
    >
      <View style={{ flex: 1, marginEnd: 16 }}>
        <Text style={{ fontSize: 18, color: "#333", fontWeight: "700" }}>
          {name}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "rgba(0,0,0,0.5)",
            fontWeight: "400",
            marginTop: 3,
          }}
        >
          {description}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "rgba(0,0,0,0.7)",
            fontWeight: "600",
            marginTop: 6,
          }}
        >
          ${price}
        </Text>
      </View>
      <Image
        style={{ width: 80, height: 80 }}
        source={{
          uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`,
        }}
      />
    </View>
  );
};

export default MenuItem;
