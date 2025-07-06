# Events App

Mobile events application developed by MrCenas.
App to list events where users can view details, participate/cancel participation, add/remove favorites, and authenticate via Firebase.
This project is open source and available for anyone to use, modify, and redistribute.

## Features

- User authentication via Firebase
- Event listing with image, date, and location
- Join or cancel participation in events
- Add or remove events from favorites
- Real-time updates using Firebase Firestore
- Intuitive interface with tab navigation
- Support for pull-to-refresh and refresh on screen focus

## Technologies Required/Used

- `React`
- `React Native`
- `Expo`
- `Firebase`
- `@react-native-firebase/app`
- `@react-native-firebase/auth`
- `@react-navigation/native`
- `@react-navigation/stack`
- `@react-navigation/bottom-tabs`
- `@expo/vector-icons`
- `@react-native-async-storage/async-storage`
- `@react-native-community/datetimepicker`
- `react-native-paper`
- `react-native-toast-message`
- `Context API`
- `Custom Hooks`

## Installation

### Prerequisites

- Node.js installed
- Expo CLI (`npm install -g expo-cli`)
- Firebase account configured

### Steps

1. Clone the repository:
   git clone https://github.com/your-username/events-app.git
   cd events-app

2. Install dependencies:
   npm install

3. Configure Firebase:

   - Create a Firebase project at https://console.firebase.google.com/
   - Enable Authentication (email/password)
   - Set up Firestore
   - Go to Project Settings > General > Your Apps, and copy the Firebase config into a firebaseConfig.js file (this file is not included in the repository for security):
     // firebaseConfig.js
     export const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
     };

4. Firestore Database Structure:
   The app uses three main Firestore collections: events, tasks, and users.

   **_Collection: events_**
   Each document represents an event, with the following fields:

   - datetime (timestamp)
   - description (string)
   - imageUrl (string)
   - location (string)
   - participants (array of user IDs)
   - title (string)

   **_Collection: tasks_**
   Each document represents a task related to a user, with fields:

   - completed (boolean)
   - createdAt (timestamp)
   - description (string)
   - userId (string)

   **_Collection: users_**
   Each document corresponds to a user, containing:

   - createdAt (timestamp)
   - email (string)
   - favorites (array of event IDs)
   - name (string)
   - participations (array of event IDs)

   **Notes**

   - The arrays (participants, favorites, participations) store IDs as strings.
   - Make sure your Firestore security rules allow users to read/write only what is appropriate.
   - Timestamps should be stored using Firestore's timestamp type for correct querying and sorting.

5. Start the application:
   npm start

## Screenshots

![Login](/screenshots/EventBuddySS1.png)
![Events](/screenshots/EventBuddySS2.png)
![Favorites](/screenshots/EventBuddySS3.png)
![Search](/screenshots/EventBuddySS4.png)
![Event](/screenshots/EventBuddySS5.png)

## Future Plans

- Integration of push notifications.
- Admin panel for creating and editing events.
- Filters and event search.
- Support for multiple languages.
- Dark/light mode.

## License

MIT License
This project is publicly available as open source, allowing use, redistribution, and modification.

**Note:** The file `firebaseConfig.js` containing sensitive Firebase configuration is not included in the repository. Each user should create their own local file to keep the application secure.
