import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";
import { getEvents } from "../services/eventosServices";
import { getUserData, updateUserData } from "../services/utilizadorServices";
import { useNavigation } from "@react-navigation/native";
import { usePullToRefresh, useRefreshOnFocus } from "../hooks/useRefresh";
import { styles } from "../theme/styles";
import { BlurView } from "expo-blur";
import Entypo from '@expo/vector-icons/Entypo';

export default function EventsList() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const fetchEvents = async () => {
    const data = await getEvents();
    data.sort((a, b) => b.datetime.seconds - a.datetime.seconds);
    setEvents(data);

    const userData = await getUserData(user.uid);
    setFavorites(userData.favorites || []);
  };

  const { refreshing, onRefresh } = usePullToRefresh(fetchEvents);
  useRefreshOnFocus(fetchEvents);

  useEffect(() => {
    fetchEvents();
  }, []);

  const toggleFavorite = async (eventId) => {
    const userData = await getUserData(user.uid);
    const currentFavorites = userData.favorites || [];
    const updatedFavorites = currentFavorites.includes(eventId)
      ? currentFavorites.filter((id) => id !== eventId)
      : [...currentFavorites, eventId];

    await updateUserData(user.uid, { favorites: updatedFavorites });
    setFavorites(updatedFavorites);
  };

  return (
    <FlatList
      style={styles.container}
      data={events}
      keyExtractor={(item) => item.id}
      refreshing={refreshing}
      onRefresh={onRefresh}
      renderItem={({ item }) => {
        return (
          <View style={styles.cardWrapper}>
              <TouchableOpacity
                style={{ flex: 1 }}
                activeOpacity={0.8}
                onPress={() => navigation.navigate("EventDetails", { event: item })}
              >
            <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
            <BlurView intensity={100} tint="dark" style={styles.blurBox}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardText}>{item.location}</Text>
              <Text style={styles.cardText}>
                {item.datetime ? new Date(item.datetime.seconds * 1000).toLocaleString() : "No Date Available"}
              </Text>
            </BlurView>
            </TouchableOpacity>
            <TouchableOpacity style={styles.favoriteIcon} onPress={() => toggleFavorite(item.id)}>
              <Entypo
                name={favorites.includes(item.id) ? "heart" : "heart-outlined"}
                size={32}
                color={favorites.includes(item.id) ? "#E91E63" : "#fff"}                
              />
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
}
