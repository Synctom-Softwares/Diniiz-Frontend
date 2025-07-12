import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { fireSocketEventCallbacks } from "./SocketEventRegistry";

const SocketContext = createContext();

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://diniiz-backend.onrender.com/";

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const isInitialized = !!token;
  useEffect(() => {
    if (!isInitialized) return;

    const newSocket = io(BASE_URL, {
      transports: ["websocket", "polling"],
      withCredentials: true,
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    const listeners = [
      ["connect", () => console.log("CONNECTED:", newSocket.id)],
      ["disconnect", () => console.log("DISCONNECTED")],
      ["online-users", (users) => console.log("Online users:", users)],
      ["socket-testing", () => console.log("socket-test")],
      ["plan-bought", () => fireSocketEventCallbacks("plan-bought")],
      ["new-booking", () => fireSocketEventCallbacks("new-booking")],
    ];

    // newSocket.on("connect", () => {
    //   console.log("CONNECTED:", newSocket.id);
    // });

    // newSocket.on("disconnect", () => {
    //   console.log("DISCONNECTED");
    // });

    // newSocket.on("online-users", (users) => {
    //   console.log("Online users:", users);
    // });

    // newSocket.on("socket-testing", () => {
    //   fireSocketEventCallbacks("socket-test");
    // });

    // newSocket.on("plan-bought", () => {
    //   fireSocketEventCallbacks("plan-bought");
    // });

    // newSocket.on("new-booking", () => {
    //   fireSocketEventCallbacks("new-booking");
    // });

    listeners.forEach(([event, handler]) => {
      newSocket.on(event, handler);
    });

    setSocket(newSocket);
    console.log("SOCKET CREATION", newSocket);
    return () => {
      listeners.forEach(([event, handler]) => {
        newSocket.off(event, handler);
      });
      newSocket.disconnect();
    };
  }, [isInitialized, token]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

export default SocketProvider;
