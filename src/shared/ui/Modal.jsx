'use strict';

import { XMarkIcon } from '@heroicons/react/24/outline';

export const Modal = ({ open, onClose, title, children, footer = null, size = 'md' }) => {
    if (!open) return null;

    const sizes = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-2xl',
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fadeIn">
            <div className={`w-full ${sizes[size]} bg-white rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto`}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-black text-gray-900">{title}</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-700 transition-colors"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                <div>{children}</div>

                {footer && <div className="mt-6 flex justify-end gap-3">{footer}</div>}
            </div>
        </div>
    );
};