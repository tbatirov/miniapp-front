import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuction } from '../context/AuctionContext'
import { ArrowLeft, Upload } from 'lucide-react'

const CreateListing: React.FC = () => {
  const navigate = useNavigate()
  const { createListing, getNextAvailableAuctionDate } = useAuction()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [startingBid, setStartingBid] = useState('')
  const [category, setCategory] = useState<'automotive' | 'real estate'>('automotive')
  const [image, setImage] = useState<File | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  const nextAvailableDate = getNextAvailableAuctionDate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!image) {
      alert('Please upload an image for the listing.')
      return
    }
    const newListing = {
      title,
      description,
      currentBid: parseFloat(startingBid) || 0,
      imageUrl: URL.createObjectURL(image),
      category,
      startTime: nextAvailableDate,
      endTime: new Date(nextAvailableDate.getTime() + 7 * 24 * 60 * 60 * 1000),
    }
    createListing(newListing)
    navigate('/')
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0])
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <button onClick={() => navigate(-1)} className="mb-4 flex items-center text-blue-600 hover:text-blue-800">
        <ArrowLeft size={20} className="mr-1" /> Back
      </button>
      <h1 className="text-3xl font-bold mb-6">Create New Listing</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            rows={3}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="startingBid" className="block text-sm font-medium text-gray-700">Starting Bid ($)</label>
          <input
            type="number"
            id="startingBid"
            value={startingBid}
            onChange={(e) => setStartingBid(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as 'automotive' | 'real estate')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="automotive">Automotive</option>
            <option value="real estate">Real Estate</option>
          </select>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
          <div className="mt-1 flex items-center">
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
              ref={imageInputRef}
              className="hidden"
              required
            />
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Upload className="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
              Upload Image
            </button>
            {image && <span className="ml-3 text-sm text-gray-500">{image.name}</span>}
          </div>
        </div>
        <div>
          <label htmlFor="video" className="block text-sm font-medium text-gray-700">360° Video (optional)</label>
          <div className="mt-1 flex items-center">
            <input
              type="file"
              id="video"
              accept="video/*"
              onChange={handleVideoUpload}
              ref={videoInputRef}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => videoInputRef.current?.click()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Upload className="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
              Upload Video
            </button>
            {videoFile && <span className="ml-3 text-sm text-gray-500">{videoFile.name}</span>}
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create Listing
        </button>
      </form>
    </div>
  )
}

export default CreateListing