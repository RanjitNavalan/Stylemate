import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import StyleInput from './pages/StyleInput';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Blog from './pages/Blog';
import SavedLooks from './components/SavedLooks';
import TrendZone from './pages/TrendZone';
import StyleLab from './pages/StyleLab';
import VibeCheck from './pages/VibeCheck';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster />
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/style-input" element={
            <ProtectedRoute>
              <Layout>
                <StyleInput />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/trend-zone" element={
            <ProtectedRoute>
              <Layout>
                <TrendZone />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/style-lab" element={
            <ProtectedRoute>
              <Layout>
                <StyleLab />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/blog" element={
            <ProtectedRoute>
              <Layout>
                <Blog />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/vibe-check" element={
            <ProtectedRoute>
              <Layout>
                <VibeCheck />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/saved-looks" element={
            <ProtectedRoute>
              <Layout>
                <SavedLooks />
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;