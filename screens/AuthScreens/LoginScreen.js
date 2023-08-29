import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = ({ navigation }) => {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  function handleEmailChange(email) {
    setEmail(email);
  }

  function handlePasswordChange(pass) {
    setPassword(pass);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <Text style={{ color: "white", fontSize: 38 }}>BuZZ</Text>
        <Text style={{ color: "white", fontSize: 34, fontWeight: 700 }}>
          Login
        </Text>
      </View>

      <View
        style={{ alignItems: "center", gap: 10, paddingTop: 40, width: "100%" }}
      >
        <TextInput
          placeholder="Email"
          placeholderTextColor={"rgba(0,0,0,.3)"}
          onChangeText={handleEmailChange}
          value={email}
          style={[styles.input, styles.email]}
        ></TextInput>
        <TextInput
          placeholder="Password"
          // secureTextEntry
          placeholderTextColor={"rgba(0,0,0,.3)"}
          onChangeText={handlePasswordChange}
          value={password}
          style={[styles.input, styles.password]}
        ></TextInput>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <Text style={{ fontSize: 15, color: "rgba(255,255,255,.6)" }}>
          Forgot Password?
        </Text>
      </View>

      <View style={styles.btn}>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            padding: 10,
          }}
        >
          Submit
        </Text>
      </View>
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "rgba(255,255,255,.3)",
          marginVertical: 10,
        }}
      />
      <View style={{ flexDirection: "row", gap: 3 }}>
        <Text style={{ color: "rgba(255,255,255,.4)", fontSize: 16 }}>
          Don't have an account?{" "}
        </Text>
        <Text
          onPress={() => navigation.navigate("Signup")}
          style={{
            color: "white",
            fontSize: 16,
            textDecorationLine: "underline",
          }}
        >
          Signup
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,.9)",
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    gap: 20,
  },
  head: { alignItems: "center", gap: 10 },

  input: {
    backgroundColor: "rgba(255,255,255,1)",
    width: "80%",
    padding: 15,
    fontSize: 20,
    borderRadius: 20,
  },
  btn: {
    backgroundColor: "black",
    borderColor: "white",
    paddingVertical: 10,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: "white",
    width: "80%",
    alignItems: "center",
  },
});
