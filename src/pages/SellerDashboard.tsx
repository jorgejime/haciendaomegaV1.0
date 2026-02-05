import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    Package,
    TrendingUp,
    DollarSign,
    Plus,
    Edit3,
    Trash2,
    Search,
    CheckCircle,
    Clock,
    Eye
} from 'lucide-react';
import { mockLots } from '../data/mockData';

export const SellerDashboard: React.FC = () => {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');

    // Filtrar solo los lotes del vendedor actual
    const myLots = mockLots.filter(lot => lot.sellerId === user?.id);

    const stats = [
        { label: 'Lotes Activos', value: myLots.filter(l => l.status === 'live').length.toString(), icon: Package, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
        { label: 'Próximos', value: myLots.filter(l => l.status === 'upcoming').length.toString(), icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
        { label: 'Vendidos', value: myLots.filter(l => l.status === 'sold').length.toString(), icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
        { label: 'Ingresos', value: '$842M', icon: DollarSign, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
    ];

    const filteredLots = myLots.filter(lot =>
        lot.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lot.number.includes(searchTerm)
    );

    return (
        <div className="flex flex-col gap-6 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white">Mi Ganadería</h1>
                    <p className="text-sm text-gray-500">{user?.sellerInfo?.farmName || 'Panel de Vendedor'}</p>
                </div>
                <button
                    onClick={() => window.location.href = '/seller/create-lot'}
                    className="bg-primary text-white p-2.5 rounded-xl flex items-center gap-2 font-bold text-sm shadow-lg shadow-primary/20"
                >
                    <Plus size={20} />
                    Nuevo Lote
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                            <stat.icon className={stat.color} size={20} />
                        </div>
                        <p className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Buscar mis lotes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
            </div>

            {/* Lots List */}
            <div className="flex flex-col gap-3">
                <h3 className="font-bold text-gray-900 dark:text-white px-1">Mis Lotes</h3>
                {filteredLots.length > 0 ? (
                    filteredLots.map((lot) => (
                        <div key={lot.id} className="bg-white dark:bg-surface-dark p-3 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
                            <img src={lot.imageUrl} className="size-16 rounded-xl object-cover" alt="" />
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black text-primary uppercase">#{lot.number}</span>
                                    <h4 className="text-sm font-bold truncate">{lot.title}</h4>
                                </div>
                                <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-500 font-medium">
                                    <span className="flex items-center gap-1">
                                        {lot.status === 'live' && <CheckCircle size={12} className="text-primary" />}
                                        {lot.status === 'upcoming' && <Clock size={12} className="text-blue-500" />}
                                        {lot.status === 'live' ? 'En Vivo' : lot.status === 'upcoming' ? 'Próximo' : 'Borrador'}
                                    </span>
                                    <span>${lot.basePrice.toLocaleString()}</span>
                                    {lot.status === 'live' && lot.currentBid && (
                                        <span className="text-primary font-bold">Oferta: ${lot.currentBid.toLocaleString()}</span>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => window.location.href = `/lot/${lot.id}`}
                                    className="p-2 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
                                    title="Ver"
                                >
                                    <Eye size={18} />
                                </button>
                                <button
                                    onClick={() => window.location.href = `/seller/edit-lot/${lot.id}`}
                                    className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                    title="Editar"
                                >
                                    <Edit3 size={18} />
                                </button>
                                <button
                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                    title="Eliminar"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        <p className="text-sm">No tienes lotes registrados</p>
                        <button
                            onClick={() => window.location.href = '/seller/create-lot'}
                            className="mt-4 text-primary font-bold text-sm"
                        >
                            Crear tu primer lote
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
