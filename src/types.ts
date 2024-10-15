// ... (keep existing types)

export interface Notification {
  id: string
  message: string
  type: 'bid' | 'like' | 'comment'
  read: boolean
  timestamp: Date
}

// ... (keep other types)