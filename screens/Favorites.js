import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useAuth } from "../context/AuthContext";
import { doc, onSnapshot, collection, query, where, getDocs } from "firebase/firestore";
import { database } from "../firebaseConfig";
import { styles } from "../theme/styles";

export default function Favorites() {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(null); // saves the user's name or null if not available

  useEffect(() => {
    if (!user?.uid) {
      setFavoritos([]);
      setLoading(false);
      return;
    }

    const userRef = doc(database, "users", user.uid);

    const unsubscribe = onSnapshot(userRef, async (userSnap) => {
      if (userSnap.exists()) {
        const userData = userSnap.data();

        // saves the user's name or null if not available
        setUserName(userData.name || null);

        const favoriteIds = userData.favorites || [];

        if (favoriteIds.length === 0) {
          setFavoritos([]);
          setLoading(false);
          return;
        }

        const eventsRef = collection(database, "events");
        const q = query(eventsRef, where("__name__", "in", favoriteIds.slice(0, 10)));
        const querySnapshot = await getDocs(q);

        const eventsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        const sortedEvents = eventsData.sort((a, b) => a.datetime.seconds - b.datetime.seconds);
        setFavoritos(sortedEvents);

      } else {
        setFavoritos([]);
        setUserName(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const renderItem = ({ item }) => (    
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => navigation.navigate("EventDetails", { event: item })}
    >      
        <View>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Text style={styles.cardText}>{new Date(item.datetime.seconds * 1000).toLocaleDateString()}</Text>
        </View>
        <Image source={{ uri: item.imageUrl }} style={styles.eventImage} />      
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff" }}>Loading favorites...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleSmall}>
        {userName ? userName : user?.email}'s Favorites
      </Text>
      {favoritos.length === 0 ? (
        <Text style={{ color: "#ccc" }}>You have no favorite events.</Text>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

