'use strict';

import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../../shared/utils/formatters.js';
import { Button } from '../../../shared/ui/Button.jsx';

export const CartSummary = ({ total, onClear }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 max-w-md mx-auto">
            <div className="flex justify-between items-center mb-5">
                <span className="font-bold text-gray-700">Total</span>
                <span className="text-2xl font-black text-[#e11d48]">{formatCurrency(total)}</span>
            </div>
            <Button size="lg" className="w-full" onClick={() => navigate('/portal/checkout')}>
                Proceder al Checkout
            </Button>
            <button
                onClick={onClear}
                className="w-full mt-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
                Vaciar carrito
            </button>
        </div>
    );
};
