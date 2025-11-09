import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Result = () => {
  const {image, resultImage} = useContext(AppContext) as any;
  const navigate = useNavigate();

  const handleDownload = async () => {
    if (!resultImage) return;
    
    try {
      // Fetch the image as a blob
      const response = await fetch(resultImage);
      const blob = await response.blob();
      
      // Check if the File System Access API is supported
      if ('showSaveFilePicker' in window) {
        try {
          // Show save file dialog
          const handle = await (window as any).showSaveFilePicker({
            suggestedName: 'background-removed.png',
            types: [{
              description: 'PNG Image',
              accept: { 'image/png': ['.png'] }
            }]
          });
          
          // Write the file
          const writable = await handle.createWritable();
          await writable.write(blob);
          await writable.close();
        } catch (err: any) {
          // User cancelled or error occurred, fallback to regular download
          if (err.name !== 'AbortError') {
            // Fallback to regular download
            const link = document.createElement('a');
            link.href = resultImage;
            link.download = 'background-removed.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }
      } else {
        // Fallback for browsers that don't support File System Access API
        const link = document.createElement('a');
        link.href = resultImage;
        link.download = 'background-removed.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error downloading image:', error);
      // Final fallback
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = 'background-removed.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleUploadNew = () => {
    navigate('/');
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 px-4 py-12 font-sans">
        <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Original */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
            <h3 className="text-gray-700 font-medium mb-4">Original</h3>
            <div className="w-full h-64 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center">
              {image ? (
                // keep logic: display image from context
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image ? URL.createObjectURL(image) : ''} alt="Original" className="object-contain w-full h-full" />
              ) : (
                <div className="text-sm text-gray-400">No image uploaded</div>
              )}
            </div>
          </div>

          {/* Background Removed */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
            <h3 className="text-gray-700 font-medium mb-4">Background Removed</h3>
            <div className="w-full h-64 bg-white rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center">
              {resultImage ? (
                // keep logic: display result image from context
                // eslint-disable-next-line @next/next/no-img-element
                <img src={resultImage ? resultImage : ''} alt="Background removed" className="object-contain w-full h-full bg-white" />
              ) : image ? (
                // Show spinner while processing
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600"></div>
                  <p className="text-sm text-gray-600">Processing image...</p>
                </div>
              ) : (
                <div className="text-sm text-gray-400">No result yet</div>
              )}
            </div>
            
            {/* Action Buttons */}
            {resultImage && (
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Download Image
                </button>
                <button
                  onClick={handleUploadNew}
                  className="flex-1 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Upload New Image
                </button>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default Result