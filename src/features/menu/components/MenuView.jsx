'use strict';

import { useNavigate } from 'react-router-dom';
import { useMenu } from '../hooks/useMenu.js';
import { useCartStore, useBranchStore } from '../../auth/store/clientStore.js';
import { Spinner } from '../../../shared/ui/Spinner.jsx';
import { EmptyState } from '../../../shared/ui/EmptyState.jsx';
import { Badge } from '../../../shared/ui/Badge.jsx';
import { Button } from '../../../shared/ui/Button.jsx';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { showSuccess, showError } from '../../../shared/utils/toast.js';
import MenuIcon from '../../../assets/icons/Menu.svg';


const FALLBACK_PRODUCT = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=200&auto=format&fit=crop';
const FALLBACK_COMBO = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=200&auto=format&fit=crop';

export const MenuView = () => {
    const { filtered, loading, search, setSearch, filterType, setFilterType, categories, total } = useMenu();
    const { addToCart, cart } = useCartStore();
    const { selectedBranch } = useBranchStore();
    const navigate = useNavigate();

    const cartCount = cart.reduce((acc, i) => acc + i.cantidad, 0);

    const handleAddToCart = (item) => {
        if (!selectedBranch) {
            showError('Selecciona una sucursal antes de agregar productos.');
            navigate('/portal/sucursales');
            return;
        }
        const result = addToCart({
            _id: item._id,
            name: item.name,
            precio: item.price,
            tipo: item.type,
            category: item.category,
            branchId: selectedBranch._id,
            cantidad: 1,
        });
        if (result?.conflict) {
            showError('Ya tienes productos de otra sucursal en el carrito. Vacía el carrito primero.');
        } else {
            showSuccess(`${item.name} agregado al carrito 🛒`);
        }
    };

    if (loading) return (
        <div className="flex justify-center py-20">
            <Spinner size="lg" />
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 animate-fadeIn space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[#7f1d1d]">
                        <img src={MenuIcon} alt="Menú" className="w-7 h-7 inline-block mr-2 align-middle" style={{ filter: 'invert(15%) sepia(80%) saturate(900%) hue-rotate(330deg)' }} />
                        Nuestro <span className="text-[#e11d48]">Menú</span>                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        {total} productos disponibles
                        {selectedBranch && <span className="ml-2 text-[#e11d48] font-bold">— {selectedBranch.name}</span>}
                    </p>
                </div>
                <button
                    onClick={() => navigate('/portal/carrito')}
                    className="relative flex items-center gap-2 bg-[#e11d48] hover:bg-red-700 text-white font-black px-5 py-2.5 rounded-xl shadow-lg transition-all active:scale-95 w-fit"
                >
                    <ShoppingCartIcon className="w-5 h-5" />
                    Ver Carrito
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#facc15] text-red-900 text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>

            {/* Sin sucursal */}
            {!selectedBranch && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <p className="text-sm text-yellow-700 font-bold">⚠️ Selecciona una sucursal para agregar al carrito.</p>
                    <Button size="sm" variant="secondary" onClick={() => navigate('/portal/sucursales')}>
                        Elegir sucursal
                    </Button>
                </div>
            )}

            {/* Buscador y filtros */}
            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar producto o categoría..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-orange-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#e11d48]/30 bg-white"
                />
                <div className="flex gap-2 flex-wrap">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilterType(cat)}
                            className={`px-4 py-2.5 rounded-xl text-xs font-black border transition-all ${filterType === cat
                                ? 'bg-[#e11d48] text-white border-[#e11d48]'
                                : 'bg-white text-gray-600 border-orange-200 hover:border-[#e11d48]'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <p className="text-xs text-gray-400">Mostrando {filtered.length} de {total} items</p>

            {/* Grid */}
            {filtered.length === 0 ? (
                <EmptyState icon={<img src={MenuIcon} alt="" className="w-12 h-12 mx-auto opacity-30" />} title="Sin resultados" description="No encontramos productos con esos filtros." />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filtered.map((item) => {
                        const isCombo = item.type === 'Combo';
                        const imgSrc = item.type === 'Individual' && item.imagen_url && !item.imagen_url.includes('default-product')
                            ? item.imagen_url
                            : item.type === 'Combo' && item.image?.url
                                ? item.image.url
                                : (isCombo ? FALLBACK_COMBO : FALLBACK_PRODUCT);

                        return (
                            <div
                                key={item._id}
                                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group"
                            >
                                {/* Imagen */}
                                <div className="relative w-full h-36 overflow-hidden bg-gray-100">
                                    <img
                                        src={imgSrc}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        onError={(e) => { e.target.src = isCombo ? FALLBACK_COMBO : FALLBACK_PRODUCT; }}
                                    />
                                    {/* Badge de tipo — moverlo aquí en vez del precio */}
                                    {isCombo && (
                                        <div className="absolute top-2 right-2 bg-[#facc15] text-red-900 font-black px-2.5 py-1 rounded-xl shadow text-[10px]">
                                            COMBO
                                        </div>
                                    )}
                                </div>

                                {/* Contenido */}
                                <div className="p-4 flex flex-col flex-1">
                                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full w-fit mb-2 ${isCombo
                                        ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                                        : 'bg-orange-50 text-[#fb923c] border border-orange-100'
                                        }`}>
                                        {item.type} {item.category && `· ${item.category}`}
                                    </span>

                                    <h3 className="text-base font-black italic uppercase leading-tight mb-1 line-clamp-2 text-gray-800">
                                        {item.name}
                                    </h3>

                                    {item.description && item.description !== 'Sin descripción' && (
                                        <p className="text-xs text-gray-500 mb-2 line-clamp-2">{item.description}</p>
                                    )}

                                    {/* Footer — precio igual para ambos tipos */}
                                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                                        <span className="text-lg font-black text-[#e11d48]">
                                            Q{item.price?.toFixed(2)}
                                        </span>
                                        <button
                                            onClick={() => handleAddToCart(item)}
                                            className="flex items-center gap-1.5 bg-[#e11d48] hover:bg-red-700 text-white text-xs font-black px-3 py-2 rounded-xl transition-all active:scale-95"
                                        >
                                            <ShoppingCartIcon className="w-3.5 h-3.5" /> Agregar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};