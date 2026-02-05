export type UserRole = 'buyer' | 'seller' | 'admin' | 'auctioneer';

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    role: UserRole;
    verified: boolean;
    memberSince: string;
    // Información específica por rol
    buyerInfo?: {
        totalBids: number;
        lotsWon: number;
        favorites: string[];
    };
    sellerInfo?: {
        farmName: string;
        location: string;
        totalLotsSold: number;
        rating: number;
    };
}

export interface Lot {
    id: string;
    number: string;
    title: string;
    breed: string;
    weight: number;
    age?: string;
    genetics?: string;
    location: string;
    seller: string;
    sellerId: string; // ID del vendedor
    basePrice: number;
    currentBid?: number;
    status: 'draft' | 'upcoming' | 'live' | 'sold' | 'cancelled';
    imageUrl: string;
    images?: string[];
    youtubeUrl?: string; // URL del video en vivo
    description?: string;
    createdAt: string;
    auctionDate?: string;
}

export interface Bid {
    id: string;
    lotId: string;
    userId: string;
    userName: string;
    amount: number;
    timestamp: string;
    isTop?: boolean;
}

export interface AuctionSession {
    id: string;
    name: string;
    date: string;
    status: 'scheduled' | 'live' | 'completed';
    lots: string[]; // IDs de lotes
    auctioneerId: string; // ID del rematador
    youtubeUrl?: string; // URL de transmisión general
}
