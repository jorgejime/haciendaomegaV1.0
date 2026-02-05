import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { LiveAuctionPage } from './pages/LiveAuctionPage';
import { LotDetailPage } from './pages/LotDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { MyBidsPage } from './pages/MyBidsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboard } from './pages/AdminDashboard';
import { SellerDashboard } from './pages/SellerDashboard';
import { CreateLotPage } from './pages/CreateLotPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/live/:id" element={<LiveAuctionPage />} />
            <Route path="/lot/:id" element={<LotDetailPage />} />

            {/* Rutas de comprador */}
            <Route path="/bids" element={<MyBidsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/checkout/:id" element={<CheckoutPage />} />

            {/* Rutas de vendedor */}
            <Route path="/seller" element={<SellerDashboard />} />
            <Route path="/seller/create-lot" element={<CreateLotPage />} />
            <Route path="/seller/edit-lot/:id" element={<CreateLotPage />} />

            {/* Rutas de administrador */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/create-lot" element={<CreateLotPage />} />
            <Route path="/admin/edit-lot/:id" element={<CreateLotPage />} />

            {/* Rutas comunes */}
            <Route path="/profile" element={<ProfilePage />} />

            <Route path="*" element={<div className="text-center py-20 text-gray-500">Próximamente...</div>} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
