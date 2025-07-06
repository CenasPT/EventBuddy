import { database } from "../firebaseConfig";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

// Get all events
export const getEvents = async () => {
  const eventsRef = collection(database, "events");
  const snapshot = await getDocs(eventsRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Update the participants of an event
export const updateEventParticipants = async (eventId, participants) => {
  const eventRef = doc(database, "events", eventId);
  await updateDoc(eventRef, { participants });
};
