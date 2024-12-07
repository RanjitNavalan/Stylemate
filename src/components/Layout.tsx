import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bars3Icon, 
  XMarkIcon,
  HeartIcon,
  UserIcon,
  Cog6ToothIcon,
  SparklesIcon,
  BeakerIcon,
  ChevronDownIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/solid';
import Footer from './Footer';
import Tooltip from './stylelab/Tooltip';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './auth/AuthModal';
import toast from 'react-hot-toast';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { to: "/saved-looks", icon: HeartIcon, text: "Saved Looks", hoverColor: "pink" },
  { to: "/trend-zone", icon: SparklesIcon, text: "Trend Zone", hoverColor: "purple" },
  { to: "/style-lab", icon: BeakerIcon, text: "Style Lab", hoverColor: "violet" },
  { to: "/profile", icon: UserIcon, text: "Profile", hoverColor: "indigo" },
  { to: "/settings", icon: Cog6ToothIcon, text: "Settings", hoverColor: "blue" }
];

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { logout, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('See you soon! 👋');
    navigate('/');
    setShowUserMenu(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
                StyleMate
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center gap-6">
              {isAuthenticated ? (
                <>
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Tooltip content={`✨ Explore ${item.text}`} position="bottom">
                        <Link 
                          to={item.to} 
                          className={`flex items-center gap-2 text-gray-600 hover:text-${item.hoverColor}-500 group transition-colors`}
                        >
                          <item.icon className={`h-5 w-5 text-${item.hoverColor}-400 group-hover:text-${item.hoverColor}-500 transition-colors`} />
                          <motion.span
                            className={`group-hover:text-${item.hoverColor}-500`}
                            whileHover={{ y: -2 }}
                          >
                            {item.text}
                          </motion.span>
                        </Link>
                      </Tooltip>
                    </motion.div>
                  ))}
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors rounded-full hover:bg-pink-50"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center text-white font-bold">
                        {user?.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium">{user?.name}</span>
                      <ChevronDownIcon className="h-4 w-4" />
                    </motion.button>

                    <AnimatePresence>
                      {showUserMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg py-2 z-50"
                        >
                          <div className="px-4 py-3 border-b">
                            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <EnvelopeIcon className="h-4 w-4" />
                              {user?.email}
                            </p>
                          </div>
                          <div className="py-2">
                            <Link
                              to="/profile"
                              onClick={() => setShowUserMenu(false)}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              View Profile
                            </Link>
                            <Link
                              to="/settings"
                              onClick={() => setShowUserMenu(false)}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              Settings
                            </Link>
                          </div>
                          <div className="border-t">
                            <button
                              onClick={handleLogout}
                              className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 transition-colors"
                            >
                              Sign out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAuthModal(true)}
                  className="px-6 py-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-full hover:shadow-lg transition-all"
                >
                  Sign in
                </motion.button>
              )}
            </div>

            <motion.button 
              className="md:hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-gray-600" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-gray-600" />
              )}
            </motion.button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, x: 10 }}
                    >
                      <Link 
                        to={item.to} 
                        className={`flex items-center gap-2 text-gray-600 hover:text-${item.hoverColor}-500 group transition-colors`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon className={`h-5 w-5 text-${item.hoverColor}-400 group-hover:text-${item.hoverColor}-500 transition-colors`} />
                        <span className={`group-hover:text-${item.hoverColor}-500`}>{item.text}</span>
                      </Link>
                    </motion.div>
                  ))}
                  <motion.button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Sign out
                  </motion.button>
                </>
              ) : (
                <motion.button
                  onClick={() => {
                    setShowAuthModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-full hover:shadow-lg transition-all"
                >
                  Sign in
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </nav>

      <main className="flex-1">
        {children}
      </main>

      <Footer />

      <AnimatePresence>
        {showAuthModal && (
          <AuthModal onClose={() => setShowAuthModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}