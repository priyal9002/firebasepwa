import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDwIdoVSoXaZ-UrjZ6IJQL_gLYEl3QfX54",
  authDomain: "fir-notification-c54f7.firebaseapp.com",
  projectId: "fir-notification-c54f7",
  storageBucket: "fir-notification-c54f7.firebasestorage.app",
  messagingSenderId: "307625421454",
  appId: "1:307625421454:web:c6972d17ae6b170f1637df",
  measurementId: "G-9SNPNQEZQ1",
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export async function requestNotificationPermission() {
  console.log("Requesting notification permission...");

  const status = await Notification.requestPermission();
  console.log(status)
  if (status !== "granted") {
    alert("Permission not granted.");
    return null;
  }

  const token = await getToken(messaging, {
    vapidKey: "BIN1-b8kmOMmwwjyicy9mSEBSv_5L10JuN3oWEdQ8WqluV2_AgnyjQxyX1J1O_P_ceCzy9r9ms9C1wjZspnehcM",
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
