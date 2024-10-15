import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuction } from '../context/AuctionContext'
import { ArrowLeft, Clock, Share2, Heart } from 'lucide-react'

const AuctionItem: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { items, addBid, shareAuction, addToWatchlist, removeFromWatchlist, watchlist, processPayment } = useAuction()
  const [bidAmount, setBidAmount] = useState('')
  const [autoBidMax, setAutoBidMax] = useState('')
  const [timeLeft, setTimeLeft] = useState('')
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const item = items.find((i) => i.id === id)
  const isInWatchlist = watchlist.some(w => w.itemId === id)

  useEffect(() => {
    if (item) {
      const timer = setInterval(() => {
        const now = new Date()
        const end = new Date(item.endTime)
        const diff = end.getTime() - now.getTime()

        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24))
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((diff % (1000 * 60)) / 1000)

          setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
        } else {
          setTimeLeft('Auction ended')
          clearInterval(timer)
        }
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [item])

  if (!item) {
    return <div>Item not found</div>
  }

  const handleBid = async (e: React.FormEvent) => {
    e.preventDefault()
    const amount = parseFloat(bidAmount)
    if (amount > item.currentBid) {
      setIsProcessingPayment(true)
      const paymentSuccess = await processPayment(item.id, amount)
      setIsProcessingPayment(false)
      if (paymentSuccess) {
        addBid(item.id, amount)
        setBidAmount('')
      } else {
        alert('Payment failed. Please try again.')
      }
    } else {
      alert('Bid must be higher than the current bid')
    }
  }

  const handleAutoBid = (e: React.FormEvent) => {
    e.preventDefault()
    const maxAmount = parseFloat(autoBidMax)
    if (maxAmount > item.currentBid) {
      // In a real app, this would be handled by the backend
      const newBid = Math.min(item.currentBid + 1, maxAmount)
      addBid(item.id, newBid)
      setAutoBidMax('')
    } else {
      alert('Maximum bid must be higher than the current bid')
    }
  }

  const toggleWatchlist = () => {
    if (isInWatchlist) {
      removeFromWatchlist(item.id)
    } else {
      addToWatchlist(item.id)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <button onClick={() => navigate(-1)} className="mb-4 flex items-center text-blue-600 hover:text-blue-800">
        <ArrowLeft size={20} className="mr-1" /> Back to Auctions
      </button>
      <img src={item.imageUrl} alt={item.title} className="w-full h-64 object-cover rounded-lg mb-6" />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{item.title}</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => shareAuction(item.id)}
            className="text-gray-600 hover:text-blue-600"
          >
            <Share2 size={24} />
          </button>
          <button
            onClick={toggleWatchlist}
            className={`${isInWatchlist ? 'text-red-600' : 'text-gray-600'} hover:text-red-600`}
          >
            <Heart size={24} />
          </button>
        </div>
      </div>
      <p className="text-gray-600 mb-4">{item.description}</p>
      <div className="flex justify-between items-center mb-6">
        <span className="text-2xl font-bold text-green-600">Current Bid: ${item.currentBid.toFixed(2)}</span>
        <div className="flex items-center text-gray-500">
          <Clock size={20} className="mr-2" />
          <span>{timeLeft}</span>
        </div>
      </div>
      <form onSubmit={handleBid} className="flex space-x-4 mb-4">
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          placeholder="Enter bid amount"
          className="flex-grow p-2 border rounded"
          step="0.01"
          min={item.currentBid + 0.01}
          required
        />
        <button
          type="submit"
          className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${isProcessingPayment ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isProcessingPayment}
        >
          {isProcessingPayment ? 'Processing...' : 'Place Bid'}
        </button>
      </form>
      <form onSubmit={handleAutoBid} className="flex space-x-4">
        <input
          type="number"
          value={autoBidMax}
          onChange={(e) => setAutoBidMax(e.target.value)}
          placeholder="Enter maximum auto-bid amount"
          className="flex-grow p-2 border rounded"
          step="0.01"
          min={item.currentBid + 0.01}
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Set Auto-Bid
        </button>
      </form>
      {item.videoUrl && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">360° View</h2>
          <video
            src={item.videoUrl}
            controls
            className="w-full rounded-lg"
            style={{ maxHeight: '400px' }}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  )
}

export default AuctionItem