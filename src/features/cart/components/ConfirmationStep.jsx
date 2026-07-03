'use strict';

import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/ui/Button.jsx';

export const ConfirmationStep = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-2xl mx-auto px-4 py-10 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center space-y-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-green-600">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div>
                    <h2 className="text-2xl font-black text-[#7f1d1d] mb-2">Pedido Realizado</h2>
                    <p className="text-gray-500">
                        Tu pedido ha sido creado exitosamente. Puedes ver su estado en Mis Pedidos.
                    </p>
                </div>
                <div className="flex gap-3 justify-center pt-2">
                    <Button variant="outline" onClick={() => navigate('/portal/pedidos')}>
                        Ver Mis Pedidos
                    </Button>
                    <Button onClick={() => navigate('/portal/menu')}>
                        Seguir Pidiendo
                    </Button>
                </div>
            </div>
        </div>
    );
};
