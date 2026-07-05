'use strict';

import { toast } from 'react-hot-toast';

export const showConfirmToast = ({ title, message, onConfirm }) => {
    toast.custom((t) => (
        <div className="bg-white p-6 rounded-2xl w-96 text-center shadow-xl border border-orange-100">
            <h2 className="text-lg font-black text-gray-800 mb-2">{title}</h2>
            {message && <p className="text-sm text-gray-500 mb-4">{message}</p>}
            <div className="flex justify-center gap-3 mt-2">
                <button
                    className="px-5 py-2 rounded-xl font-bold text-sm bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    onClick={() => toast.dismiss(t.id)}
                >
                    Cancelar
                </button>
                <button
                    className="px-5 py-2 rounded-xl font-bold text-sm bg-[#e11d48] text-white hover:bg-[#b91c1c] transition-colors"
                    onClick={() => {
                        onConfirm?.();
                        toast.dismiss(t.id);
                    }}
                >
                    Confirmar
                </button>
            </div>
        </div>
    ));
};
