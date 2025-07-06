import { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Modal } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import FilteredEventsList from "../components/FilteredEventsList";
import { CustomButton } from "../components/CustomButton";
import { styles } from "../theme/styles";

export default function SearchScreen() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [activeFilters, setActiveFilters] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);

    if (event.type === "set") {
      setDate(selectedDate);
    } else if (event.type === "dismissed") {
      setDate(null);
    }
  };

  const handleSearch = () => {
    setActiveFilters({
      title: title.trim(),
      location: location.trim(),
      date: date ? date.toDateString() : null,
    });
    setModalVisible(false);
  };

  const clearFilters = () => {
    setTitle("");
    setLocation("");
    setDate(null);
  };

  const renderFiltersSummary = () => {
    if (!activeFilters) return "Search events...";
    const parts = [];
    if (activeFilters.title) parts.push(`Título: ${activeFilters.title}`);
    if (activeFilters.location) parts.push(`Local: ${activeFilters.location}`);
    if (activeFilters.date) parts.push(`Data: ${activeFilters.date}`);
    return parts.length > 0 ? parts.join(" | ") : "Search events...";
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.searchBox}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={{ color: activeFilters ? "#eee" : "#999" }}>
          {renderFiltersSummary()}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.TextRegular}>Title</Text>
            <TextInput
              style={styles.textInput}
              value={title}
              onChangeText={setTitle}
              placeholder="Search by title"
              placeholderTextColor="#999"
            />

            <Text style={styles.TextRegular}>Location</Text>
            <TextInput
              style={styles.textInput}
              value={location}
              onChangeText={setLocation}
              placeholder="Search by location"
              placeholderTextColor="#999"
            />

            <Text style={styles.TextRegular}>Date</Text>
            <TouchableOpacity
              style={styles.textInput}
              onPress={() => setShowDatePicker(true)}
              activeOpacity={0.7}
            >
              <Text style={{ color: date ? "#eee" : "#999" }}>
                {date ? date.toLocaleDateString() : "Select Date"}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={date || new Date()}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}

            <View style={styles.rowAlignSpaced}>
              <CustomButton
                title="Clear"
                onPress={clearFilters}
              />
              <CustomButton title="Search" onPress={handleSearch} />
            </View>

            <CustomButton
              title="Close"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>

      {activeFilters && <FilteredEventsList filters={activeFilters} />}
    </View>
  );
}
