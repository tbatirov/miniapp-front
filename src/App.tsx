import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import ListingDetails from "./pages/ListingDetails"
import Profile from "./pages/Profile"
import Notifications from "./pages/Notifications"
import CreateListing from "./pages/CreateListing"
import { AuctionProvider } from "./context/AuctionContext"

function App() {
  useEffect(() => {
    // Initialize Telegram user if needed
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      const user = window.Telegram.WebApp.initDataUnsafe.user
      console.log('Telegram user:', user)
      // You can add logic here to handle the Telegram user data
    }

    // Set viewport height for mobile devices
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    setViewportHeight()
    window.addEventListener('resize', setViewportHeight)

    return () => window.removeEventListener('resize', setViewportHeight)
  }, [])

  return (
    <AuctionProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listing/:id" element={<ListingDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/create-listing" element={<CreateListing />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuctionProvider>
  )
}

export default App