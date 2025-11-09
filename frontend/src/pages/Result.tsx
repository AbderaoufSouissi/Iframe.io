import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Result = () => {
  const {image, resultImage} = useContext(AppContext) as any;

  return (
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
              ) : (
                <div className="text-sm text-gray-400">No result yet</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Result