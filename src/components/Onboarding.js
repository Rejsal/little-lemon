import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./common/Header";
import Hero from "./common/Hero";
import { useState } from "react";
import Input from "./common/Input";
import Button from "./common/Button";
import { useAppContext } from "../provider/context";

const Onboarding = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { signup } = useAppContext();

  const submitForm = () => {
    signup({ name, email });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView>
          <Hero />
          <View style={styles.inputContainer}>
            <Input
              label={"Name*"}
              value={name}
              inputStyle={styles.inputStyle}
              placeholder={"Enter your Name"}
              onChangeText={(text) => setName(text)}
            />
            <Input
              label={"Email*"}
              value={email}
              keyboardType={"email-address"}
              inputStyle={styles.inputStyle}
              placeholder={"Enter your Email"}
              onChangeText={(text) => setEmail(text)}
            />
            <Button
              textStyles={styles.buttonTextStyle}
              buttonStyles={styles.buttonStyle}
              enabled={name && email}
              buttonTitle={"Next"}
              onClick={submitForm}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonStyle: {
    backgroundColor: "#495E57",
    marginTop: 35,
    alignSelf: "flex-start",
  },
  buttonTextStyle: { color: "#EDEFEE" },
  inputContainer: {
    paddingHorizontal: 16,
  },
  inputStyle: {
    marginTop: 30,
  },
});
