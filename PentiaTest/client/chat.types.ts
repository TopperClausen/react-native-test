export interface Notification {
  notifications: ChatNotification[]
}

export interface ChatNotification {
  userId: string,
  title: string,
  body: string,
  seenAt: Date | null
}

export interface ChatDocument {
  id: string,
  title: string,
  description: string,
  svgUrl: string,
  messages: Message[]
}

export interface ChatUserData {
  uid: string
  imageUrl: string
  displayName: string
}

export interface Message {
  message: string
  sentAt: Date
  user: ChatUserData
}
