import React, { useState } from 'react';
import { LotCard } from '../components/LotCard';
import { mockLots } from '../data/mockData';

export const HomePage: React.FC = () => {
    const [filter, setFilter] = useState('Todos');
    const categories = ['Todos', 'En Vivo', 'Próximamente', 'Brahman', 'Nelore'];

    const filteredLots = mockLots.filter(lot => {
        if (filter === 'Todos') return true;
        if (filter === 'En Vivo') return lot.status === 'live';
        if (filter === 'Próximamente') return lot.status === 'upcoming';
        return lot.breed.includes(filter);
    });

    return (
        <div className="flex flex-col gap-5">
            {/* Filter Chips */}
            <div className="sticky top-[64px] z-40 -mx-4 w-[calc(100%+2rem)] bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200/50 dark:border-white/5 py-3 transition-colors duration-200">
                <div className="flex gap-3 overflow-x-auto px-4 no-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-transform active:scale-95 text-sm ${filter === cat
                                    ? 'bg-[#111814] dark:bg-primary text-white font-semibold shadow-sm'
                                    : 'bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium'
                                }`}
                        >
                            <span>{cat}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Feed */}
            <div className="flex flex-col gap-6">
                {filteredLots.map((lot) => (
                    <LotCard key={lot.id} lot={lot} />
                ))}
            </div>
        </div>
    );
};
