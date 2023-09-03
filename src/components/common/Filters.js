import { StyleSheet, View } from "react-native";
import Category from "./Category";

const Filters = ({ onChange, selections, sections }) => {
  return (
    <View style={styles.gap}>
      {sections.map((section, index) => (
        <Category
          key={index}
          onClick={() => onChange(index)}
          selected={selections[index]}
          category={section}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  gap: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Filters;
