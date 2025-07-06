import { View, Text, StyleSheet, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export const toastConfig = {
  error: ({ text1, text2 }) => (
    <View style={[styles.toastContainer, styles.errorBackground]}>
      <MaterialIcons name="error-outline" size={28} color="#ff6b6b" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.toastTitle}>{text1}</Text>
        {text2 ? <Text style={styles.toastMessage}>{text2}</Text> : null}
      </View>
    </View>
  ),
  success: ({ text1, text2 }) => (
    <View style={[styles.toastContainer, styles.successBackground]}>
      <MaterialIcons name="check-circle-outline" size={28} color="#66ff99" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.toastTitle}>{text1}</Text>
        {text2 ? <Text style={styles.toastMessage}>{text2}</Text> : null}
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: width - 40,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 2,
    backgroundColor: "#222",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
    alignSelf: "center",
    marginHorizontal: 20,
  },
  errorBackground: {
    borderLeftWidth: 1,
    borderLeftColor: "#ff4f4f",
  },
  successBackground: {
    borderLeftWidth: 1,
    borderLeftColor: "#4ade80",
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flexShrink: 1,
  },
  toastTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 2,
  },
  toastMessage: {
    fontSize: 12,
    color: "#ccc",
  },
});

