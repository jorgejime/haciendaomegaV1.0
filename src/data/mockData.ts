import type { Lot } from '../types';

export const mockLots: Lot[] = [
    {
        id: '1',
        number: '042',
        title: 'Toro Brahman Rojo',
        breed: 'Brahman',
        weight: 450,
        age: '24 Meses',
        genetics: 'Pura',
        location: 'Montería, Córdoba',
        seller: 'Ganadería Los Robles',
        sellerId: '1', // ID del vendedor
        basePrice: 45000000,
        currentBid: 45200000,
        status: 'live',
        imageUrl: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=800'
        ],
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        description: 'Ejemplar de excelente estructura ósea y musculatura bien definida. Ideal para mejoramiento genético.',
        createdAt: '2024-01-15',
        auctionDate: '2024-02-05'
    },
    {
        id: '2',
        number: '043',
        title: 'Vaca Nelore Elite',
        breed: 'Nelore',
        weight: 380,
        age: '18 Meses',
        genetics: 'Pura',
        location: 'Cereté, Córdoba',
        seller: 'Finca El Paraíso',
        sellerId: 'seller2',
        basePrice: 38000000,
        currentBid: 38500000,
        status: 'live',
        imageUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=800',
        createdAt: '2024-01-16'
    },
    {
        id: '3',
        number: '044',
        title: 'Toro Angus Premium',
        breed: 'Angus',
        weight: 520,
        age: '30 Meses',
        genetics: 'Pura',
        location: 'Sahagún, Córdoba',
        seller: 'Ganadería San José',
        sellerId: 'seller3',
        basePrice: 52000000,
        status: 'upcoming',
        imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=800',
        createdAt: '2024-01-17',
        auctionDate: '2024-02-10'
    },
    {
        id: '4',
        number: '045',
        title: 'Novilla Brahman Gris',
        breed: 'Brahman',
        weight: 320,
        age: '14 Meses',
        genetics: 'Pura',
        location: 'Lorica, Córdoba',
        seller: 'Hacienda La Esperanza',
        sellerId: '1',
        basePrice: 28000000,
        status: 'upcoming',
        imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800',
        createdAt: '2024-01-18',
        auctionDate: '2024-02-12'
    }
];
