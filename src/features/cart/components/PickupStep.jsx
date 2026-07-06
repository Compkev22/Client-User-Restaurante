'use strict';

import { Button } from '../../../shared/ui/Button.jsx';

export const PickupStep = ({ selectedBranch, onConfirm, onBack, onBranches }) => {
    if (!selectedBranch) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-10 animate-fadeIn space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-black text-[#7f1d1d] mb-1">Sin sucursal seleccionada</h1>
                    <p className="text-gray-500 text-sm">No hay una sucursal activa. Selecciona una primero.</p>
                </div>
                <div className="flex justify-center gap-3">
                    <Button variant="ghost" onClick={onBack}>Atrás</Button>
                    <Button onClick={onBranches}>Ir a Sucursales</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 animate-fadeIn space-y-8">
            <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-[#e11d48] flex items-center justify-center shadow-md">
                    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" style={{ filter: 'brightness(0) invert(1)' }}>
                        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <h1 className="text-3xl font-black text-[#7f1d1d] mb-1">Sucursal de Recogida</h1>
                <p className="text-gray-500 text-sm">Confirma la sucursal donde recogerás tu pedido.</p>
            </div>

            <div className="max-w-xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-[#e11d48] shadow-lg shadow-red-100 p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#fb923c]">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
                                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-black text-gray-800 uppercase italic">{selectedBranch.name}</h3>
                            <p className="text-sm text-gray-500">{selectedBranch.address}, Zona {selectedBranch.zone}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 border-t border-gray-100 pt-4">
                        <span className="font-bold">{selectedBranch.OpenedAt} - {selectedBranch.ClosedAt}</span>
                        <span className="text-gray-300">|</span>
                        <span>{selectedBranch.phone}</span>
                    </div>
                </div>
            </div>

            <div className="flex justify-center gap-3">
                <Button variant="ghost" onClick={onBranches}>
                    Cambiar de sucursal
                </Button>
                <Button onClick={onConfirm}>
                    Confirmar recogida aquí
                </Button>
            </div>
        </div>
    );
};
