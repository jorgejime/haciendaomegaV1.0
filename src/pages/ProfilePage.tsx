import React from 'react';
import {
    User,
    Mail,
    Phone,
    MapPin,
    CreditCard,
    ShieldCheck,
    ChevronRight,
    Camera,
    Settings,
    Bell,
    Lock,
    LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';

export const ProfilePage: React.FC = () => {
    const user = {
        name: 'Jorge Jiménez',
        email: 'jorge.jimenez@example.com',
        phone: '+57 300 123 4567',
        location: 'Montería, Córdoba',
        memberSince: 'Enero 2024',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
        type: 'Comprador Premium'
    };

    const sections = [
        {
            title: 'Cuenta',
            items: [
                { icon: User, label: 'Información Personal', value: 'Edita tus datos', color: 'text-blue-500' },
                { icon: MapPin, label: 'Direcciones de Envío', value: '2 guardadas', color: 'text-green-500' },
                { icon: CreditCard, label: 'Métodos de Pago', value: 'Visa **** 4242', color: 'text-purple-500' },
            ]
        },
        {
            title: 'Seguridad y Notificaciones',
            items: [
                { icon: ShieldCheck, label: 'Verificación de Identidad', value: 'Verificado', color: 'text-primary' },
                { icon: Bell, label: 'Notificaciones', value: 'Activadas', color: 'text-orange-500' },
                { icon: Lock, label: 'Cambiar Contraseña', value: '', color: 'text-gray-500' },
            ]
        }
    ];

    return (
        <div className="flex flex-col gap-8 pb-10">
            {/* Profile Header */}
            <div className="relative flex flex-col items-center pt-4">
                <div className="relative group">
                    <div className="size-28 rounded-full overflow-hidden border-4 border-white dark:border-surface-dark shadow-xl">
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                    <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                        <Camera size={18} />
                    </button>
                </div>

                <div className="text-center mt-4">
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white">{user.name}</h1>
                    <div className="flex items-center justify-center gap-2 mt-1">
                        <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
                            {user.type}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Miembro desde {user.memberSince}</p>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 px-2">
                <div className="bg-white dark:bg-surface-dark p-3 rounded-2xl border border-gray-100 dark:border-gray-800 text-center shadow-sm">
                    <p className="text-xl font-black text-primary">12</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Pujas</p>
                </div>
                <div className="bg-white dark:bg-surface-dark p-3 rounded-2xl border border-gray-100 dark:border-gray-800 text-center shadow-sm">
                    <p className="text-xl font-black text-primary">03</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Ganados</p>
                </div>
                <div className="bg-white dark:bg-surface-dark p-3 rounded-2xl border border-gray-100 dark:border-gray-800 text-center shadow-sm">
                    <p className="text-xl font-black text-primary">08</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Favoritos</p>
                </div>
            </div>

            {/* Profile Sections */}
            <div className="flex flex-col gap-8">
                {sections.map((section, sIndex) => (
                    <div key={section.title} className="flex flex-col gap-3">
                        <h3 className="px-1 text-xs font-black text-gray-400 uppercase tracking-widest">{section.title}</h3>
                        <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                            {section.items.map((item, iIndex) => (
                                <button
                                    key={item.label}
                                    className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${iIndex !== section.items.length - 1 ? 'border-b border-gray-50 dark:border-gray-800' : ''
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 ${item.color}`}>
                                            <item.icon size={20} />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">{item.label}</p>
                                            {item.value && <p className="text-xs text-gray-500">{item.value}</p>}
                                        </div>
                                    </div>
                                    <ChevronRight size={18} className="text-gray-300" />
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                <button className="flex items-center justify-center gap-2 p-4 text-red-500 font-bold bg-red-50 dark:bg-red-500/10 rounded-2xl hover:bg-red-100 transition-colors mt-4">
                    <LogOut size={20} />
                    <span>Cerrar Sesión</span>
                </button>
            </div>

            <div className="text-center">
                <p className="text-[10px] text-gray-400 font-medium">Hacienda Omega v1.0.0</p>
            </div>
        </div>
    );
};
