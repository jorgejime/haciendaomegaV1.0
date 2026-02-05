import type { Lot } from '../types';

export const mockLots: Lot[] = [
    {
        id: '1',
        number: 1,
        title: 'Gran Campeón Brahman',
        breed: 'Brahman Gris',
        weight: 600,
        location: 'Montería, Córdoba',
        status: 'live',
        currentBid: 45000000,
        basePrice: 35000000,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChBBBS7qJ2X5fct3IGdDgt9nQbM9QnuDuknnzsa69mtRBtkmhvOnLILO8O67Yvbeu6vfstElJD1y_oRuJMiW4h6zTWAqORQRW9WdnrghehRz9wJ68e-b6T-fBK8M0-qF5_9_czbIAkdxKYKfERQ_oEuW9LJuy_8fI8_oNakTejH5jZZKdGB_398axrCAhTFWiNMUsR7ySm9Wcm2VUAROTGRQ_S3IYzCbyDaQvRbohWq133z0GnWMLU2lMfII-vo8r83vjflCSINQs',
        seller: 'Hacienda Omega',
        description: 'Ejemplar de alta genética, ideal para reproductores.',
        verifiedBy: 'Dr. Ricardo Gómez',
        age: '30 meses',
        genetics: 'Pura por cruce'
    },
    {
        id: '2',
        number: 10,
        title: 'Novilla Preñada',
        breed: 'Brahman Rojo',
        weight: 450,
        location: 'Sincelejo, Sucre',
        status: 'upcoming',
        basePrice: 12000000,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBuAxz-F-5LgOtIBH57-JVR6i1CApKwKQO6dpVwzmCgVS-Yj6Y2Zw0zGzyyWA2qcc2RttsTFVGq-P6c5aaAh6Vwd26JBRgW6NldnGXDmK3Lx-_JoI1pgry42_J3NVHEyjO47Ebw8XSEzn--328HsVFuXoo3n3ZJlv93P1ekOkOc_DWwRGehSvIxvLa4PWGTVxV6XO2_MWRjLiHXVvNFgrb7A9T6eoTRd30HEcffcDIfJZMU00H_yYS0VuYudBMGz9haB5lFdXgv7M',
        seller: 'Ganadería San Felipe',
        description: 'Novilla con 5 meses de preñez confirmada.',
        verifiedBy: 'Vet. Maria López',
        age: '24 meses',
        genetics: 'Comercial'
    },
    {
        id: '3',
        number: 11,
        title: 'Toro Nelore',
        breed: 'Nelore',
        weight: 520,
        location: 'Arjona, Bolívar',
        status: 'upcoming',
        basePrice: 18000000,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPkf6ghY6zOxw1UMKcNaGx_CbaHnxXZ5ckK_y1rQZKcSplgP0CF5ymF_fKfMvfzGFojvfYQvBz-H0fdKMkAfaOV6XaQMbPsXkJiHONvIUVYdyRv2NaW2qllGpuTr5WYW2uurGUaKgJ_2wWVR0jEZhjFoKzHAnDj9TqEcuRJGAAmikI2rwnomC2W3s9B7DNYde-dxj3UCHuPQ5fCKQuuYSBts97Y3lCUFZ2EepOVfa7-dZHwa6oOkRgOfRVBVcUTdHlWkw0uunaJQY',
        seller: 'Hacienda La Esperanza',
        description: 'Toro rústico, excelente para pastoreo.',
        age: '28 meses',
        genetics: 'Shorthorn'
    }
];
