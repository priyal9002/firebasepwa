import { useEffect, useState } from "react";
import {
  requestNotificationPermission,
  listenForegroundMessages
} from "./firebase";

function App() {
  const [token, setToken] = useState("");

  const getPermission = async () => {
    const token = await requestNotificationPermission();
    if (token) setToken(token);
  };

  useEffect(() => {
    listenForegroundMessages();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>React + Firebase Push Notifications</h1>

      <button onClick={getPermission}>Enable Notifications</button>

      {token && (
        <>
          <h3>Your FCM Token:</h3>
          <textarea
            rows={5}
            style={{ width: "100%" }}
            value={token}
            readOnly
          />
        </>
      )}
    </div>
  );
}

export default App;
