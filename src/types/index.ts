export interface Lot {
    id: string;
    number: number;
    title: string;
    breed: string;
    weight: number;
    location: string;
    status: 'live' | 'upcoming' | 'finished';
    currentBid?: number;
    basePrice: number;
    imageUrl: string;
    seller?: string;
    description?: string;
    verifiedBy?: string;
    age?: string;
    genetics?: string;
}

export interface Bid {
    id: string;
    userId: string;
    userName: string;
    amount: number;
    timestamp: string;
    isTop?: boolean;
}

export interface User {
    id: string;
    name: string;
    avatar?: string;
    email: string;
}
