import { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { signUp } from "../services/firebaseAuth";
import { styles } from "../theme/styles";
import { CustomButton } from "../components/CustomButton";
import Toast from "react-native-toast-message";
import { Spacer1 } from "../components/Spacers";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Toast.show({
        type: "error",
        text1: "Required fields",
        text2: "Please fill in name, email, and password.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Toast.show({
        type: "error",
        text1: "Invalid email",
        text2: "Please enter a valid email.",
      });
      return;
    }

    if (password.length < 6) {
      Toast.show({
        type: "error",
        text1: "Weak password",
        text2: "The password must be at least 6 characters long.",
      });
      return;
    }

    try {
      await signUp(email, password, name);
      Toast.show({
        type: "success",
        text1: "Account created",
        text2: "Welcome!",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Registration error",
        text2: error.message,
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.textInput}
        placeholder="Your Name"
        placeholderTextColor="#999"
      />

      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.textInput}
        placeholder="Your Email"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#999"
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.textInput}
        placeholder="Your Password"
        placeholderTextColor="#999"
      />

      <Spacer1 />

      <CustomButton title="Sign Up" onPress={handleSignUp} />
      <View>
        <CustomButton
          title="Have an account? Login!"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </View>
  );
}
