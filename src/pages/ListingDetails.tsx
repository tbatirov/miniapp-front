import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuction } from '../context/AuctionContext'
import { ArrowLeft, Clock, Share2, Heart, Car, Home, Facebook, Twitter, Linkedin, Link } from 'lucide-react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const ListingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { listings, placeBid, shareListing, addToWatchlist, removeFromWatchlist, watchlist, processPayment } = useAuction()
  const [bidAmount, setBidAmount] = useState('')
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [showShareOptions, setShowShareOptions] = useState(false)

  const listing = listings.find((l) => l.id === id)
  const isInWatchlist = watchlist.some(w => w.listingId === id)

  if (!listing) {
    return <div className="text-center mt-8">Listing not found</div>
  }

  const handleBid = async (e: React.FormEvent) => {
    e.preventDefault()
    const amount = parseFloat(bidAmount)
    setIsProcessingPayment(true)
    const paymentSuccess = await processPayment(listing.id, amount)
    setIsProcessingPayment(false)
    if (paymentSuccess) {
      placeBid(listing.id, amount)
      setBidAmount('')
    } else {
      alert('Payment failed. Please try again.')
    }
  }

  const toggleWatchlist = () => {
    if (isInWatchlist) {
      removeFromWatchlist(listing.id)
    } else {
      addToWatchlist(listing.id)
    }
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    let shareUrl = ''

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`Check out this auction: ${listing.title}`)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(listing.title)}&summary=${encodeURIComponent(listing.description)}`
        break
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          alert('Link copied to clipboard!')
        }).catch(err => {
          console.error('Failed to copy: ', err)
        })
        break
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank')
    }

    setShowShareOptions(false)
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  }

  const mockImages = [
    listing.imageUrl,
    `https://source.unsplash.com/800x600/?${listing.category === 'automotive' ? 'car' : 'house'}&sig=1`,
    `https://source.unsplash.com/800x600/?${listing.category === 'automotive' ? 'car' : 'house'}&sig=2`,
  ]

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-4xl mx-auto">
      <div className="p-4 bg-gray-100 flex items-center">
        <button onClick={() => navigate(-1)} className="mr-4 text-blue-600 hover:text-blue-800">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold flex-grow">{listing.title}</h1>
        <div className="flex space-x-2 relative">
          <button
            onClick={() => setShowShareOptions(!showShareOptions)}
            className="text-gray-600 hover:text-blue-600"
          >
            <Share2 size={24} />
          </button>
          {showShareOptions && (
            <div className="absolute right-0 mt-8 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <button onClick={() => handleShare('facebook')} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem">
                  <Facebook size={16} className="mr-2" /> Facebook
                </button>
                <button onClick={() => handleShare('twitter')} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem">
                  <Twitter size={16} className="mr-2" /> Twitter
                </button>
                <button onClick={() => handleShare('linkedin')} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem">
                  <Linkedin size={16} className="mr-2" /> LinkedIn
                </button>
                <button onClick={() => handleShare('copy')} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem">
                  <Link size={16} className="mr-2" /> Copy Link
                </button>
              </div>
            </div>
          )}
          <button
            onClick={toggleWatchlist}
            className={`${isInWatchlist ? 'text-red-600' : 'text-gray-600'} hover:text-red-600`}
          >
            <Heart size={24} />
          </button>
        </div>
      </div>
      
      <Slider {...sliderSettings}>
        {mockImages.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`${listing.title} - Image ${index + 1}`} className="w-full h-64 object-cover" />
          </div>
        ))}
      </Slider>

      <div className="p-6">
        <p className="text-gray-600 mb-4">{listing.description}</p>

        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-green-600">${listing.currentBid.toLocaleString()}</span>
          <div className="flex items-center text-gray-500">
            <Clock size={20} className="mr-2" />
            <span>Ends: {new Date(listing.endTime).toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          {listing.category === 'automotive' ? (
            <Car size={24} className="text-blue-500" />
          ) : (
            <Home size={24} className="text-green-500" />
          )}
          <span className="text-lg">{listing.category === 'automotive' ? 'Automotive' : 'Real Estate'}</span>
        </div>

        <form onSubmit={handleBid} className="mb-6">
          <div className="flex space-x-2">
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="Enter bid amount"
              className="flex-grow p-2 border rounded"
              step="0.01"
              min={listing.currentBid + 0.01}
              required
            />
            <button
              type="submit"
              className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${isProcessingPayment ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isProcessingPayment}
            >
              {isProcessingPayment ? 'Processing...' : 'Place Bid'}
            </button>
          </div>
        </form>

        {listing.videoUrl && (
          <div>
            <h2 className="text-xl font-semibold mb-2">360° View</h2>
            <video
              src={listing.videoUrl}
              controls
              className="w-full rounded-lg"
              style={{ maxHeight: '400px' }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  )
}

export default ListingDetails