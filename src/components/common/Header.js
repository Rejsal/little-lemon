import { StyleSheet, TouchableOpacity, Image, View, Text } from "react-native";

const Header = ({ profile, onClickBack, onClickProfile }) => {
  return (
    <View style={styles.container}>
      {onClickBack ? (
        <TouchableOpacity onPress={onClickBack}>
          <Image
            style={styles.backImage}
            source={require("../../../assets/back.png")}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.backImage} />
      )}
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          source={require("../../../assets/Logo.png")}
        />
      </View>
      {onClickProfile && profile && profile.image ? (
        <TouchableOpacity onPress={onClickProfile}>
          <Image style={styles.profileImage} source={{ uri: profile.image }} />
        </TouchableOpacity>
      ) : onClickProfile && profile && profile.name ? (
        <TouchableOpacity
          onPress={onClickProfile}
          style={styles.profileContainer}
        >
          <Text style={styles.profileTextStyle}>
            {profile?.name.substring(0, 1)}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.profileImage} />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#EDEFEE",
  },
  backImage: {
    height: 40,
    width: 40,
    resizeMode: "contain",
    tintColor: "#495E57",
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
  logoImage: {
    resizeMode: "contain",
    height: 50,
  },
  profileImage: {
    width: 40,
    height: 40,
    resizeMode: "cover",
    borderRadius: 20,
  },
  profileContainer: {
    width: 40,
    height: 40,
    resizeMode: "cover",
    borderRadius: 20,
    backgroundColor: "#495E57",
    alignItems: "center",
    justifyContent: "center",
  },
  profileTextStyle: {
    fontWeight: "500",
    textTransform: "capitalize",
    fontSize: 16,
    color: "#EDEFEE",
  },
});
