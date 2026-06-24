'use strict';

import { useNavigate } from 'react-router-dom';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

const QUICK_LINKS = [
    { label: 'Inicio',      path: '/portal' },
    { label: 'Sucursales',  path: '/portal/sucursales' },
    { label: 'Menú',        path: '/portal/menu' },
    { label: 'Reservas',    path: '/portal/reservas' },
    { label: 'Eventos',     path: '/portal/eventos' },
];
const ACCOUNT_LINKS = [
    { label: 'Mi Perfil',   path: '/portal/perfil' },
    { label: 'Mis Pedidos', path: '/portal/pedidos' },
    { label: 'Reseñas',     path: '/portal/resenas' },
];
const LEGAL_LINKS   = [
    { label: 'Términos y Condiciones', path: '/portal/terminos' },
    { label: 'Política de Privacidad', path: '/portal/privacidad' },
];

export const ClientFooter = () => {
    const navigate     = useNavigate();
    const currentYear  = new Date().getFullYear();

    return (
        <footer className="bg-[#2d1810] text-white mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid md:grid-cols-4 gap-8 mb-8">

                    {/* Marca */}
                    <div>
                        <h3 className="text-xl font-black mb-3 text-[#fb923c]">KINAL 🍗</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            El mejor sabor de pollo frito con la mejor experiencia de servicio en Guatemala.
                        </p>
                    </div>

                    {/* Menú Rápido */}
                    <div>
                        <h4 className="font-bold text-[#fb923c] uppercase tracking-widest text-sm mb-3">Menú Rápido</h4>
                        <ul className="space-y-2">
                            {QUICK_LINKS.map((l) => (
                                <li key={l.path}>
                                    <button
                                        onClick={() => navigate(l.path)}
                                        className="text-gray-300 hover:text-[#fb923c] transition-colors text-sm"
                                    >
                                        {l.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Mi Cuenta */}
                    <div>
                        <h4 className="font-bold text-[#fb923c] uppercase tracking-widest text-sm mb-3">Mi Cuenta</h4>
                        <ul className="space-y-2">
                            {ACCOUNT_LINKS.map((l) => (
                                <li key={l.path}>
                                    <button
                                        onClick={() => navigate(l.path)}
                                        className="text-gray-300 hover:text-[#fb923c] transition-colors text-sm"
                                    >
                                        {l.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div>
                        <h4 className="font-bold text-[#fb923c] uppercase tracking-widest text-sm mb-3">Contacto</h4>
                        <div className="space-y-2">
                            <div className="flex gap-2 items-start">
                                <PhoneIcon className="w-4 h-4 text-[#e11d48] mt-0.5 flex-shrink-0" />
                                <span className="text-gray-300 text-sm">+502 7890 1234</span>
                            </div>
                            <div className="flex gap-2 items-start">
                                <EnvelopeIcon className="w-4 h-4 text-[#e11d48] mt-0.5 flex-shrink-0" />
                                <span className="text-gray-300 text-sm">info@kinal.com</span>
                            </div>
                            <div className="flex gap-2 items-start">
                                <ClockIcon className="w-4 h-4 text-[#e11d48] mt-0.5 flex-shrink-0" />
                                <span className="text-gray-300 text-sm">Lun–Dom: 10am – 11pm</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#4a3728] pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                    <p>&copy; {currentYear} Kinal Fried Chicken. Todos los derechos reservados.</p>
                    <div className="flex gap-4">
                        {LEGAL_LINKS.map((l) => (
                            <button
                                key={l.path}
                                onClick={() => navigate(l.path)}
                                className="hover:text-[#fb923c] transition-colors"
                            >
                                {l.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};