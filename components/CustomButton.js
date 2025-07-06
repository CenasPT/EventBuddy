import { TouchableOpacity, Text } from "react-native";

export function CustomButton({ title, onPress, disabled }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        {
            backgroundColor: disabled ? "#555" : "#fff",
            paddingVertical: 12,
            paddingHorizontal: 12,
            borderRadius: 2,
            alignItems: "center",
            marginVertical: 8,
            minWidth: 150,
            minHeight: 44,
        },
      ]}
    >
      <Text style={{ color: "black", fontWeight: "500", fontSize: 16 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

