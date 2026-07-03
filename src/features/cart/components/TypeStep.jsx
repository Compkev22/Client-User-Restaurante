'use strict';

import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/ui/Button.jsx';

export const TypeStep = ({ onSelect }) => {
    const navigate = useNavigate();

    return (
        <div className="max-w-3xl mx-auto px-4 py-10 animate-fadeIn space-y-8">
            <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-[#e11d48] flex items-center justify-center shadow-md">
                    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" style={{ filter: 'brightness(0) invert(1)' }}>
                        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2-1h2m10 1l2-1V8a1 1 0 00-1-1h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <h1 className="text-3xl font-black text-[#7f1d1d] mb-1">Tipo de Pedido</h1>
                <p className="text-gray-500 text-sm">Elige como quieres recibir tu pedido.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl mx-auto">
                <button
                    onClick={() => onSelect('TAKEAWAY')}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-left hover:shadow-xl hover:border-[#e11d48]/40 transition-all duration-300 group"
                >
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-3 group-hover:bg-[#e11d48] transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#fb923c] group-hover:text-white transition-colors">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <h3 className="font-black text-gray-800 text-lg mb-1">Recoger en Sucursal</h3>
                    <p className="text-sm text-gray-500">Retira tu pedido en la sucursal que elijas.</p>
                </button>

                <button
                    onClick={() => onSelect('DELIVERY')}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-left hover:shadow-xl hover:border-[#e11d48]/40 transition-all duration-300 group"
                >
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-3 group-hover:bg-[#e11d48] transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#fb923c] group-hover:text-white transition-colors">
                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <h3 className="font-black text-gray-800 text-lg mb-1">Enviar a Domicilio</h3>
                    <p className="text-sm text-gray-500">Recibelo donde quieras con un costo adicional.</p>
                </button>
            </div>

            <div className="flex justify-center">
                <Button variant="ghost" onClick={() => navigate('/portal/carrito')}>
                    Volver al Carrito
                </Button>
            </div>
        </div>
    );
};
