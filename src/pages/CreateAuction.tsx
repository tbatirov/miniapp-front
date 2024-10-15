import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuction } from '../context/AuctionContext'
import { ArrowLeft, Upload } from 'lucide-react'

const CreateAuction: React.FC = () => {
  const navigate = useNavigate()
  const { createAuction } = useAuction()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [startingBid, setStartingBid] = useState('')
  const [duration, setDuration] = useState('1')
  const [imageUrl, setImageUrl] = useState('')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Removed validation for development
    const newAuction = {
      title,
      description,
      startingBid: parseFloat(startingBid) || 0, // Default to 0 if parsing fails
      duration: parseInt(duration),
      imageUrl,
      videoUrl: videoFile ? URL.createObjectURL(videoFile) : ''
    }
    createAuction(newAuction)
    navigate('/')
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
      <h1 className="text-3xl font-bold mb-6">Create New Auction</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
          />
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (days)</label>
          <select
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="1">1 day</option>
            <option value="3">3 days</option>
            <option value="7">7 days</option>
            <option value="14">14 days</option>
          </select>
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="video" className="block text-sm font-medium text-gray-700">360° Video</label>
          <div className="mt-1 flex items-center">
            <input
              type="file"
              id="video"
              accept="video/*"
              onChange={handleVideoUpload}
              ref={fileInputRef}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Upload className="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
              Upload Video
            </button>
            {videoFile && <span className="ml-3 text-sm text-gray-500">{videoFile.name}</span>}
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create Auction
        </button>
      </form>
    </div>
  )
}

export default CreateAuction