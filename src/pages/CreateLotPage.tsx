import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Upload,
    X,
    Save,
    Image as ImageIcon,
    Video,
    Plus,
    Trash2
} from 'lucide-react';

export const CreateLotPage: React.FC = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        number: '',
        title: '',
        breed: '',
        weight: '',
        age: '',
        genetics: '',
        location: '',
        seller: '',
        basePrice: '',
        description: '',
        status: 'upcoming',
        youtubeUrl: ''
    });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages = Array.from(files).map(file => URL.createObjectURL(file));
            setImages(prev => [...prev, ...newImages]);
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Lote creado:', { ...formData, images });
        // Aquí iría la lógica para guardar en backend
        navigate('/admin');
    };

    return (
        <div className="fixed inset-0 z-[60] bg-background-light dark:bg-background-dark flex flex-col max-w-md mx-auto overflow-hidden">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 pt-10">
                <div className="flex items-center justify-between px-4 py-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
                    >
                        <ArrowLeft size={20} />
                        <span className="font-bold text-sm">Cancelar</span>
                    </button>
                    <h2 className="text-base font-bold text-gray-900 dark:text-white">Crear Lote</h2>
                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 text-primary font-bold text-sm"
                    >
                        <Save size={20} />
                        Guardar
                    </button>
                </div>
            </header>

            {/* Form Content */}
            <main className="flex-1 overflow-y-auto pb-10 px-4 pt-6 no-scrollbar">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Imágenes */}
                    <div className="flex flex-col gap-3">
                        <label className="text-sm font-bold text-gray-900 dark:text-white">
                            Imágenes del Lote <span className="text-red-500">*</span>
                        </label>

                        <div className="grid grid-cols-3 gap-3">
                            {images.map((img, index) => (
                                <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
                                    >
                                        <X size={14} />
                                    </button>
                                    {index === 0 && (
                                        <div className="absolute bottom-1 left-1 bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                                            Principal
                                        </div>
                                    )}
                                </div>
                            ))}

                            <label className="aspect-square rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition-colors">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                <Upload size={24} className="text-gray-400" />
                                <span className="text-[10px] font-bold text-gray-400">Subir</span>
                            </label>
                        </div>
                        <p className="text-xs text-gray-500">La primera imagen será la principal. Máximo 10 imágenes.</p>
                    </div>

                    {/* Video en Vivo (YouTube) */}
                    <div className="flex flex-col gap-3">
                        <label className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Video size={18} className="text-red-500" />
                            URL de YouTube (Transmisión en Vivo)
                        </label>
                        <input
                            type="url"
                            placeholder="https://www.youtube.com/watch?v=..."
                            value={formData.youtubeUrl}
                            onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                            className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <p className="text-xs text-gray-500">
                            Pega la URL del video en vivo de YouTube. Se mostrará automáticamente cuando la subasta esté activa.
                        </p>
                    </div>

                    {/* Información Básica */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-900 dark:text-white">
                                Número de Lote <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="042"
                                value={formData.number}
                                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-900 dark:text-white">
                                Estado
                            </label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="upcoming">Próximamente</option>
                                <option value="live">En Vivo</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-900 dark:text-white">
                            Título del Lote <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Toro Brahman Rojo"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>

                    {/* Características */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-900 dark:text-white">Raza</label>
                            <select
                                value={formData.breed}
                                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                                className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="">Seleccionar</option>
                                <option value="Brahman">Brahman</option>
                                <option value="Nelore">Nelore</option>
                                <option value="Angus">Angus</option>
                                <option value="Simmental">Simmental</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-900 dark:text-white">Peso (kg)</label>
                            <input
                                type="number"
                                placeholder="450"
                                value={formData.weight}
                                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-900 dark:text-white">Edad</label>
                            <input
                                type="text"
                                placeholder="24 Meses"
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-900 dark:text-white">Genética</label>
                            <input
                                type="text"
                                placeholder="Pura"
                                value={formData.genetics}
                                onChange={(e) => setFormData({ ...formData, genetics: e.target.value })}
                                className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                    </div>

                    {/* Ubicación y Vendedor */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-900 dark:text-white">Ubicación</label>
                        <input
                            type="text"
                            placeholder="Montería, Córdoba"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-900 dark:text-white">Vendedor</label>
                        <input
                            type="text"
                            placeholder="Ganadería Los Robles"
                            value={formData.seller}
                            onChange={(e) => setFormData({ ...formData, seller: e.target.value })}
                            className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>

                    {/* Precio Base */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-900 dark:text-white">
                            Precio Base (COP) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                            <input
                                type="number"
                                required
                                placeholder="45000000"
                                value={formData.basePrice}
                                onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                                className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-xl pl-8 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                    </div>

                    {/* Descripción */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-900 dark:text-white">Observaciones</label>
                        <textarea
                            rows={4}
                            placeholder="Ejemplar de excelente estructura ósea y musculatura bien definida..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                    >
                        <Save size={20} />
                        Crear Lote
                    </button>
                </form>
            </main>
        </div>
    );
};
