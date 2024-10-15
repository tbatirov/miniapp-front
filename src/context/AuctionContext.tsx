import React, { createContext, useContext, useState } from 'react'
import { Listing, User, Notification, WatchlistItem } from '../types'

interface AuctionContextType {
  listings: Listing[]
  filteredListings: Listing[]
  currentDate: Date
  notifications: Notification[]
  watchlist: WatchlistItem[]
  accountBalance: number
  navigateDate: (direction: 'prev' | 'next') => void
  filterListings: (category: string) => void
  addNotification: (message: string, type: 'bid' | 'like' | 'comment') => void
  markNotificationAsRead: (id: string) => void
  addToWatchlist: (listingId: string) => void
  removeFromWatchlist: (listingId: string) => void
  shareListing: (listingId: string) => void
  placeBid: (listingId: string, amount: number) => void
  processPayment: (listingId: string, amount: number) => Promise<boolean>
  getNextAvailableAuctionDate: () => Date
  createListing: (listing: Omit<Listing, 'id'>) => void
}

const AuctionContext = createContext<AuctionContextType | undefined>(undefined)

export const AuctionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [listings, setListings] = useState<Listing[]>([
    {
      id: '1',
      title: '2022 Tesla Model 3',
      description: 'Sleek electric sedan with long range and autopilot',
      currentBid: 35000,
      imageUrl: 'https://source.unsplash.com/featured/?teslamodel3',
      category: 'automotive',
      startTime: new Date('2024-03-10T10:00:00'),
      endTime: new Date('2024-03-17T10:00:00'),
    },
    {
      id: '2',
      title: 'Beachfront Villa',
      description: 'Luxurious villa with private beach access',
      currentBid: 1200000,
      imageUrl: 'https://source.unsplash.com/featured/?beachhouse',
      category: 'real estate',
      startTime: new Date('2024-03-15T12:00:00'),
      endTime: new Date('2024-03-22T12:00:00'),
    },
  ])
  const [filteredListings, setFilteredListings] = useState<Listing[]>(listings)
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([])
  const [accountBalance, setAccountBalance] = useState<number>(100000)

  const navigateDate = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1))
      return newDate
    })
  }

  const filterListings = (category: string) => {
    setFilteredListings(listings.filter(listing => listing.category === category))
  }

  const addNotification = (message: string, type: 'bid' | 'like' | 'comment') => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      message,
      type,
      read: false,
      timestamp: new Date()
    }
    setNotifications(prev => [newNotification, ...prev])
  }

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const addToWatchlist = (listingId: string) => {
    setWatchlist(prev => [...prev, { listingId, addedAt: new Date() }])
  }

  const removeFromWatchlist = (listingId: string) => {
    setWatchlist(prev => prev.filter(item => item.listingId !== listingId))
  }

  const shareListing = (listingId: string) => {
    // Implement sharing logic here
    console.log(`Sharing listing ${listingId}`)
  }

  const placeBid = (listingId: string, amount: number) => {
    setListings(prev =>
      prev.map(listing =>
        listing.id === listingId ? { ...listing, currentBid: amount } : listing
      )
    )
  }

  const processPayment = async (listingId: string, amount: number): Promise<boolean> => {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1000))
    setAccountBalance(prev => prev - amount)
    return true
  }

  const getNextAvailableAuctionDate = (): Date => {
    const now = new Date()
    now.setHours(now.getHours() + 1)
    now.setMinutes(0)
    now.setSeconds(0)
    now.setMilliseconds(0)
    return now
  }

  const createListing = (listing: Omit<Listing, 'id'>) => {
    const newListing: Listing = {
      ...listing,
      id: Date.now().toString(),
    }
    setListings(prev => [...prev, newListing])
    setFilteredListings(prev => [...prev, newListing])
  }

  const value: AuctionContextType = {
    listings,
    filteredListings,
    currentDate,
    notifications,
    watchlist,
    accountBalance,
    navigateDate,
    filterListings,
    addNotification,
    markNotificationAsRead,
    addToWatchlist,
    removeFromWatchlist,
    shareListing,
    placeBid,
    processPayment,
    getNextAvailableAuctionDate,
    createListing,
  }

  return <AuctionContext.Provider value={value}>{children}</AuctionContext.Provider>
}

export const useAuction = () => {
  const context = useContext(AuctionContext)
  if (context === undefined) {
    throw new Error('useAuction must be used within an AuctionProvider')
  }
  return context
}