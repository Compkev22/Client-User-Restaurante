'use strict';

import { Button } from '../../../shared/ui/Button.jsx';
import { Spinner } from '../../../shared/ui/Spinner.jsx';

export const PickupStep = ({ branches, loading, selectedBranch, error, onSelect, onBack }) => {
    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Spinner size="lg" />
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
                <p className="text-gray-500 text-sm">Selecciona la sucursal donde recogeras tu pedido.</p>
            </div>

            <div className="space-y-3 max-w-xl mx-auto">
                {branches.filter((b) => b.branchStatus === 'ACTIVE').map((branch) => (
                    <button
                        key={branch._id}
                        onClick={() => onSelect(branch)}
                        className={`w-full bg-white rounded-2xl shadow-sm border p-4 text-left hover:shadow-md transition-all duration-300 flex items-center gap-4 ${
                            selectedBranch?._id === branch._id
                                ? 'border-[#e11d48] shadow-lg shadow-red-100'
                                : 'border-gray-100 hover:border-[#e11d48]/40'
                        }`}
                    >
                        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#fb923c]">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
                                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-black text-gray-800 uppercase italic text-sm">{branch.name}</h3>
                            <p className="text-xs text-gray-500 truncate">{branch.address}, Zona {branch.zone}</p>
                        </div>
                        <span className="text-xs text-gray-400 font-bold shrink-0">
                            {branch.OpenedAt} - {branch.ClosedAt}
                        </span>
                    </button>
                ))}
            </div>

            {error && (
                <p className="text-red-500 text-xs font-bold text-center">{error}</p>
            )}

            <div className="flex justify-center">
                <Button variant="ghost" onClick={onBack}>
                    Atras
                </Button>
            </div>
        </div>
    );
};
