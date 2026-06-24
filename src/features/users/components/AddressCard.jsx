'use strict';

import { MapPinIcon, PencilSquareIcon, TrashIcon, StarIcon } from '@heroicons/react/24/outline';

export const AddressCard = ({ address, onEdit, onDelete, deleting }) => {
    return (
        <div className="flex items-start gap-3 bg-[#fdfaf5] border border-orange-100 rounded-2xl px-4 py-3">
            <div className="w-9 h-9 rounded-xl bg-[#facc15]/20 flex items-center justify-center shrink-0">
                <MapPinIcon className="w-5 h-5 text-[#a16207]" />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <p className="font-black text-gray-800 text-sm truncate">{address.label}</p>
                    {address.isDefault && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full uppercase shrink-0">
                            <StarIcon className="w-3 h-3" />
                            Principal
                        </span>
                    )}
                </div>
                <p className="text-gray-500 text-sm truncate">{address.address}</p>
            </div>

            <div className="flex items-center gap-1 shrink-0">
                <button
                    type="button"
                    title="Editar dirección"
                    onClick={() => onEdit(address)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-[#e11d48] hover:bg-red-50 transition-colors"
                >
                    <PencilSquareIcon className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    title="Eliminar dirección"
                    disabled={deleting}
                    onClick={() => onDelete(address)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40"
                >
                    <TrashIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};