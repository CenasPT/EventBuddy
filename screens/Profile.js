import { useState, useEffect } from "react";
import { View, Text, Alert, ActivityIndicator, TextInput, Modal, Pressable } from "react-native";
import { useAuth } from "../context/AuthContext";
import { styles } from "../theme/styles";
import { CustomButton } from "../components/CustomButton";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { database } from "../firebaseConfig";
import Toast from 'react-native-toast-message';
import { Spacer2 } from "../components/Spacers";

export default function Profile() {
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      if (!user?.uid) return;
      setLoading(true);
      setError(null);
      try {
        const userRef = doc(database, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
          setNewName(userSnap.data().name || "");
        } else {
          setError("User data not found.");
        }
      } catch (e) {
        setError("Error loading profile data.");
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, [user]);

  function confirmLogout() {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            logout();
            Toast.show({
              type: "success",
              text1: "Session ended",
              text2: "Logout successful.",
              visibilityTime: 2000,
            });
          },
        },
      ]
    );
  }

  async function saveName() {
    if (!newName.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Name',
        text2: 'Please enter a valid name.',
      });
      return;
    }
    try {
      const userRef = doc(database, "users", user.uid);
      await updateDoc(userRef, { name: newName.trim() });
      setUserData((prev) => ({ ...prev, name: newName.trim() }));
      setEditModalVisible(false);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Name updated successfully.',
      });
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Not possible to update name. Please try again later.',
      });
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fe6635" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={[styles.TextRegular, { color: "red", marginBottom: 20 }]}>{error}</Text>
        <CustomButton title="Try Again" onPress={() => setError(null)} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleSmall}>User Profile</Text>

      <Text style={styles.TextRegular}>
        Name: {userData.name || "No name"}{" "}
        <Text
          style={{ color: "#fe6635", fontWeight: "bold" }}
          onPress={() => setEditModalVisible(true)}
        >
          (Edit)
        </Text>
      </Text>

      <Text style={styles.TextRegular}>Email: {user?.email ?? "No email"}</Text>

      <Text style={styles.TextRegular}>
        Account created at:{" "}
        {userData.createdAt
          ? new Date(userData.createdAt.seconds * 1000).toLocaleString()
          : "No date available"}
      </Text>

      <Spacer2 />

      <CustomButton title="Logout" onPress={confirmLogout} />

      {/* Modal para editar nome com estilo do SearchScreen */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.label}>Edit Name</Text>
            <TextInput
              style={styles.textInput}
              value={newName}
              onChangeText={setNewName}
              placeholder="New name"
              placeholderTextColor="#999"
            />

            <View style={{ marginTop: 12, flexDirection: "row", justifyContent: "space-between" }}>
              <CustomButton
                title="Cancel"
                onPress={() => setEditModalVisible(false)}
                style={{ flex: 1, marginRight: 8 }}
              />
              <CustomButton
                title="Save"
                onPress={saveName}
                style={{ flex: 1 }}
              />
            </View>

            <Pressable onPress={() => setEditModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
