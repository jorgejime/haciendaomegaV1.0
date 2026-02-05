import React, { useState } from 'react';
import { Menu, Bell, Home, Gavel, Heart, User, X, Settings, LogOut, Info, ShieldCheck, LayoutDashboard, Store } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, hasRole, hasAnyRole } = useAuth();

    // Menú dinámico según el rol del usuario
    const getMenuItems = () => {
        const baseItems = [
            { icon: User, label: 'Mi Cuenta', path: '/profile', roles: ['buyer', 'seller', 'admin', 'auctioneer'] },
        ];

        // Items para compradores
        if (hasAnyRole(['buyer', 'admin'])) {
            baseItems.push(
                { icon: Gavel, label: 'Mis Ofertas', path: '/bids', roles: ['buyer', 'admin'] },
                { icon: Heart, label: 'Favoritos', path: '/favorites', roles: ['buyer', 'admin'] }
            );
        }

        // Items para vendedores
        if (hasAnyRole(['seller', 'admin'])) {
            baseItems.push(
                { icon: Store, label: 'Mi Ganadería', path: '/seller', roles: ['seller', 'admin'] }
            );
        }

        // Items para administradores
        if (hasRole('admin')) {
            baseItems.push(
                { icon: LayoutDashboard, label: 'Backoffice Admin', path: '/admin', roles: ['admin'] }
            );
        }

        // Items comunes
        baseItems.push(
            { icon: ShieldCheck, label: 'Verificaciones', path: '/verify', roles: ['buyer', 'seller', 'admin', 'auctioneer'] },
            { icon: Settings, label: 'Configuración', path: '/settings', roles: ['buyer', 'seller', 'admin', 'auctioneer'] },
            { icon: Info, label: 'Ayuda y Soporte', path: '/help', roles: ['buyer', 'seller', 'admin', 'auctioneer'] }
        );

        return baseItems.filter(item =>
            user && item.roles.includes(user.role)
        );
    };

    const menuItems = getMenuItems();

    // Badge de rol
    const getRoleBadge = () => {
        const badges = {
            admin: { label: 'Administrador', color: 'text-red-500 bg-red-50 dark:bg-red-900/20' },
            seller: { label: 'Vendedor', color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' },
            buyer: { label: 'Comprador Premium', color: 'text-primary bg-primary/10' },
            auctioneer: { label: 'Rematador', color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20' }
        };
        return user ? badges[user.role] : badges.buyer;
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display flex flex-col max-w-md mx-auto shadow-2xl relative overflow-x-hidden">
            {/* Drawer Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm max-w-md mx-auto"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-[80%] max-w-[320px] bg-white dark:bg-surface-dark z-[101] p-6 shadow-2xl flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="text-xl font-black italic">
                                    Hacienda<span className="text-primary text-2xl">Ω</span>
                                </h2>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
                                    aria-label="Cerrar menú"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex items-center gap-4 mb-10 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
                                <div className="size-12 rounded-full overflow-hidden border-2 border-primary">
                                    <img src={user?.avatar} alt="Profile" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">{user?.name}</h3>
                                    <p className={`text-[10px] font-bold tracking-widest uppercase ${getRoleBadge().color} px-2 py-0.5 rounded-full inline-block mt-1`}>
                                        {getRoleBadge().label}
                                    </p>
                                </div>
                            </div>

                            <nav className="flex-1 flex flex-col gap-2">
                                {menuItems.map((item) => (
                                    <NavLink
                                        key={item.label}
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 p-4 rounded-xl transition-all ${isActive
                                                ? 'bg-primary/10 text-primary font-bold'
                                                : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-600 dark:text-gray-400'
                                            }`
                                        }
                                    >
                                        <item.icon size={20} />
                                        <span className="text-sm">{item.label}</span>
                                    </NavLink>
                                ))}
                            </nav>

                            <button className="flex items-center gap-4 p-4 mt-auto text-red-500 font-bold border-t border-gray-100 dark:border-gray-800 pt-6">
                                <LogOut size={20} />
                                <span className="text-sm">Cerrar Sesión</span>
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Header */}
            <header className="sticky top-0 z-50 flex items-center justify-between bg-surface-light dark:bg-surface-dark px-4 py-3 shadow-sm transition-colors duration-200">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-[#111814] dark:text-white transition-colors"
                        aria-label="Menu Principal"
                    >
                        <Menu size={24} />
                    </button>
                    <h1 className="text-xl font-extrabold tracking-tight text-[#111814] dark:text-white">
                        Hacienda<span className="text-primary">Omega</span>
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="relative flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-[#111814] dark:text-white transition-colors"
                        aria-label="Notificaciones"
                    >
                        <Bell size={24} />
                        <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white dark:border-surface-dark"></span>
                    </button>
                    <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden border border-gray-100 dark:border-gray-700">
                        <img
                            alt="Profile"
                            className="h-full w-full object-cover"
                            src={user?.avatar}
                        />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 pb-24 px-4 pt-4">
                {children}
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface-light dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 pb-safe pt-2 px-6 max-w-md mx-auto">
                <div className="flex justify-between items-center pb-2">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-primary' : 'text-gray-400 dark:text-gray-500'}`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <Home size={24} fill="currentColor" fillOpacity={isActive ? 0.2 : 0} />
                                <span className="text-[10px] font-bold">Inicio</span>
                            </>
                        )}
                    </NavLink>

                    {hasAnyRole(['buyer', 'admin']) && (
                        <NavLink
                            to="/bids"
                            className={({ isActive }) =>
                                `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-primary' : 'text-gray-400 dark:text-gray-500'}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Gavel size={24} fill="currentColor" fillOpacity={isActive ? 0.2 : 0} />
                                    <span className="text-[10px] font-medium">Ofertas</span>
                                </>
                            )}
                        </NavLink>
                    )}

                    {hasAnyRole(['seller', 'admin']) && (
                        <NavLink
                            to="/seller"
                            className={({ isActive }) =>
                                `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-primary' : 'text-gray-400 dark:text-gray-500'}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Store size={24} fill="currentColor" fillOpacity={isActive ? 0.2 : 0} />
                                    <span className="text-[10px] font-medium">Ganadería</span>
                                </>
                            )}
                        </NavLink>
                    )}

                    {hasAnyRole(['buyer', 'admin']) && (
                        <NavLink
                            to="/favorites"
                            className={({ isActive }) =>
                                `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-primary' : 'text-gray-400 dark:text-gray-500'}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Heart size={24} fill="currentColor" fillOpacity={isActive ? 0.2 : 0} />
                                    <span className="text-[10px] font-medium">Favoritos</span>
                                </>
                            )}
                        </NavLink>
                    )}

                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-primary' : 'text-gray-400 dark:text-gray-500'}`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <User size={24} fill="currentColor" fillOpacity={isActive ? 0.2 : 0} />
                                <span className="text-[10px] font-medium">Perfil</span>
                            </>
                        )}
                    </NavLink>
                </div>
            </nav>
        </div>
    );
};
