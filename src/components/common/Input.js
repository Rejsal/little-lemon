import { StyleSheet, Text, TextInput, View } from "react-native";

const Input = ({
  label,
  placeholder,
  onChangeText,
  value,
  error,
  keyboardType,
  inputStyle,
}) => {
  return (
    <View style={inputStyle}>
      <Text style={styles.labelStyle}>{label}</Text>
      <View style={styles.container}>
        <TextInput
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType ?? "default"}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EDEFEE",
    padding: 16,
    borderWidth: 1,
    borderColor: "#495E57",
    borderRadius: 6,
  },
  labelStyle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 6,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 3,
    marginStart: 3,
  },
});
