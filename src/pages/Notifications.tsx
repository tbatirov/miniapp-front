import React from 'react'
import { useAuction } from '../context/AuctionContext'
import { Bell, Heart, MessageCircle } from 'lucide-react'

const Notifications: React.FC = () => {
  const { notifications, markNotificationAsRead } = useAuction()

  const getNotificationIcon = (type: 'bid' | 'like' | 'comment') => {
    switch (type) {
      case 'bid':
        return <Bell size={20} className="text-blue-500" />
      case 'like':
        return <Heart size={20} className="text-red-500" />
      case 'comment':
        return <MessageCircle size={20} className="text-green-500" />
    }
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map(notification => (
            <li
              key={notification.id}
              className={`p-4 rounded-lg shadow transition-colors duration-200 ${
                notification.read ? 'bg-gray-100' : 'bg-white border-l-4 border-blue-500'
              }`}
              onClick={() => markNotificationAsRead(notification.id)}
            >
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-grow">
                  <p className={`font-semibold ${notification.read ? 'text-gray-600' : 'text-gray-800'}`}>
                    {notification.message}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </div>
                {!notification.read && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">New</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Notifications