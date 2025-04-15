import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import { School, UserCircle2 } from "lucide-react"; // Import the School icon

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#1A1A1A]/70 backdrop-blur-md border-b border-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <School className="h-7 w-7 text-green-500" /> {/* School Icon */}
          <span className="text-2xl font-bold text-white">FeedBot</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors font-bold">
            Home
          </Link>
          <Link to="/AdminDashboard" className="text-gray-400 hover:text-white transition-colors font-bold">
            About
          </Link>
          <Link to="/features" className="text-gray-400 hover:text-white transition-colors font-bold">
            Features
          </Link>
          <Link to="/Login" className="text-gray-400 transition-colors hover:text-green-500 flex items-center space-x-1 font-bold">
            <span>Login</span>
            <UserCircle2 className="h-5 w-5" />
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1A1A1A]/90 backdrop-blur-md border-t border-white">
          <nav className="flex flex-col p-4 space-y-3">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
              About
            </Link>
            <Link to="/features" className="text-gray-400 hover:text-white transition-colors">
              Features
            </Link>
            <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
