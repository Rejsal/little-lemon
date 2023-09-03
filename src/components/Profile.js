import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Header from "./common/Header";
import { useAppContext } from "../provider/context";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "./common/Input";
import Button from "./common/Button";
import { useState } from "react";

const Profile = ({ navigation }) => {
  const { profile, updateProfile, logout } = useAppContext();
  const [name, setName] = useState(profile?.name ?? "");
  const [email, setEmail] = useState(profile?.email ?? "");
  const [phone, setPhone] = useState(profile?.phone ?? "");

  const submitForm = () => {
    updateProfile({ name, email, phone });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        profile={profile}
        onClickProfile={() => {}}
        onClickBack={() => navigation.pop()}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView>
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
            <Input
              label={"Phone number*"}
              value={phone}
              inputStyle={styles.inputStyle}
              keyboardType={"phone-pad"}
              placeholder={"Enter your Phone number"}
              onChangeText={(text) => setPhone(text)}
            />
            <Button
              textStyles={styles.buttonTextStyle}
              buttonStyles={styles.buttonStyle}
              enabled={name && email && phone}
              buttonTitle={"Update profile"}
              onClick={submitForm}
            />
            <Button
              textStyles={styles.buttonTextStyle}
              buttonStyles={styles.buttonStyle}
              enabled={true}
              buttonTitle={"Logout"}
              onClick={() => {
                Alert.alert("", "Are you sure you want to logout?", [
                  {
                    text: "Logout",
                    onPress: () => logout(),
                  },
                  {
                    text: "Cancel",
                    onPress: () => {},
                  },
                ]);
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Profile;

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
