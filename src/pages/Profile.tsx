import React from 'react'
import { useAuction } from '../context/AuctionContext'
import { Mail } from 'lucide-react'

const Profile: React.FC = () => {
  const { user, inviteFriend, watchlist, items } = useAuction()
  const [email, setEmail] = React.useState('')

  if (!user) {
    return <div>Please log in to view your profile</div>
  }

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    inviteFriend(email)
    setEmail('')
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full mr-4" />
        <h1 className="text-3xl font-bold">{user.name}</h1>
      </div>
      
      <h2 className="text-2xl font-semibold mb-4">Bid History</h2>
      {user.bidHistory.length > 0 ? (
        <ul className="space-y-4 mb-8">
          {user.bidHistory.map((bid) => (
            <li key={`${bid.itemId}-${bid.timestamp.toISOString()}`} className="border-b pb-2">
              <p className="font-semibold">Item ID: {bid.itemId}</p>
              <p className="text-green-600">Bid Amount: ${bid.amount}</p>
              <p className="text-sm text-gray-500">Date: {bid.timestamp.toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-8">No bid history available</p>
      )}

      <h2 className="text-2xl font-semibold mb-4">Watchlist</h2>
      {watchlist.length > 0 ? (
        <ul className="space-y-4 mb-8">
          {watchlist.map((watchItem) => {
            const item = items.find(i => i.id === watchItem.itemId)
            return item ? (
              <li key={watchItem.itemId} className="border-b pb-2">
                <p className="font-semibold">{item.title}</p>
                <p className="text-green-600">Current Bid: ${item.currentBid.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Added: {watchItem.addedAt.toLocaleString()}</p>
              </li>
            ) : null
          })}
        </ul>
      ) : (
        <p className="mb-8">Your watchlist is empty</p>
      )}

      <h2 className="text-2xl font-semibold mb-4">Invite a Friend</h2>
      <form onSubmit={handleInvite} className="flex space-x-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter friend's email"
          className="flex-grow p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center">
          <Mail size={20} className="mr-2" />
          Invite
        </button>
      </form>
    </div>
  )
}

export default Profile