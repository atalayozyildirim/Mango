import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useSession() {
  const [user, setUser] = React.useState<any | null>(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      const SessionUser = await fetch("http://192.168.1.39:5000/auth/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        const data = res.json();
        if (res.status !== 200) {
          AsyncStorage.removeItem("user");
          return null;
        }
        setUser(data);
        AsyncStorage.setItem("user", JSON.stringify(data));
      });
    };

    fetchUser();
  }, [user]);

  return { user };
}
