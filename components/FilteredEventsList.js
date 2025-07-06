import { useEffect, useState, useCallback } from "react";
import { View, FlatList, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { getEvents } from "../services/eventosServices";
import { getUserData, updateUserData } from "../services/utilizadorServices";
import { useAuth } from "../context/AuthContext";
import { styles } from "../theme/styles";
import Entypo from '@expo/vector-icons/Entypo';
import { Spacer1 } from "../components/Spacers";

export default function FilteredEventsList({ filters }) {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const fetchData = useCallback(async () => {
    const data = await getEvents();
    data.sort((a, b) => b.datetime.seconds - a.datetime.seconds);
    setEvents(data);

    if (user) {
      const userData = await getUserData(user.uid);
      setFavorites(userData.favorites || []);
    } else {
      setFavorites([]);
    }
  }, [user]);

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused, fetchData]);

  useEffect(() => {
    if (!filters) {
      setFilteredEvents(events);
      return;
    }

    const { title, location, date } = filters;

    const filtered = events.filter((event) => {
      const matchesTitle = title
        ? event.title.toLowerCase().includes(title.toLowerCase())
        : true;

      const matchesLocation = location
        ? event.location.toLowerCase().includes(location.toLowerCase())
        : true;

      const matchesDate = date
        ? new Date(event.datetime.seconds * 1000).toDateString() === date
        : true;

      return matchesTitle && matchesLocation && matchesDate;
    });

    setFilteredEvents(filtered);
  }, [filters, events]);

  const toggleFavorite = async (eventId) => {
    if (!user) return;

    const userData = await getUserData(user.uid);
    const currentFavorites = userData.favorites || [];
    const updatedFavorites = currentFavorites.includes(eventId)
      ? currentFavorites.filter((id) => id !== eventId)
      : [...currentFavorites, eventId];

    await updateUserData(user.uid, { favorites: updatedFavorites });
    setFavorites(updatedFavorites);
  };

  if (filteredEvents.length === 0) {
    return <Text style={{ color: '#eee', marginTop: 20, textAlign: 'center' }}>No event found.</Text>;
  }

  return (
    <FlatList
      data={filteredEvents}
      keyExtractor={(item) => item.id}
      style={{ marginTop: 20 }}
      renderItem={({ item }) => {
        const isFavorite = favorites.includes(item.id);
        return (
          <View style={styles.container}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('EventDetails', { event: item })}
            >
              <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
              <View>
                <Text style={styles.titleSmall}>{item.title}</Text>
                <Text style={styles.cardText}>{item.location}</Text>
                <Text style={styles.cardText}>{new Date(item.datetime.seconds * 1000).toLocaleString()}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.favoriteIcon}
              onPress={() => toggleFavorite(item.id)}
            >
              <Entypo
                name={isFavorite ? "heart" : "heart-outlined"}
                size={30}
                color={isFavorite ? "#E91E63" : "#fff"}
              />
            </TouchableOpacity>
            <Spacer1 />
          </View>
        );
      }}
    />
  );
}
