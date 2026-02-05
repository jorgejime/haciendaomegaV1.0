import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { LiveAuctionPage } from './pages/LiveAuctionPage';
import { LotDetailPage } from './pages/LotDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { MyBidsPage } from './pages/MyBidsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboard } from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/live/:id" element={<LiveAuctionPage />} />
          <Route path="/lot/:id" element={<LotDetailPage />} />
          <Route path="/checkout/:id" element={<CheckoutPage />} />
          <Route path="/bids" element={<MyBidsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<div className="text-center py-20 text-gray-500">Próximamente...</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
