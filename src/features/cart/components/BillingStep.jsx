'use strict';

import { Button } from '../../../shared/ui/Button.jsx';

export const BillingStep = ({ nit, setNit, billEmail, setBillEmail, error, loading, onConfirm, onBack }) => {
    return (
        <div className="max-w-3xl mx-auto px-4 py-10 animate-fadeIn space-y-8">
            <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-[#e11d48] flex items-center justify-center shadow-md">
                    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" style={{ filter: 'brightness(0) invert(1)' }}>
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                </div>
                <h1 className="text-3xl font-black text-[#7f1d1d] mb-1">Datos de Facturacion</h1>
                <p className="text-gray-500 text-sm">Ingresa los datos para tu factura. Puedes omitir este paso.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-xl mx-auto space-y-5">
                <div>
                    <label className="block text-xs font-bold text-[#a16207] uppercase mb-1">NIT</label>
                    <input
                        type="text"
                        value={nit}
                        onChange={(e) => setNit(e.target.value)}
                        placeholder="CF (Consumidor Final)"
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none transition-all focus:border-[#e11d48] focus:ring-2 focus:ring-red-100"
                    />
                    <p className="text-[11px] text-gray-400 mt-1">Si no tienes NIT, deja vacio para Consumidor Final.</p>
                </div>

                <div>
                    <label className="block text-xs font-bold text-[#a16207] uppercase mb-1">Correo Electronico</label>
                    <input
                        type="email"
                        value={billEmail}
                        onChange={(e) => setBillEmail(e.target.value)}
                        placeholder="correo@ejemplo.com"
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none transition-all focus:border-[#e11d48] focus:ring-2 focus:ring-red-100"
                    />
                    <p className="text-[11px] text-gray-400 mt-1">Recibiras tu factura en este correo.</p>
                </div>

                {error && (
                    <p className="text-red-500 text-xs font-bold">{error}</p>
                )}

                <div className="flex gap-3 pt-2">
                    <Button variant="ghost" className="flex-1" onClick={onBack}>
                        Atras
                    </Button>
                    <Button className="flex-1" loading={loading} onClick={onConfirm}>
                        {loading ? 'Procesando...' : 'Confirmar Pedido'}
                    </Button>
                </div>
            </div>
        </div>
    );
};
