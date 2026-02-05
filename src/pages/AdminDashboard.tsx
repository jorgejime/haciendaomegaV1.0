import React, { useState } from 'react';
import {
    LayoutDashboard,
    Package,
    Users,
    Gavel,
    Settings,
    Plus,
    Edit3,
    Trash2,
    TrendingUp,
    DollarSign,
    MoreVertical,
    Search,
    CheckCircle,
    XCircle,
    Clock
} from 'lucide-react';
import { mockLots } from '../data/mockData';
import { motion } from 'framer-motion';

export const AdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'lots' | 'users'>('overview');

    const stats = [
        { label: 'Ventas Totales', value: '$842.5M', icon: DollarSign, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
        { label: 'Usuarios Activos', value: '1,248', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
        { label: 'Lotes en Subasta', value: '15', icon: Package, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
        { label: 'Ofertas Hoy', value: '142', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
    ];

    return (
        <div className="flex flex-col gap-6 pb-20">
            {/* Admin Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white">Backoffice</h1>
                    <p className="text-sm text-gray-500">Gestión Administrativa Hacienda Omega</p>
                </div>
                <button
                    onClick={() => window.location.href = '/admin/create-lot'}
                    className="bg-primary text-white p-2.5 rounded-xl flex items-center gap-2 font-bold text-sm shadow-lg shadow-primary/20"
                >
                    <Plus size={20} />
                    Nuevo Lote
                </button>
            </div>

            {/* Admin Tabs */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                {[
                    { id: 'overview', label: 'Resumen', icon: LayoutDashboard },
                    { id: 'lots', label: 'Gestión Lotes', icon: Package },
                    { id: 'users', label: 'Usuarios', icon: Users },
                    { id: 'auctions', label: 'Subastas', icon: Gavel },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id
                            ? 'bg-primary text-white shadow-md shadow-primary/20'
                            : 'bg-white dark:bg-surface-dark text-gray-500 border border-gray-100 dark:border-gray-800'
                            }`}
                    >
                        <tab.icon size={18} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === 'overview' && (
                <div className="flex flex-col gap-6">
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

                    {/* Recent Activity */}
                    <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between">
                            <h3 className="font-bold text-gray-900 dark:text-white">Últimas Ofertas</h3>
                            <button className="text-primary text-xs font-bold">Ver Todo</button>
                        </div>
                        <div className="divide-y divide-gray-50 dark:divide-gray-800">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-primary">
                                            <Gavel size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">Juan Ramos obertó $45.2M</p>
                                            <p className="text-[10px] text-gray-500 uppercase font-medium">Lote #042 • Nelore Puro</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-medium text-gray-400">Hace 2m</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'lots' && (
                <div className="flex flex-col gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar lote por número o nombre..."
                            className="w-full bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        {mockLots.map((lot) => (
                            <div key={lot.id} className="bg-white dark:bg-surface-dark p-3 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
                                <img src={lot.imageUrl} className="size-16 rounded-xl object-cover" alt="" />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black text-primary uppercase">#{lot.number}</span>
                                        <h4 className="text-sm font-bold truncate">{lot.title}</h4>
                                    </div>
                                    <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-500 font-medium">
                                        <span className="flex items-center gap-1">
                                            {lot.status === 'live' ? <CheckCircle size={12} className="text-primary" /> : <Clock size={12} />}
                                            {lot.status === 'live' ? 'Activo' : 'Borrador'}
                                        </span>
                                        <span>${lot.basePrice.toLocaleString()} / Base</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                                        <Edit3 size={18} />
                                    </button>
                                    <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'users' && (
                <div className="flex flex-col gap-4">
                    <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-50 dark:border-gray-800">
                            <h3 className="font-bold">Verificación de Usuarios</h3>
                        </div>
                        <div className="divide-y divide-gray-50 dark:divide-gray-800">
                            {[
                                { name: 'Ricardo Alarcon', email: 'r.alarcon@ganaderia.com', status: 'pending' },
                                { name: 'Maria Beltran', email: 'm.beltran@finca.co', status: 'pending' },
                            ].map((user) => (
                                <div key={user.email} className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold text-gray-400">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 text-primary hover:bg-primary/10 rounded-lg">
                                            <CheckCircle size={20} />
                                        </button>
                                        <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                            <XCircle size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
