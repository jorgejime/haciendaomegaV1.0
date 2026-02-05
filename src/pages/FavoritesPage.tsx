import React, { useState } from 'react';
import { Heart, Search, SlidersHorizontal, Trash2 } from 'lucide-react';
import { mockLots } from '../data/mockData';
import { LotCard } from '../components/LotCard';
import { motion, AnimatePresence } from 'framer-motion';

export const FavoritesPage: React.FC = () => {
    // Simulamos que algunos lotes están en favoritos
    const [favorites, setFavorites] = useState(mockLots.slice(0, 3));
    const [searchTerm, setSearchTerm] = useState('');

    const removeFavorite = (id: string) => {
        setFavorites(prev => prev.filter(lot => lot.id !== id));
    };

    const filteredFavorites = favorites.filter(lot =>
        lot.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lot.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lot.number.includes(searchTerm)
    );

    return (
        <div className="flex flex-col gap-6 pb-10">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                        Favoritos <Heart size={24} className="text-red-500 fill-red-500" />
                    </h1>
                    <p className="text-sm text-gray-500">Lotes que te interesan seguir</p>
                </div>
                {favorites.length > 0 && (
                    <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                        {favorites.length} Lotes
                    </span>
                )}
            </div>

            {/* Search and Filter */}
            <div className="flex gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar en favoritos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                </div>
                <button className="p-3 bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-xl text-gray-600 dark:text-gray-400">
                    <SlidersHorizontal size={20} />
                </button>
            </div>

            {/* Empty State */}
            {favorites.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 px-10 text-center"
                >
                    <div className="size-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                        <Heart size={40} className="text-gray-300 dark:text-gray-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Sin favoritos</h3>
                    <p className="text-sm text-gray-500 mt-2">No has agregado ningún lote a tu lista de favoritos todavía.</p>
                    <Link to="/" className="mt-6 text-primary font-bold text-sm">Explorar subastas</Link>
                </motion.div>
            ) : (
                <div className="flex flex-col gap-6">
                    <AnimatePresence>
                        {filteredFavorites.map((lot) => (
                            <motion.div
                                key={lot.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                className="relative group"
                            >
                                <LotCard lot={lot} />
                                <button
                                    onClick={() => removeFavorite(lot.id)}
                                    className="absolute top-3 right-3 z-10 size-9 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform active:scale-90"
                                    title="Eliminar de favoritos"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {filteredFavorites.length === 0 && searchTerm && (
                        <div className="text-center py-10">
                            <p className="text-gray-500 text-sm">No se encontraron resultados para "{searchTerm}"</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// Necesitamos importar Link para el empty state
import { Link } from 'react-router-dom';
