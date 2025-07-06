import { useState, useEffect, useCallback } from "react";
import { View, Text, Image, Alert, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { useAuth } from "../context/AuthContext";
import { getUserData, updateUserData } from "../services/utilizadorServices";
import { styles } from "../theme/styles";
import { CustomButton } from "../components/CustomButton";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { usePullToRefresh, useRefreshOnFocus } from "../hooks/useRefresh";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { database } from "../firebaseConfig";
import { Spacer1 } from "../components/Spacers";

export default function EventDetails({ route }) {
  const { event } = route.params;
  const { user } = useAuth();

  const [participating, setParticipating] = useState(false);
  const [participantsCount, setParticipantsCount] = useState(event.participants?.length || 0);
  const [isFavorite, setIsFavorite] = useState(false);

  const eventDate = new Date(event.datetime.seconds * 1000);
  const now = new Date();
  const isPast = eventDate < now;

  // Function to fetch user data and update participation and favorites state
  const fetchUserData = useCallback(async () => {
    if (!user) return;
    try {
      const userData = await getUserData(user.uid);
      setParticipating(userData.participations?.includes(event.id) ?? false);
      setIsFavorite(userData.favorites?.includes(event.id) ?? false);

      // Updates participant count if different
      if (event.participants?.length !== undefined) {
        setParticipantsCount(event.participants.length);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [user, event.id, event.participants]);

  // Call fetchUserData on mount and whenever the screen is focused
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useRefreshOnFocus(fetchUserData);

  const { refreshing, onRefresh } = usePullToRefresh(fetchUserData);

  const toggleParticipation = async () => {
    const eventRef = doc(database, "events", event.id);
    const userRef = doc(database, "users", user.uid);
    const joining = !participating;

    try {
      await updateDoc(eventRef, {
        participants: joining ? arrayUnion(user.uid) : arrayRemove(user.uid),
      });

      await updateDoc(userRef, {
        participations: joining ? arrayUnion(event.id) : arrayRemove(event.id),
      });

      setParticipating(joining);
      setParticipantsCount(count => count + (joining ? 1 : -1));
    } catch (error) {
      Alert.alert("Error", "Could not update the participation.");
    }
  };

  const toggleFavorite = async () => {
    if (!user) return;
    try {
      const userData = await getUserData(user.uid);
      const currentFavorites = userData.favorites || [];
      const updatedFavorites = currentFavorites.includes(event.id)
        ? currentFavorites.filter((id) => id !== event.id)
        : [...currentFavorites, event.id];

      await updateUserData(user.uid, { favorites: updatedFavorites });
      setIsFavorite(updatedFavorites.includes(event.id));
    } catch (error) {
      Alert.alert("Error", "Could not update the favorites.");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.cardWrapperDetails}>
        <Image source={{ uri: event.imageUrl }} style={styles.cardImageExtra} />
        <View style={styles.cardDetails}>
          <Text style={styles.titleSmall}>{event.title}</Text>
          <TouchableOpacity onPress={toggleFavorite}>
            <Entypo
              name={isFavorite ? "heart" : "heart-outlined"}
              size={32}
              color={isFavorite ? "#E91E63" : "#fff"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Spacer1/>

      <View style={styles.rowAlign}>
        <Ionicons name="time-outline" size={20} color="#a65e48" />
        <Text style={[styles.cardText, { marginLeft: 12 }]}>
          {eventDate.toLocaleString() || "No Date Available"}
        </Text>
      </View>
      <View style={styles.rowAlign}>
        <SimpleLineIcons name="location-pin" size={20} color="#a65e48" />
        <Text style={[styles.cardText, { marginLeft: 12 }]}>
          {event.location || "No Location Provided"}
        </Text>
      </View>
      <View style={styles.rowAlign}>
        <Ionicons name="people-circle-outline" size={20} color="#a65e48" />
        <Text style={[styles.cardText, { marginLeft: 12 }]}>
          Participants: {participantsCount}
        </Text>
      </View>

      <Spacer1/>

      <Text style={[styles.cardText, { marginLeft: 12 }]}>{event.description}</Text>

      <Spacer1/>

      {isPast ? (
        <CustomButton title="Event Closed" disabled />
      ) : (
        <CustomButton
          title={participating ? "Cancel Participation" : "Participate"}
          onPress={toggleParticipation}
        />
      )}
    </ScrollView>
  );
}

