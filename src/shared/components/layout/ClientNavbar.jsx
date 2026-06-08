'use strict';

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    MagnifyingGlassIcon,
    Bars3Icon,
    XMarkIcon,
    ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import { useClientStore } from '../../../features/auth/store/clientStore.js';
import { getInitials } from '../../utils/formatters.js';

const NAV_LINKS = [
    { label: 'INICIO',   path: '/portal' },
    { label: 'MENÚ',     path: '/portal/menu' },
    { label: 'RESERVAS', path: '/portal/reservas' },
    { label: 'EVENTOS',  path: '/portal/eventos' },
    { label: 'RESEÑAS',  path: '/portal/resenas' },
];

export const ClientNavbar = () => {
    const navigate  = useNavigate();
    const location  = useLocation();
    const user      = useClientStore((s) => s.user);
    const cartCount = useClientStore((s) => s.getCartCount());

    const [mobileOpen,  setMobileOpen]  = useState(false);
    const [searchOpen,  setSearchOpen]  = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const getLinkStyle = (path) => {
        const isActive = location.pathname === path;
        return `cursor-pointer font-black text-sm tracking-widest transition-all pb-1 border-b-2 ${
            isActive
                ? 'text-[#e11d48] border-[#e11d48]'
                : 'text-gray-600 border-transparent hover:text-[#e11d48]'
        }`;
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/portal/menu?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
            setSearchOpen(false);
        }
    };

    const initials = user ? getInitials(user.UserName, user.UserSurname) : 'KL';

    return (
        <nav className="bg-[#fdfaf5] border-b-2 border-[#e11d48] sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <div
                        className="flex-shrink-0 cursor-pointer select-none"
                        onClick={() => navigate('/portal')}
                    >
                        <span className="text-2xl font-black text-[#e11d48] tracking-tight">
                            KINAL <span className="text-[#fb923c]">🍗</span>
                        </span>
                    </div>

                    {/* Links Desktop */}
                    <div className="hidden lg:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <span
                                key={link.path}
                                onClick={() => navigate(link.path)}
                                className={getLinkStyle(link.path)}
                            >
                                {link.label}
                            </span>
                        ))}
                    </div>

                    {/* Acciones */}
                    <div className="flex items-center gap-3">

                        {/* Buscador */}
                        {searchOpen ? (
                            <form
                                onSubmit={handleSearch}
                                className="hidden sm:flex items-center gap-2 bg-white border-2 border-[#e11d48] rounded-xl px-3 py-1"
                            >
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Buscar..."
                                    className="outline-none text-sm w-36 bg-transparent"
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <XMarkIcon className="w-4 h-4" />
                                </button>
                            </form>
                        ) : (
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="hidden sm:flex p-2 text-[#e11d48] hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <MagnifyingGlassIcon className="w-5 h-5" />
                            </button>
                        )}

                        {/* Carrito */}
                        <button
                            onClick={() => navigate('/portal/carrito')}
                            className="relative p-2 text-[#e11d48] hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <ShoppingCartIcon className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#e11d48] text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                    {cartCount > 99 ? '99+' : cartCount}
                                </span>
                            )}
                        </button>

                        {/* Avatar */}
                        <button
                            onClick={() => navigate('/portal/perfil')}
                            className="w-9 h-9 rounded-full bg-[#facc15] flex items-center justify-center text-red-900 font-black text-sm shadow-md border-2 border-white hover:scale-110 transition-transform"
                        >
                            {initials}
                        </button>

                        {/* Hamburger Mobile */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden p-2 text-[#e11d48] hover:bg-red-50 rounded-lg transition-colors"
                        >
                            {mobileOpen
                                ? <XMarkIcon className="w-6 h-6" />
                                : <Bars3Icon className="w-6 h-6" />
                            }
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="lg:hidden border-t border-gray-100 py-4 space-y-1 animate-fadeIn">
                        <form onSubmit={handleSearch} className="flex items-center gap-2 bg-gray-50 border border-[#e11d48] rounded-xl px-3 py-2 mb-3">
                            <MagnifyingGlassIcon className="w-5 h-5 text-[#e11d48]" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Buscar productos..."
                                className="outline-none text-sm w-full bg-transparent"
                            />
                        </form>
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.path}
                                onClick={() => { navigate(link.path); setMobileOpen(false); }}
                                className={`block w-full text-left px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                                    location.pathname === link.path
                                        ? 'bg-red-50 text-[#e11d48]'
                                        : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};