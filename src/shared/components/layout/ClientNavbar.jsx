'use strict';

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '../../../features/auth/store/authStore.js';
import { useCartStore } from '../../../features/auth/store/clientStore.js';
import logo from '../../../assets/img/KinalFriedChickenLogo.png';

const NAV_LINKS = [
    { label: 'INICIO',     path: '/portal' },
    { label: 'SUCURSALES', path: '/portal/sucursales' },
    { label: 'MENÚ',       path: '/portal/menu' },
    { label: 'RESERVAS',   path: '/portal/reservas' },
    { label: 'EVENTOS',    path: '/portal/eventos' },
    { label: 'RESEÑAS',    path: '/portal/resenas' },
    { label: 'CUPONES',    path: '/portal/cupones' },
];

export const ClientNavbar = () => {
    const navigate   = useNavigate();
    const location   = useLocation();
    const user       = useAuthStore((s) => s.user);
    const cartCount  = useCartStore((s) => s.getCartCount());
    const [mobileOpen, setMobileOpen] = useState(false);

    const getLinkStyle = (path) => {
        const isActive = location.pathname === path;
        return `cursor-pointer font-black text-sm tracking-widest transition-all pb-1 border-b-2 ${
            isActive
                ? 'text-[#e11d48] border-[#e11d48]'
                : 'text-gray-600 border-transparent hover:text-[#e11d48]'
        }`;
    };

    const fullName = user
        ? `${user.UserName || ''} ${user.UserSurname || ''}`.trim()
        : '';

    return (
        <nav className="bg-[#fdfaf5] border-b-2 border-[#e11d48] sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo + nombre */}
                    <div
                        className="shrink-0 cursor-pointer select-none flex items-center gap-2"
                        onClick={() => navigate('/portal')}
                    >
                        <img src={logo} alt="KFC Logo" className="h-10 w-auto object-contain" />
                        <span className="text-lg font-black text-[#e11d48] tracking-tight leading-tight hidden sm:block">
                            KINAL<br />
                            <span className="text-[#fb923c] text-xs font-black tracking-widest">FRIED CHICKEN</span>
                        </span>
                    </div>

                    {/* Links Desktop */}
                    <div className="hidden xl:flex items-center gap-4">
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

                        {/* Avatar con nombre */}
                        <button
                            onClick={() => navigate('/portal/perfil')}
                            className="flex items-center gap-2 bg-[#facc15] hover:bg-yellow-300 text-red-900 font-black text-sm px-3 py-1.5 rounded-full shadow-md border-2 border-white hover:scale-105 transition-all"
                        >
                            <span className="text-xs font-black leading-none">
                                {fullName || 'Mi perfil'}
                            </span>
                        </button>

                        {/* Hamburger Mobile */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="xl:hidden p-2 text-[#e11d48] hover:bg-red-50 rounded-lg transition-colors"
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
                    <div className="xl:hidden border-t border-gray-100 py-4 space-y-1 animate-fadeIn">
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