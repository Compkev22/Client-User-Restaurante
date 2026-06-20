'use strict';

import { Card } from '../../../shared/ui/Card.jsx';
import { formatCurrency } from '../../../shared/utils/formatters.js';

export const AdditionalServicesChecklist = ({
    additionalServices,
    selectedIds,
    onToggle,
}) => (
    <div>
        <label className="block text-xs font-bold text-[#a16207] uppercase mb-2">
            Servicios adicionales (opcional)
        </label>

        {additionalServices.length === 0 ? (
            <p className="text-sm text-gray-400">No hay servicios adicionales disponibles.</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {additionalServices.map((service) => {
                    const checked = selectedIds.includes(service._id);
                    return (
                        <Card
                            key={service._id}
                            onClick={() => onToggle(service._id)}
                            className={`cursor-pointer flex items-start gap-3 p-4 transition-colors ${
                                checked ? 'border-[#e11d48] bg-red-50' : ''
                            }`}
                        >
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => onToggle(service._id)}
                                className="mt-1 w-4 h-4 accent-[#e11d48] cursor-pointer"
                            />
                            <div>
                                <p className="font-bold text-gray-800 text-sm">{service.Name}</p>
                                <p className="text-xs text-gray-500">{service.Description}</p>
                                <p className="text-xs font-bold text-[#e11d48] mt-1">
                                    {formatCurrency(service.AdditionalPrice)}
                                </p>
                            </div>
                        </Card>
                    );
                })}
            </div>
        )}
    </div>
);