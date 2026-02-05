import React, { useState } from 'react';
import { Gavel, Clock, Trophy, ChevronRight } from 'lucide-react';
import { mockLots } from '../data/mockData';
import { Link } from 'react-router-dom';

export const MyBidsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'active' | 'won'>('active');

    // Datos simulados para mis ofertas
    const activeBids = mockLots.filter(l => l.status === 'live').map(l => ({
        ...l,
        myBidAmount: (l.currentBid || l.basePrice) - 500000,
        isWinning: Math.random() > 0.5
    }));

    const wonBids = mockLots.filter(l => l.status === 'upcoming').slice(0, 1).map(l => ({
        ...l,
        finalPrice: l.basePrice + 2000000,
        date: 'Hace 2 días'
    }));

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-black text-gray-900 dark:text-white">Mis Ofertas</h1>
                <p className="text-sm text-gray-500">Gestiona tus participaciones y compras</p>
            </div>

            {/* Tabs */}
            <div className="flex bg-gray-100 dark:bg-surface-dark p-1 rounded-xl">
                <button
                    onClick={() => setActiveTab('active')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'active'
                            ? 'bg-white dark:bg-primary text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-500'
                        }`}
                >
                    <Gavel size={18} />
                    Activas
                </button>
                <button
                    onClick={() => setActiveTab('won')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'won'
                            ? 'bg-white dark:bg-primary text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-500'
                        }`}
                >
                    <Trophy size={18} />
                    Ganadas
                </button>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-4">
                {activeTab === 'active' ? (
                    activeBids.length > 0 ? (
                        activeBids.map(bid => (
                            <Link
                                key={bid.id}
                                to={`/live/${bid.id}`}
                                className="bg-surface-light dark:bg-surface-dark p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex gap-4 items-center"
                            >
                                <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-gray-200">
                                    <img src={bid.imageUrl} alt={bid.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-sm truncate">Lote #{bid.number} - {bid.title}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${bid.isWinning ? 'bg-primary/20 text-primary' : 'bg-red-500/20 text-red-500'
                                            }`}>
                                            {bid.isWinning ? 'Ganando' : 'Superado'}
                                        </span>
                                        <span className="text-xs text-gray-400 font-medium">Tu puja: ${bid.myBidAmount?.toLocaleString()}</span>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="text-gray-300" />
                            </Link>
                        ))
                    ) : (
                        <div className="text-center py-12 text-gray-500">No tienes ofertas activas</div>
                    )
                ) : (
                    wonBids.map(bid => (
                        <Link
                            key={bid.id}
                            to={`/checkout/${bid.id}`}
                            className="bg-surface-light dark:bg-surface-dark p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-4"
                        >
                            <div className="flex gap-4 items-center">
                                <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-gray-200">
                                    <img src={bid.imageUrl} alt={bid.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-sm truncate">Lote #{bid.number} - {bid.title}</h3>
                                    <p className="text-xs text-gray-400 mt-1">Precio Final: <span className="text-primary font-bold">${bid.finalPrice?.toLocaleString()}</span></p>
                                    <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                                        <Clock size={10} /> {bid.date}
                                    </p>
                                </div>
                                <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-xs font-bold">
                                    Pagar
                                </button>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};
