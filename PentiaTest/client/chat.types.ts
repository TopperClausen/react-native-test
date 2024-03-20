export interface ChatDocument {
  id: string,
  title: string,
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
