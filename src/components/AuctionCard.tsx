import React from 'react'
import { Link } from 'react-router-dom'
import { useAuction } from '../context/AuctionContext'
import { Share2, Heart } from 'lucide-react'
import { AuctionItem } from '../types'

interface AuctionCardProps {
  item: AuctionItem
}

const AuctionCard: React.FC<AuctionCardProps> = ({ item }) => {
  const { shareAuction, addToWatchlist, watchlist } = useAuction()

  const isInWatchlist = watchlist.some(w => w.itemId === item.id)

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-36 h-36 rounded-full overflow-hidden mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <Link to={`/item/${item.id}`} className="text-white text-sm font-semibold hover:underline">
            View Details
          </Link>
        </div>
      </div>
      <h2 className="text-lg font-semibold mb-1 text-center">{item.title}</h2>
      <p className="text-green-600 font-bold mb-2 text-sm">${item.currentBid.toFixed(2)}</p>
      <div className="flex space-x-3">
        <button
          onClick={() => shareAuction(item.id)}
          className="text-gray-600 hover:text-blue-600"
        >
          <Share2 size={16} />
        </button>
        <button
          onClick={() => addToWatchlist(item.id)}
          className={`${isInWatchlist ? 'text-red-600' : 'text-gray-600'} hover:text-red-600`}
        >
          <Heart size={16} />
        </button>
      </div>
    </div>
  )
}

export default AuctionCard