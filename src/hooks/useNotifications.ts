import { ReactNode, useCallback } from "react";
import { Store } from "react-notifications-component";

type NotificationProps = {
  title?: string;
  message?: ReactNode;
  type: "success" | "danger" | "info" | "default" | "warning";
  duration?: number;
};

function useNotifications() {
  const addNotification = useCallback(
    ({ message, title, type, duration = 5000 }: NotificationProps) => {
      return Store.addNotification({
        title,
        message,
        type,
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration,
          onScreen: true
        }
      });
    },
    []
  );

  const removeNotification = useCallback((notificationId: string) => {
    return Store.removeNotification(notificationId);
  }, []);

  const removeAllNotifications = useCallback(() => {
    Store.removeAllNotifications();
  }, []);

  return { addNotification, removeAllNotifications, removeNotification };
}

export default useNotifications;
