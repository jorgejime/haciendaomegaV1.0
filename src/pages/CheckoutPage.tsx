import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Scale, MapPin, ReceiptText, ShieldCheck, Check, CreditCard, Landmark, Wallet, ArrowRight } from 'lucide-react';
import { mockLots } from '../data/mockData';

export const CheckoutPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const lot = mockLots.find(l => l.id === id) || mockLots[0];

    const hammerPrice = lot.currentBid || lot.basePrice;
    const commission = hammerPrice * 0.05;
    const iva = commission * 0.19;
    const total = hammerPrice + commission + iva;

    const [paymentMethod, setPaymentMethod] = useState('bank');

    return (
        <div className="fixed inset-0 z-[60] bg-background-light dark:bg-background-dark flex flex-col max-w-md mx-auto overflow-hidden">
            {/* Top App Bar */}
            <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-100 dark:border-white/5 pt-10">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center justify-center p-2 -ml-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    aria-label="Volver"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-lg font-bold tracking-tight flex-1 text-center pr-8">Liquidación y Pago</h1>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto pb-32 px-4 pt-4 scroll-smooth no-scrollbar">
                {/* Lot Summary Card */}
                <section className="mb-6">
                    <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-gray-100 dark:border-white/5 flex gap-4 items-start">
                        <div className="flex-1 flex flex-col gap-1.5">
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/20 w-fit">
                                <Trophy size={14} className="text-green-800 dark:text-green-300" />
                                <span className="text-xs font-bold text-green-800 dark:text-green-300 uppercase tracking-wide">Ganador</span>
                            </div>
                            <h2 className="text-base font-bold leading-tight">Lote #{lot.number} - {lot.title}</h2>
                            <div className="flex flex-col gap-0.5 mt-1">
                                <p className="text-gray-500 dark:text-gray-400 text-xs font-medium flex items-center gap-1">
                                    <Scale size={14} />
                                    Peso: {lot.weight}kg Promedio
                                </p>
                                <p className="text-gray-500 dark:text-gray-400 text-xs font-medium flex items-center gap-1">
                                    <MapPin size={14} />
                                    Ubicación: {lot.location}
                                </p>
                            </div>
                        </div>
                        <div className="w-24 h-24 shrink-0 rounded-lg bg-cover bg-center shadow-inner relative overflow-hidden">
                            <img src={lot.imageUrl} alt={lot.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                    </div>
                </section>

                {/* Detailed Cost Breakdown */}
                <section className="mb-8">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <h3 className="text-base font-bold">Detalle de Costos</h3>
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-2 py-1 rounded-full">
                            <ReceiptText size={14} />
                            <span>Factura #HO-{Math.floor(Math.random() * 9000) + 1000}</span>
                        </div>
                    </div>
                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
                        <div className="p-4 space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 dark:text-gray-400">Precio Martillo</span>
                                <span className="font-medium">${hammerPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 dark:text-gray-400">Comisión Subasta (5%)</span>
                                <span className="font-medium">${commission.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-b border-dashed border-gray-200 dark:border-white/10 pb-3">
                                <span className="text-gray-500 dark:text-gray-400">IVA Comisión (19%)</span>
                                <span className="font-medium">${iva.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center pt-1">
                                <span className="text-base font-bold">Total a Pagar</span>
                                <span className="text-xl font-bold text-primary tracking-tight">${total.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-white/5 px-4 py-2 flex items-center justify-end gap-1.5">
                            <ShieldCheck className="text-primary" size={16} />
                            <span className="text-xs font-medium text-primary">Transacción Segura</span>
                        </div>
                    </div>
                </section>

                {/* Payment Methods */}
                <section className="pb-10">
                    <h3 className="text-base font-bold mb-3 px-1">Método de Pago</h3>
                    <div className="flex flex-col gap-3">
                        {[
                            { id: 'bank', icon: Landmark, name: 'Transferencia Bancaria', detail: 'Recomendado', color: 'blue' },
                            { id: 'pse', icon: Wallet, name: 'PSE', detail: 'Débito cuenta ahorros/corriente', color: 'pink' },
                            { id: 'card', icon: CreditCard, name: 'Tarjeta de Crédito', detail: 'Visa, Mastercard, Amex', color: 'purple' }
                        ].map((method) => (
                            <button
                                key={method.id}
                                onClick={() => setPaymentMethod(method.id)}
                                className={`flex items-center justify-between p-4 rounded-xl transition-all border-2 ${paymentMethod === method.id
                                        ? 'bg-surface-light dark:bg-surface-dark border-primary shadow-sm'
                                        : 'bg-surface-light/50 dark:bg-surface-dark/50 border-transparent border-gray-100 dark:border-white/5 opacity-80'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${paymentMethod === method.id ? 'bg-primary/10 text-primary' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                                        }`}>
                                        <method.icon size={20} />
                                    </div>
                                    <div className="text-left">
                                        <span className="block text-sm font-bold">{method.name}</span>
                                        <span className="block text-xs text-gray-500 dark:text-gray-400">{method.detail}</span>
                                    </div>
                                </div>
                                {paymentMethod === method.id && (
                                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                        <Check size={14} className="text-white" />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </section>
            </main>

            {/* Sticky Bottom Bar */}
            <footer className="fixed bottom-0 w-full max-w-md bg-surface-light dark:bg-surface-dark border-t border-gray-100 dark:border-white/5 p-4 z-40 pb-8 safe-area-bottom shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between mb-3 px-1">
                    <span className="text-sm font-medium text-gray-500">Total a Pagar</span>
                    <span className="text-lg font-bold">${total.toLocaleString()}</span>
                </div>
                <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-base py-4 rounded-xl shadow-lg shadow-primary/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                    <span>Finalizar Pago</span>
                    <ArrowRight size={20} />
                </button>
            </footer>
        </div>
    );
};
