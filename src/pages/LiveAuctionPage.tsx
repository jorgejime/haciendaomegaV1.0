import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Eye, Gavel, History, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockLots } from '../data/mockData';
import type { Bid } from '../types';

export const LiveAuctionPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const lot = mockLots.find(l => l.id === id) || mockLots[0];

    const [currentPrice, setCurrentPrice] = useState(lot.currentBid || lot.basePrice);
    const [bids, setBids] = useState<Bid[]>([
        { id: '1', userId: 'u1', userName: 'Usuario 45', amount: 45000000, timestamp: '1s', isTop: true },
        { id: '2', userId: 'u2', userName: 'Ganadería ZZ', amount: 44900000, timestamp: '5s' },
        { id: '3', userId: 'u3', userName: 'Juan P.', amount: 44800000, timestamp: '12s' },
    ]);
    const [showOutbidAlert, setShowOutbidAlert] = useState(false);

    // Simulación de pujas en tiempo real
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                const newAmount = currentPrice + 100000;
                const newBid: Bid = {
                    id: Math.random().toString(),
                    userId: 'bot',
                    userName: `Ganadería ${['Alfa', 'Beta', 'Omega'][Math.floor(Math.random() * 3)]}`,
                    amount: newAmount,
                    timestamp: 'Ahora',
                    isTop: true
                };
                setBids(prev => [newBid, ...prev.map(b => ({ ...b, isTop: false })).slice(0, 4)]);
                setCurrentPrice(newAmount);
                setShowOutbidAlert(true);
                setTimeout(() => setShowOutbidAlert(false), 3000);
            }
        }, 8000);
        return () => clearInterval(interval);
    }, [currentPrice]);

    const handleBid = (increment: number) => {
        const newAmount = currentPrice + increment;
        const myBid: Bid = {
            id: Math.random().toString(),
            userId: 'me',
            userName: 'Tú',
            amount: newAmount,
            timestamp: 'Ahora',
            isTop: true
        };
        setBids(prev => [myBid, ...prev.map(b => ({ ...b, isTop: false })).slice(0, 4)]);
        setCurrentPrice(newAmount);
        setShowOutbidAlert(false);
    };

    return (
        <div className="fixed inset-0 z-[60] bg-background-light dark:bg-background-dark flex flex-col max-w-md mx-auto overflow-hidden">
            {/* Sección de Video */}
            <div className="relative shrink-0 w-full aspect-[4/3] bg-black group/video">
                <img
                    src={lot.imageUrl}
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                    alt="Transmisión en vivo"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>

                {/* Controles Superiores */}
                <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10 pt-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-black/30 backdrop-blur-md text-white p-2 rounded-full hover:bg-black/50 transition"
                        aria-label="Volver"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex gap-3">
                        <div className="flex items-center gap-1 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full">
                            <Eye size={16} className="text-white" />
                            <span className="text-white text-xs font-bold">342</span>
                        </div>
                        <button
                            className="bg-black/30 backdrop-blur-md text-white p-2 rounded-full hover:bg-black/50 transition"
                            aria-label="Compartir"
                        >
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>

                {/* Badge EN VIVO */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-red-500/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg z-10">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                    <span className="text-white text-xs font-bold tracking-wider uppercase">EN VIVO</span>
                </div>

                <div className="absolute bottom-4 right-4 flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(5,194,84,0.8)]"></div>
                    <span className="text-white/80 text-[10px] font-medium">Buena conexión</span>
                </div>
            </div>

            {/* Área de Contenido */}
            <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark pb-[180px] relative no-scrollbar">
                {/* Información del Lote y Precio */}
                <div className="bg-surface-light dark:bg-surface-dark pt-6 pb-6 px-4 rounded-b-2xl shadow-sm relative z-10">
                    <div className="flex justify-center mb-2">
                        <span className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                            Lote #{lot.number}
                        </span>
                    </div>
                    <h1 className="text-gray-900 dark:text-white text-center text-[42px] font-black tracking-tight leading-none mb-2">
                        ${currentPrice.toLocaleString()}
                    </h1>

                    <AnimatePresence>
                        {showOutbidAlert && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center justify-center gap-2 mb-4"
                            >
                                <AlertTriangle className="text-red-500 animate-bounce" size={20} />
                                <p className="text-red-500 font-bold text-sm">¡Te han superado!</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium text-center mb-6">
                        {lot.breed} • {lot.weight}kg • {lot.seller}
                    </p>
                </div>

                {/* Feed de Actividad */}
                <div className="mt-6 px-4">
                    <div className="flex items-center justify-between mb-4 px-1">
                        <h3 className="text-gray-900 dark:text-white text-base font-bold">Actividad en tiempo real</h3>
                        <span className="text-xs text-primary font-medium flex items-center gap-1 cursor-pointer">
                            <History size={14} />
                            Historial
                        </span>
                    </div>
                    <div className="flex flex-col gap-3">
                        {bids.map((bid, index) => (
                            <motion.div
                                key={bid.id}
                                initial={index === 0 ? { scale: 0.9, opacity: 0 } : false}
                                animate={{ scale: 1, opacity: 1 }}
                                className={`p-3 rounded-xl flex items-center justify-between transition-all ${bid.isTop
                                        ? 'bg-white dark:bg-surface-dark border-l-4 border-primary shadow-sm'
                                        : 'bg-white/60 dark:bg-surface-dark/60 grayscale opacity-70'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden border border-gray-100 dark:border-gray-700">
                                            <img src={`https://i.pravatar.cc/100?u=${bid.userId}`} alt={bid.userName} />
                                        </div>
                                        {bid.isTop && (
                                            <div className="absolute -bottom-1 -right-1 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full border border-white dark:border-surface-dark font-bold">TOP</div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-gray-900 dark:text-white text-sm font-bold">{bid.userName}</p>
                                        <p className={`${bid.isTop ? 'text-primary' : 'text-gray-500'} text-xs font-medium`}>Ofertó ${bid.amount.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-gray-400 text-xs">{bid.timestamp}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Botones de Acción */}
            <div className="absolute bottom-0 left-0 w-full bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 p-5 pb-8 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] z-50">
                <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-4 gap-2 mb-1">
                        {[50000, 100000, 200000, 500000].map((inc) => (
                            <button
                                key={inc}
                                onClick={() => handleBid(inc)}
                                className="py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                            >
                                +{(inc / 1000)}k
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => handleBid(100000)}
                        className="w-full bg-primary hover:bg-primary-dark active:scale-[0.98] transition-all transform shadow-lg shadow-primary/30 h-14 rounded-xl flex items-center justify-center gap-2 group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                        <Gavel size={24} className="text-white" />
                        <div className="flex flex-col items-start leading-none text-white">
                            <span className="text-lg font-black tracking-tight uppercase">OFERTAR +$100.000</span>
                            <span className="text-white/80 text-[10px] font-medium">Subir a ${(currentPrice + 100000).toLocaleString()}</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};
