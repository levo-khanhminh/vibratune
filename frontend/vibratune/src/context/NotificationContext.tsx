import React, { createContext, useContext, useState } from "react";
import { Notification } from "../components/Notification";

type NotificationType = "success" | "error" | "info";

interface NotificationContextType {
  notify: (message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);
type Props = {
  children?: React.ReactNode;
};
export const NotificationProvider = ({ children }: Props) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<NotificationType>("success");

  const notify = (message: string, type: NotificationType = "success") => {
    setMessage(message);
    setType(type);
    setVisible(true);
    // setTimeout(() => {
    //   setVisible(false);
    //   setMessage("");
    // }, 1000);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <Notification
        visible={visible}
        message={message}
        type={type}
        onHide={() => {
          setVisible(false);
          setMessage("");
        }}
      />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
