# ZenOrg - Minimal Notes & Internship Tracker App

A clean, minimal dual-purpose app built with React Native and Expo for managing notes and tracking internship applications.

## Features

### 📝 NOTES TAB
- Create, edit, and delete notes
- Home screen with list of all notes (title + preview)
- Long press to delete notes
- Local storage with AsyncStorage

### 💼 INTERNSHIPS TAB
- Track internship applications
- Each entry includes:
  - Company name
  - Role/position
  - Where applied (website or portal name)
  - Date applied
  - Status (Applied, Interview, Rejected, Offer)
  - Notes/remarks
- Tap an entry to view and edit it
- Long press to delete an entry
- Data saved locally with AsyncStorage

### 🎨 DESIGN
- Clean, minimal UI with bottom tab navigation
- Calm color palette (whites, soft greys, subtle accent colors)
- Status-based color coding for internship applications
- Smooth animations using React Native's Animated API only
- No splash screen library - uses Expo default

## Tech Stack

- React Native
- Expo
- AsyncStorage for local persistence
- TypeScript-free JavaScript for simplicity

## Constraints Followed

✅ NO react-native-reanimated  
✅ NO react-native-gesture-handler  
✅ NO rich text editors  
✅ Only core Expo-managed dependencies  
✅ Minimal dependency list  

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn
- Expo CLI
- Android device/emulator (for testing)

### Installation

1. Navigate to the project directory:
```bash
cd ZenOrg/ZenOrg
```

2. Install dependencies (already installed):
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on Android:
- Press `a` in the terminal to run on Android emulator
- Or scan the QR code with Expo Go app on your Android device

## Project Structure

```
ZenOrg/
├── src/
│   ├── components/
│   │   ├── FAB.tsx              # Floating Action Button
│   │   ├── NoteCard.tsx         # Note card component with delete
│   │   └── InternshipCard.tsx   # Internship card component
│   ├── screens/
│   │   ├── HomeScreen.tsx       # Notes list screen
│   │   ├── EditorScreen.tsx     # Note creation/editing screen
│   │   ├── InternshipsScreen.tsx # Internships list screen
│   │   └── InternshipEditor.tsx # Internship form screen
│   ├── storage/
│   │   └── storage.ts           # AsyncStorage operations
│   ├── styles/
│   │   └── theme.ts             # Color palette and styling constants
│   └── types/
│       └── index.ts             # TypeScript type definitions
├── App.js                       # Main app with tab navigation
└── package.json
```

## Usage

### Notes Tab

#### Creating a Note
1. Tap the floating action button (+) on the home screen
2. Enter a title and content
3. Tap "Save" in the top right corner

#### Editing a Note
1. Tap on any note from the notes list
2. Modify the content
3. Tap "Save" to save changes

#### Deleting a Note
1. Long press on a note card
2. Confirm deletion in the alert dialog

### Internships Tab

#### Adding an Application
1. Switch to the "Internships" tab at the bottom
2. Tap the floating action button (+)
3. Fill in the details:
   - Company Name (required)
   - Role/Position (required)
   - Where Applied (optional)
   - Date Applied (optional)
   - Status (tap to select from: Applied, Interview, Rejected, Offer)
   - Notes/Remarks (optional)
4. Tap "Save"

#### Editing an Application
1. Tap on any internship entry
2. Modify the details
3. Tap "Save" to save changes

#### Deleting an Application
1. Long press on an internship card
2. Confirm deletion in the alert dialog

## Design

The app features a calm, minimal design with status-based color coding:

### Colors
- **Background**: Soft white (#FAFAFA)
- **Surface**: Pure white (#FFFFFF) for cards
- **Text**: Dark grey (#2C2C2C) for primary text
- **Secondary Text**: Light grey (#757575)
- **Accent**: Subtle blue (#5C6BC0) for interactive elements

### Status Colors (Internships)
- **Applied**: Blue (#5C6BC0)
- **Interview**: Orange (#FFA726)
- **Rejected**: Red (#EF5350)
- **Offer**: Green (#66BB6A)

## Animations

All animations are built using React Native's native `Animated` API:
- Delete animations for cards
- Smooth transitions
- No external animation libraries used

## Navigation

The app uses a simple bottom tab navigation system:
- **Notes Tab**: Access your notes
- **Internships Tab**: Track your applications
- Tabs are hidden when editing to focus on content

## Dependencies

Minimal dependencies for a lightweight app:
- `expo` - Core Expo framework
- `expo-status-bar` - Status bar management
- `@react-native-async-storage/async-storage` - Local data persistence
- `react` - UI library
- `react-native` - Mobile framework

## License

MIT
