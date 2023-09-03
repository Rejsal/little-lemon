import { StyleSheet, Image, View, Text } from "react-native";
import Input from "./Input";
import { memo } from "react";

const Hero = ({ searchedValue, onSearch }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>Little Lemon</Text>
      <View style={styles.subView}>
        <View style={styles.titleView}>
          <Text style={styles.subTitleStyle}>Chicago</Text>
          <Text style={styles.descriptionStyle}>
            We are a family owned mediterranean restaurant, focused on
            traditional resipes served with a modern twist.
          </Text>
        </View>
        <Image
          style={styles.heroImage}
          source={require("../../../assets/HeroImage.png")}
        />
      </View>
      {onSearch ? (
        <Input
          inputStyle={{ marginTop: 16 }}
          placeholder={"Search"}
          onChangeText={onSearch}
          value={searchedValue}
        />
      ) : null}
    </View>
  );
};

export default memo(Hero);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#495E57",
  },
  subView: { flexDirection: "row", alignItems: "center" },
  titleView: { flex: 1, marginEnd: 16 },
  titleStyle: {
    fontSize: 40,
    color: "#F4CE14",
    fontWeight: "700",
  },
  subTitleStyle: {
    fontSize: 24,
    color: "#EDEFEE",
    fontWeight: "600",
  },
  descriptionStyle: {
    fontSize: 18,
    color: "#EDEFEE",
    marginTop: 15,
  },
  heroImage: { width: 110, height: 130, borderRadius: 6 },
});
