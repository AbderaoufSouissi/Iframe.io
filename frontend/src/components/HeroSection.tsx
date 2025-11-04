import { useState } from 'react'

const HeroSection = () => {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file.name)
    // Add your file upload logic here
  }

  const handleBrowseClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        handleFileUpload(file)
      }
    }
    input.click()
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
          Remove Background from Image for{' '}
          <span className="text-blue-800">FREE</span>
        </h1>
        
        {/* Description */}
        <p className="text-gray-600 text-sm md:text-base mb-10">
          Remove background from image of humans, animals or objects and download high-resolution images for free.
        </p>

        {/* Upload Box */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8 md:p-10">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 md:p-10 transition-all duration-300 ${
              isDragging
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-300 bg-gray-50'
            }`}
          >
            <div className="flex flex-col items-center justify-center space-y-6">
              {/* Upload Button */}
              <button
                onClick={handleBrowseClick}
                className="px-8 py-3 bg-blue-800 hover:bg-blue-900 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Upload Image
              </button>

              {/* Drag and drop text */}
              <p className="text-gray-600 text-sm">
                Drop an image or paste <span className="text-blue-800 font-medium">URL</span> (with resolution 5,000 x 5,000 px)
              </p>

              {/* Supported formats */}
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span>Supported formats:</span>
                <span className="font-semibold">.jpg</span>
                <span className="font-semibold">.png</span>
                <span className="font-semibold">.jpeg</span>
                <span className="font-semibold">.webp</span>
              </div>

              {/* Terms */}
              <p className="text-xs text-gray-500 mt-2">
                By uploading an image or URL, you agree to our{' '}
                <a href="#" className="text-blue-800 hover:underline font-medium">Terms of Use</a>
                {' '}and{' '}
                <a href="#" className="text-blue-800 hover:underline font-medium">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
