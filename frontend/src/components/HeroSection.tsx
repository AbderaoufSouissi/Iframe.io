import { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'

const HeroSection = () => {
  const {removeBg, image, resultImage, setImage, setResultImage} = useContext(AppContext) as any

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
      removeBg(files[0])
    }
  }

  const handleDownload = async () => {
    if (!resultImage) return;
    
    try {
      const response = await fetch(resultImage);
      const blob = await response.blob();
      
      if ('showSaveFilePicker' in window) {
        try {
          const handle = await (window as any).showSaveFilePicker({
            suggestedName: 'background-removed.png',
            types: [{
              description: 'PNG Image',
              accept: { 'image/png': ['.png'] }
            }]
          });
          
          const writable = await handle.createWritable();
          await writable.write(blob);
          await writable.close();
        } catch (err: any) {
          if (err.name !== 'AbortError') {
            const link = document.createElement('a');
            link.href = resultImage;
            link.download = 'background-removed.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }
      } else {
        const link = document.createElement('a');
        link.href = resultImage;
        link.download = 'background-removed.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error downloading image:', error);
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = 'background-removed.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleUploadNew = () => {
    setImage(false);
    setResultImage(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white px-4 sm:px-6 py-12 sm:py-16">
      {!image ? (
        // Upload Interface
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold text-black leading-tight">
              Remove the background from your images{' '}
              <span className="bg-linear-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                for FREE
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Upload your image and let our AI technology remove the background instantly. 
              No credit card required.
            </p>
          </div>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed rounded-2xl p-8 sm:p-12
              transition-all duration-200
              ${isDragging 
                ? 'border-purple-600 bg-purple-50' 
                : 'border-gray-300 bg-white hover:border-purple-400'
              }
              shadow-lg hover:shadow-xl
            `}
          >
            <div className="text-center space-y-6">
              <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>

              <div className="space-y-2">
                <p className="text-lg sm:text-xl font-semibold text-gray-700">
                  {isDragging ? 'Drop your image here' : 'Drag and drop your image here'}
                </p>
                <p className="text-sm sm:text-base text-gray-500">
                  or browse from your computer
                </p>
              </div>

              <div className="flex justify-center">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-purple-600 file:text-white
                      file:hover:bg-purple-700
                      file:cursor-pointer
                      text-sm text-gray-500
                      focus:outline-none
                      focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                      rounded-full
                    "
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        removeBg(file)
                      }
                    }}
                  />
                </label>
              </div>

              <p className="text-xs sm:text-sm text-gray-400">
                Supports JPG, PNG, and WEBP files up to 10MB
              </p>
            </div>
          </div>
        </div>
      ) : (
        // Result View
        <div className="max-w-7xl mx-auto">
          {/* Keep Homepage Text */}
          <div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12">
            <h1 className="text-5xl font-bold text-black leading-tight">
              Remove the background from your images{' '}
              <span className="bg-linear-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                for FREE
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-black max-w-2xl mx-auto">
              Upload your image and let our AI technology remove the background instantly. 
              No credit card required.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8">
            {/* Original Image */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700 text-center">Original</h3>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Original"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Background Removed Image */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700 text-center">Background Removed</h3>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
                   style={{
                     backgroundImage: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
                     backgroundSize: '20px 20px',
                     backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                   }}>
                {resultImage ? (
                  <img
                    src={resultImage}
                    alt="Background Removed"
                    className="w-full h-auto"
                  />
                ) : (
                  <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
                      <p className="text-gray-600 font-medium">Processing image...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {resultImage && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleDownload}
                className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Download Image
              </button>
              <button
                onClick={handleUploadNew}
                className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg border-2 border-purple-600 hover:bg-purple-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Upload New Image
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default HeroSection
