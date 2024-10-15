import React from 'react'
import { Link } from 'react-router-dom'
import { Plus, ChevronLeft, ChevronRight, Car, Home } from 'lucide-react'
import { useAuction } from '../context/AuctionContext'

const Header: React.FC = () => {
  const { navigateDate, currentDate, filterListings, accountBalance } = useAuction()

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const isYesterday = currentDate.getTime() === yesterday.getTime()
  const isToday = currentDate.getTime() === today.getTime()
  const isTomorrow = currentDate.getTime() === tomorrow.getTime()

  const handleDateNavigation = (direction: 'prev' | 'next') => {
    navigateDate(direction)
  }

  const formatDate = (date: Date) => {
    if (date.getTime() === today.getTime()) return 'Today'
    if (date.getTime() === yesterday.getTime()) return 'Yesterday'
    if (date.getTime() === tomorrow.getTime()) return 'Tomorrow'
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }

  return (
    <header className="bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => handleDateNavigation('prev')} 
            className={`text-white p-2 hover:bg-blue-700 rounded-full transition-colors duration-200 ${isYesterday ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Previous day"
            disabled={isYesterday}
          >
            <ChevronLeft size={24} />
          </button>
          <div className="text-lg font-semibold">{formatDate(currentDate)}</div>
          <button 
            onClick={() => handleDateNavigation('next')} 
            className={`text-white p-2 hover:bg-blue-700 rounded-full transition-colors duration-200 ${isTomorrow ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Next day"
            disabled={isTomorrow}
          >
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => filterListings('automotive')}
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
            aria-label="Filter Automotive"
          >
            <Car size={24} />
          </button>
          <Link 
            to="/create-listing" 
            className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors duration-200"
            aria-label="Create Listing"
          >
            <Plus size={24} />
          </Link>
          <button
            onClick={() => filterListings('real estate')}
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
            aria-label="Filter Real Estate"
          >
            <Home size={24} />
          </button>
        </div>
      </div>
      <div className="container mx-auto mt-2 text-center">
        <span className="text-sm">Balance: UZS {accountBalance.toLocaleString()}</span>
      </div>
    </header>
  )
}

export default Header