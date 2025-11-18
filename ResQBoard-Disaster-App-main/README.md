# ResQBoard: Offline Disaster Communication App 🆘

### Avishkar 2025 University Level Entry

This is the official repository for ResQBoard, a PWA designed to solve the 'information blackout' during disasters. We're proud to have qualified for the **University Level** of the Avishkar research competition.

---

## 🚀 The Problem

In a major disaster, the first and most critical failure is communication. Mobile networks and the internet go down, leaving victims isolated and rescue teams working blind.

Our research identified two major gaps in existing solutions:
1.  **The Deployment Gap:** Most apps (like Bridgefy) are native apps that **must be pre-installed**, which is impossible in a crisis.
2.  **The Coordination Gap:** Local mesh apps don't have a reliable way to get data *out* of the disaster zone to a central command center.

## ✨ Our Solution

ResQBoard is a **hybrid Progressive Web App (PWA)** that solves both problems. It creates a local, peer-to-peer mesh network from scratch and acts as a bridge to the outside world.

### Key Features
* **Offline-First:** Loads instantly and saves all data on the device using `localStorage`. It works perfectly with **zero internet**.
* **Victim & ResQBoard UI:** A simple 2-tap "SOS" screen for victims under stress, and a powerful "Rescuer" dashboard for volunteers.
* **Proximity Sync:** A **Node.js + Socket.IO** server creates a local network (via mobile hotspot) to sync data between nearby devices in real-time.
* **Store-and-Forward Sync:** The app cleverly saves posts made offline and automatically syncs them the moment it reconnects to the network.
* **Gateway Mode:** When any device finds an internet signal, it becomes a "gateway," syncing all collected offline data to a central coordinator's map.

## 🛠️ Technology Stack
* **Frontend:** React (as a PWA)
* **Backend (Real-time Sync):** Node.js, Express, Socket.IO
* **Mapping:** Leaflet.js

## 🏃 How to Run This Project

This project is in two parts: the `server` and the `resqboard` (client) app.

**(Note: For the local demo, you must update the `SERVER_URL` in `src/App.js` with your laptop's local IP address from the hotspot network.)**

**1. Run the Backend Server:**
```bash
# From the main project folder
cd server
npm install
node index.js

# From the main project folder, open a new terminal
cd resqboard
npm install
npm start
