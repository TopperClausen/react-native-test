import { useEffect, useMemo, useState } from "react";
import { subscribeNotification } from "../../client/chat.client";
import { ChatNotification } from "../../client/chat.types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { push } from "../../client/push.client";

const NotificationContainer = () => {
  const [_notifications, _setNotifications] = useState<ChatNotification[]>([]);
  const state = useSelector((state: RootState) => state);

  const onUpdate = (data: ChatNotification[]) => {
    if (state.session.uid == null) return;
    _setNotifications(data);
  }

  const notifications = useMemo(() => {
    if (_notifications.length === 0) return _notifications;

    const userNotifications = _notifications.filter(notification => 
      notification.userId === state.session.uid &&
      notification.seenAt == null
    );

    return userNotifications;
  }, [_notifications])

  useEffect(() => {
    notifications.forEach(notifications => {
      push(notifications.title, notifications.body)
    })
  }, [notifications])

  subscribeNotification(onUpdate, () => {})
  
  return <></>
}

export default NotificationContainer;
