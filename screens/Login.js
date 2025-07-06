import { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { signIn } from "../services/firebaseAuth";
import { styles } from "../theme/styles";
import { CustomButton } from "../components/CustomButton";
import { Spacer1 } from "../components/Spacers";
import Toast from 'react-native-toast-message';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Campos obrigatórios',
        text2: 'Por favor, preencha email e password.',
      });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Toast.show({
        type: 'error',
        text1: 'Email inválido',
        text2: 'Por favor, introduza um email válido.',
      });
      return;
    }

    try {
      await signIn(email, password);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro no login',
        text2: error.message,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleSmall}>Login</Text>
      
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.textInput}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="email@example.com"
        placeholderTextColor="#888"
      />
      
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.textInput}
        placeholder="******"
        placeholderTextColor="#888"
      />

      <Spacer1 />

      <CustomButton title="Login" onPress={handleLogin}/>
      <View>        
        <CustomButton title="No account? Sign up!" onPress={() => navigation.navigate("Signup")}/>
      </View>
    </View>
  );
}

