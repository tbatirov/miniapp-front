import React from 'react'
import { Link } from 'react-router-dom'
import { useAuction } from '../context/AuctionContext'
import { Share2, Heart, Car, Home } from 'lucide-react'
import { Listing } from '../types'

interface ListingCardProps {
  item: Listing
}

const ListingCard: React.FC<ListingCardProps> = ({ item }) => {
  const { shareListing, addToWatchlist, watchlist } = useAuction()

  const isInWatchlist = watchlist.some(w => w.listingId === item.id)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2 bg-white rounded-full p-1">
          {item.category === 'automotive' ? (
            <Car size={20} className="text-blue-500" />
          ) : (
            <Home size={20} className="text-green-500" />
          )}
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 truncate">{item.title}</h2>
        <p className="text-green-600 font-bold mb-2">${item.currentBid.toLocaleString()}</p>
        <div className="flex justify-between items-center">
          <Link to={`/listing/${item.id}`} className="text-blue-600 hover:underline text-sm">
            View Details
          </Link>
          <div className="flex space-x-2">
            <button
              onClick={() => shareListing(item.id)}
              className="text-gray-600 hover:text-blue-600"
            >
              <Share2 size={20} />
            </button>
            <button
              onClick={() => addToWatchlist(item.id)}
              className={`${isInWatchlist ? 'text-red-600' : 'text-gray-600'} hover:text-red-600`}
            >
              <Heart size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingCard