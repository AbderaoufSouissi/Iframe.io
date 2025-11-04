import { Github, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Logo & Description */}
          <div className="flex-1">
            <div className="flex items-center mb-3">
              <img 
                src="/logo.png" 
                alt="BGRemover Logo" 
                className="h-60 w-auto"
              />
            </div>
            <p className="text-gray-600 text-sm mb-3 max-w-md">
              Remove background from images instantly with our free online tool. Professional results in seconds.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a href="https://github.com/AbderaoufSouissi/Iframe.io" className="text-gray-500 hover:text-gray-700 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/abderaoufsouissi" className="text-gray-500 hover:text-gray-700 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2025 BGRemover. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
