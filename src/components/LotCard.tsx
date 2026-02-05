import React from 'react';
import { Gavel, Scale, Heart } from 'lucide-react';
import type { Lot } from '../types';
import { Link } from 'react-router-dom';

interface LotCardProps {
    lot: Lot;
}

export const LotCard: React.FC<LotCardProps> = ({ lot }) => {
    const isLive = lot.status === 'live';

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-surface-light dark:bg-surface-dark shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all hover:shadow-lg dark:shadow-none dark:border dark:border-gray-700">
            {/* Image Container */}
            <div className="relative w-full aspect-[4/3] bg-gray-200">
                <img
                    src={lot.imageUrl}
                    alt={lot.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Status Badge */}
                {isLive ? (
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-black/80 px-3 py-1.5 shadow-sm backdrop-blur-sm">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"></span>
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-600"></span>
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wide text-red-600">En Vivo</span>
                    </div>
                ) : (
                    <div className="absolute top-3 left-3 rounded-md bg-gray-900/60 px-2 py-1 backdrop-blur-sm">
                        <span className="text-[10px] font-bold uppercase tracking-wide text-white">Próximamente</span>
                    </div>
                )}

                {/* Favorite Button Overlay */}
                <button
                    className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition-colors"
                    aria-label="Agregar a favoritos"
                >
                    <Heart size={20} />
                </button>
            </div>

            {/* Card Content */}
            <div className="flex flex-col p-4 gap-3">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Lote #{lot.number}</p>
                        <h3 className="text-xl font-bold leading-tight text-[#111814] dark:text-white">{lot.title}</h3>
                    </div>
                    {isLive && (
                        <div className="text-right">
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Oferta Actual</p>
                            <p className="text-lg font-bold text-[#111814] dark:text-white">
                                ${lot.currentBid?.toLocaleString()}
                            </p>
                        </div>
                    )}
                </div>

                {/* Details Row */}
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-1.5">
                        <Scale size={18} className="text-gray-400" />
                        <span>{lot.weight}kg</span>
                    </div>
                    <div className="h-1 w-1 rounded-full bg-gray-300"></div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-gray-400 font-medium text-xs uppercase tracking-tighter">Raza</span>
                        <span className="font-semibold">{lot.breed}</span>
                    </div>
                </div>

                {/* Action */}
                <Link
                    to={isLive ? `/live/${lot.id}` : `/lot/${lot.id}`}
                    className={`mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-colors shadow-sm ${isLive
                            ? 'bg-primary hover:bg-primary-dark text-white shadow-primary/20'
                            : 'border border-primary text-primary hover:bg-primary hover:text-white'
                        }`}
                >
                    {isLive && <Gavel size={20} />}
                    {isLive ? 'Ofertar Ahora' : 'Ver Detalles'}
                </Link>
            </div>
        </div>
    );
};
