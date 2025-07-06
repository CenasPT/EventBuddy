# Events App

Mobile events application developed by Rúben Vicente.
App to list events where users can view details, participate/cancel participation, add/remove favorites, and authenticate via Firebase.

## Required/Used

- `React Native`
- `Expo`
- `Firebase Authentication`
- `Firebase Firestore`
- `React Navigation`
- `Vector Icons (Entypo, Ionicons, SimpleLineIcons)`
- `Context API`
- `Pull-to-Refresh`
- `Custom Hooks (pull-to-refresh, refresh on focus)`

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
   - Copy your Firebase credentials into a firebaseConfig.js file (this file is not included in the repository for security):
     // firebaseConfig.js
     export const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
     };

4. Start the application:
   expo start

## Usage

This app was created to allow users to:

- View events with image, date, location, and description.
- Participate or cancel participation in events.
- Add or remove events from their favorites.
- Authenticate via email and password.
- Sync all interactions with Firebase in real-time.

This project is open source and available for anyone to use, modify, and redistribute.

## Main Dependencies

- expo
- firebase
- react-native
- @react-navigation/native
- @react-navigation/native-stack
- @expo/vector-icons

## Screenshots

TO BE ADDED

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
