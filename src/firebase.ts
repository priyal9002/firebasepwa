import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export async function requestNotificationPermission() {
  console.log("Requesting notification permission...");

  const status = await Notification.requestPermission();
  if (status !== "granted") {
    alert("Permission not granted.");
    return null;
  }

  const token = await getToken(messaging, {
    vapidKey: "YOUR_VAPID_KEY"
  });

  if (!token) {
    console.log("No FCM token.");
    return null;
  }

  console.log("FCM Token:", token);
  return token;
}

export function listenForegroundMessages() {
  onMessage(messaging, (payload) => {
    console.log("Foreground message:", payload);
    alert(`Notification: ${payload.notification?.title}`);
  });
}
