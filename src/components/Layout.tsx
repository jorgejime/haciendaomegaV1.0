import React, { useState } from 'react';
import { Menu, Bell, Home, Gavel, Heart, User, X, Settings, LogOut, Info, ShieldCheck, LayoutDashboard } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { icon: User, label: 'Mi Cuenta', path: '/profile' },
        { icon: Gavel, label: 'Mis Ofertas', path: '/bids' },
        { icon: Heart, label: 'Favoritos', path: '/favorites' },
        { icon: LayoutDashboard, label: 'Backoffice', path: '/admin' },
        { icon: ShieldCheck, label: 'Verificaciones', path: '/verify' },
        { icon: Settings, label: 'Configuración', path: '/settings' },
        { icon: Info, label: 'Ayuda y Soporte', path: '/help' },
    ];

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
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex items-center gap-4 mb-10 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
                                <div className="size-12 rounded-full overflow-hidden border-2 border-primary">
                                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" alt="Profile" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Jorge Jiménez</h3>
                                    <p className="text-[10px] text-primary font-bold tracking-widest uppercase">Premium Member</p>
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
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"
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
