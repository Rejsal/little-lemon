import { StyleSheet, TouchableOpacity, Text } from "react-native";

const Button = ({
  buttonStyles,
  textStyles,
  buttonTitle,
  onClick,
  enabled,
}) => {
  return (
    <TouchableOpacity
      disabled={!enabled}
      onPress={onClick}
      style={[
        styles.container,
        buttonStyles,
        !enabled ? { backgroundColor: "rgba(0,0,0,0.2)" } : {},
      ]}
    >
      <Text style={[styles.textStyle, textStyles]}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 4,
  },
  textStyle: {
    fontWeight: "600",
    fontSize: 16,
  },
});
