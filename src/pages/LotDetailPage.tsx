import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Heart, Scale, Gavel, Timer, MapPin, CheckCircle, Bell } from 'lucide-react';
import { mockLots } from '../data/mockData';

export const LotDetailPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const lot = mockLots.find(l => l.id === id) || mockLots[0];

    return (
        <div className="fixed inset-0 z-[60] bg-background-light dark:bg-background-dark flex flex-col max-w-md mx-auto overflow-hidden">
            {/* Navegación Superior */}
            <header className="sticky top-0 z-30 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors duration-300 pt-10">
                <div className="flex items-center justify-between px-4 py-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center p-2 -ml-2 rounded-full text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Volver"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h2 className="text-base font-bold text-gray-900 dark:text-white tracking-tight">Detalle de Lote</h2>
                    <button
                        className="flex items-center justify-center p-2 -mr-2 rounded-full text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Compartir"
                    >
                        <Share2 size={24} />
                    </button>
                </div>
            </header>

            {/* Contenido Principal */}
            <main className="flex-1 pb-32 overflow-y-auto no-scrollbar">
                {/* Carrusel de Imágenes */}
                <div className="relative w-full aspect-[4/3] bg-gray-200 dark:bg-gray-800">
                    <img
                        src={lot.imageUrl}
                        className="w-full h-full object-cover"
                        alt={lot.title}
                    />
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-white/20">
                        <CheckCircle className="text-primary" size={18} />
                        <span className="text-xs font-semibold text-gray-900 dark:text-white">Verificado por Vet.</span>
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary shadow-sm"></div>
                        <div className="w-2 h-2 rounded-full bg-white/60 backdrop-blur-sm shadow-sm"></div>
                        <div className="w-2 h-2 rounded-full bg-white/60 backdrop-blur-sm shadow-sm"></div>
                    </div>
                </div>

                {/* Título y Precio */}
                <div className="px-5 pt-6 pb-2">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-1">
                                Lote #{lot.number} - {lot.title}
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{lot.seller}</p>
                        </div>
                        <button
                            className="shrink-0 p-2 rounded-full border border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 hover:text-red-500 hover:border-red-200 transition-colors"
                            aria-label="Favorito"
                        >
                            <Heart size={20} />
                        </button>
                    </div>
                    <div className="mt-4 p-4 bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Precio Base</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                            ${lot.basePrice.toLocaleString()} <span className="text-sm font-normal text-gray-500">COP</span>
                        </p>
                    </div>
                </div>

                {/* Ficha Técnica */}
                <div className="px-5 py-4">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Ficha Técnica</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-2">
                            <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                                <Gavel className="text-primary" size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Genética</p>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">{lot.genetics || 'Pura'}</p>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-2">
                            <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                                <Timer className="text-primary" size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Edad</p>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">{lot.age || '24 Meses'}</p>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-2">
                            <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                                <Scale className="text-primary" size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Peso</p>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">{lot.weight} kg</p>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-2">
                            <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                                <MapPin className="text-primary" size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Ubicación</p>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{lot.location}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-5 py-2">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Observaciones</h3>
                    <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                            {lot.description || 'Ejemplar de excelente estructura ósea y musculatura bien definida.'}
                        </p>
                    </div>
                </div>
            </main>

            {/* Botones de Acción Fijos */}
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 p-4 max-w-md mx-auto pb-8">
                <div className="flex flex-col gap-3">
                    <button
                        className="w-full flex items-center justify-center gap-2 h-12 rounded-lg border border-primary/30 bg-primary/5 active:bg-primary/10 transition-colors"
                    >
                        <Bell className="text-primary" size={20} />
                        <span className="text-primary font-bold text-base">Notificarme</span>
                    </button>
                    <button
                        className="w-full flex items-center justify-center gap-2 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-medium cursor-not-allowed select-none"
                        disabled
                    >
                        <Timer size={20} />
                        <span className="font-mono text-sm tracking-wide">La subasta inicia en: 02d 04h 15m</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
