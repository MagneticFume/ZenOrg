# ZenOrg

![Platform](https://img.shields.io/badge/platform-Android-4f9cf9?style=flat-square)
![Language](https://img.shields.io/badge/language-JavaScript-fb923c?style=flat-square)
![Framework](https://img.shields.io/badge/framework-Expo%20Managed-a78bfa?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-4ade80?style=flat-square)
![Vibe](https://img.shields.io/badge/vibe%20coded-%E2%9A%A1-f87171?style=flat-square)

> Minimal notes & internship tracker — React Native + Expo

---

I needed a simple place to jot down notes and keep track of internship applications without anything getting in the way. Every app I tried was either too bloated or too opinionated, so I built this one myself.

Two tabs. Notes and internships. That's it. Nothing fancy, but it works for what I need it for.

> ⚡ **Vibe coded.** Built through AI-assisted development as a side project. Bugs are possible — no guarantees on a perfectly stable experience.

> 🚧 **Updates on hold.** New features will come once I finish learning React JS properly. Treating this as a checkpoint, not a finished product.

---

## Install

Grab the APK from the [Releases](../../releases) tab and sideload it on your Android device. No build setup needed.

---

## Features

### 📝 Notes
- Create, edit, and delete notes
- Title + preview on the home screen
- Long press to delete
- Saved locally with AsyncStorage

### 💼 Internship Tracker
- Company, role, portal, and date fields
- Status tracking: `Applied` → `Interview` → `Offer`
- Notes/remarks per application
- Tap to edit, long press to delete

---

## Status Colors

| Status | Color |
|--------|-------|
| Applied | 🔵 Blue |
| Interview | 🟠 Orange |
| Rejected | 🔴 Red |
| Offer | 🟢 Green |

---

## Tech Stack

| | |
|--|--|
| Framework | React Native, Expo (Managed) |
| Language | JavaScript |
| Persistence | @react-native-async-storage/async-storage |
| Navigation | Bottom Tab Navigator |

---

## License

MIT © [MagneticFume](https://github.com/MagneticFume)
