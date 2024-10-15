import React from 'react'
import { Link } from 'react-router-dom'
import { useAuction } from '../context/AuctionContext'
import { Bell, User } from 'lucide-react'
import ListingCard from '../components/ListingCard'

const Home: React.FC = () => {
  const { filteredListings, notifications, currentDate } = useAuction()

  const unreadCount = notifications.filter(n => !n.read).length

  // Filter listings based on the current date
  const visibleListings = filteredListings.filter(listing => {
    const listingDate = new Date(listing.startTime)
    return listingDate.toDateString() === currentDate.toDateString()
  })

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleListings.map((item) => (
          <ListingCard key={item.id} item={item} />
        ))}
      </div>
      {visibleListings.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No auctions found for this date.</p>
      )}
      <nav className="fixed bottom-4 right-4 flex items-center space-x-4">
        <Link to="/notifications" className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Bell size={24} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center text-white">
              {unreadCount}
            </span>
          )}
        </Link>
        <Link to="/profile" className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
          <User size={24} />
        </Link>
      </nav>
    </div>
  )
}

export default Home