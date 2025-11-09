import { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'

const HeroSection = () => {
  const {removeBg} = useContext(AppContext)


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
    <div className="min-h-[calc(100vh-4rem)] bg-linear-to-b from-gray-50 to-white flex items-center justify-center px-4 py-20 font-sans">
      <div className="max-w-3xl w-full text-center">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-6 leading-tight">
          Remove Background from Images{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-blue-800">for FREE</span>
        </h1>
        
        {/* Description */}
        <p className="text-gray-600 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Remove background from images of humans, animals or objects and download high-resolution results in seconds.
        </p>

        {/* Upload Box */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 md:p-10 hover:shadow-xl transition-shadow duration-300">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-10 md:p-12 transition-all duration-300 ${
              isDragging
                ? 'border-blue-600 bg-blue-50 scale-[1.02]'
                : 'border-gray-300 bg-gray-50/50'
            }`}
          >
            <div className="flex flex-col items-center justify-center space-y-6">
               <label htmlFor="file-upload" className="flex justify-center w-full cursor-pointer">
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    removeBg(e.target.files?.[0])
                  }}
                  className="text-sm text-gray-700 text-center
                    file:mr-4 file:py-3 file:px-6 
                    file:rounded-lg file:border-0 
                    file:text-sm file:font-semibold 
                    file:bg-blue-600 file:text-white 
                    file:hover:bg-blue-700 file:transition-colors
                    file:cursor-pointer file:shadow-sm
                    hover:file:shadow-md
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                />
              </label>

              {/* Visible file input (also supports drag/drop) */}
             

              {/* Drag and drop text */}
              <p className="text-gray-500 text-base">
                Drop an image or paste <span className="text-blue-600 font-semibold">URL</span> <span className="text-gray-400">(max resolution 5,000 × 5,000 px)</span>
              </p>

              {/* Supported formats */}
              <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-600">
                <span className="font-medium text-gray-700">Supported:</span>
                <span className="px-2 py-1 bg-gray-100 rounded-md font-medium text-gray-700">.jpg</span>
                <span className="px-2 py-1 bg-gray-100 rounded-md font-medium text-gray-700">.png</span>
                <span className="px-2 py-1 bg-gray-100 rounded-md font-medium text-gray-700">.jpeg</span>
                <span className="px-2 py-1 bg-gray-100 rounded-md font-medium text-gray-700">.webp</span>
              </div>

              {/* Terms */}
              <p className="text-xs text-gray-500 pt-4 border-t border-gray-200">
                By uploading an image or URL, you agree to our{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 underline font-medium transition-colors">Terms of Use</a>
                {' '}and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 underline font-medium transition-colors">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
