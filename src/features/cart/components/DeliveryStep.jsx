'use strict';

import { Button } from '../../../shared/ui/Button.jsx';
import { MapPicker } from '../../../shared/ui/MapPicker.jsx';

export const DeliveryStep = ({ address, lat, lng, error, onAddressChange, onLocationChange, onConfirm, onBack }) => {
    return (
        <div className="max-w-3xl mx-auto px-4 py-10 animate-fadeIn space-y-8">
            <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-[#e11d48] flex items-center justify-center shadow-md">
                    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" style={{ filter: 'brightness(0) invert(1)' }}>
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <h1 className="text-3xl font-black text-[#7f1d1d] mb-1">Direccion de Entrega</h1>
                <p className="text-gray-500 text-sm">Ingresa la direccion donde quieres recibir tu pedido.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-xl mx-auto space-y-5">
                <div>
                    <label className="block text-xs font-bold text-[#a16207] uppercase mb-1">
                        Direccion Completa
                    </label>
                    <textarea
                        value={address}
                        onChange={(e) => onAddressChange(e.target.value)}
                        rows={3}
                        placeholder="Ej: Calle 10-25, Zona 7, Ciudad de Guatemala"
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none transition-all focus:border-[#e11d48] focus:ring-2 focus:ring-red-100 resize-none"
                    />
                </div>

                <MapPicker
                    lat={lat}
                    lng={lng}
                    onLocationChange={onLocationChange}
                />

                {error && (
                    <p className="text-red-500 text-xs font-bold">{error}</p>
                )}

                <div className="flex gap-3 pt-2">
                    <Button variant="ghost" className="flex-1" onClick={onBack}>
                        Atras
                    </Button>
                    <Button className="flex-1" onClick={onConfirm}>
                        Continuar al Pago
                    </Button>
                </div>
            </div>
        </div>
    );
};
