
'use strict';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBranches } from '../hooks/useBranches.js';
import { BranchCard } from './BranchCard.jsx';
import { Spinner } from '../../../shared/ui/Spinner.jsx';
import { EmptyState } from '../../../shared/ui/EmptyState.jsx';
import { Button } from '../../../shared/ui/Button.jsx';
import { useBranchStore } from '../../auth/store/clientStore.js';
import BranchesIcon from '../../../assets/icons/Branches.svg';

export const BranchesView = () => {
    const { branches, loading } = useBranches();
    const navigate = useNavigate();

    // Store persistido para la sucursal seleccionada
    const { selectedBranch, setSelectedBranch } = useBranchStore();
    const [localSelected, setLocalSelected] = useState(selectedBranch?._id || null);

    const handleSelect = (branch) => {
        setLocalSelected(branch._id);
        setSelectedBranch(branch);
    };

    const handleConfirm = () => {
        navigate('/portal/menu');
    };

    if (loading) return (
        <div className="flex justify-center py-20">
            <Spinner size="lg" />
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 animate-fadeIn space-y-8">
            {/* Header */}
            <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-[#e11d48] flex items-center justify-center shadow-md">
                    <img src={BranchesIcon} alt="Sucursales" className="w-8 h-8" style={{ filter: 'brightness(0) invert(1)' }} />
                </div>                <h1 className="text-3xl font-black text-[#7f1d1d] mb-1">Nuestras Sucursales</h1>
                <p className="text-gray-500 text-sm">
                    Selecciona la sucursal desde donde quieres pedir o reservar.
                </p>
            </div>

            {/* Sucursal activa seleccionada */}
            {selectedBranch && (
                <div className="bg-red-50 border border-[#e11d48]/30 rounded-2xl px-5 py-3 flex items-center justify-between">
                    <p className="text-sm text-[#e11d48] font-bold">
                        ✓ Sucursal activa: <span className="font-black">{selectedBranch.name}</span> — Zona {selectedBranch.zone}
                    </p>
                    <Button size="sm" onClick={handleConfirm}>
                        Ir al Menú →
                    </Button>
                </div>
            )}

            {/* Grid de sucursales */}
            {branches.length === 0 ? (
                <EmptyState icon={<img src={BranchesIcon} alt="" className="w-12 h-12 mx-auto opacity-30" />}
                    title="Sin sucursales disponibles"
                    description="No hay sucursales registradas en este momento."
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {branches.map((branch) => (
                        <BranchCard
                            key={branch._id}
                            branch={branch}
                            selected={localSelected === branch._id}
                            onSelect={handleSelect}
                        />
                    ))}
                </div>
            )}

            {/* Botón confirmar */}
            {localSelected && (
                <div className="flex justify-center pt-4">
                    <Button size="lg" onClick={handleConfirm}>
                        Confirmar y Ver Menú →
                    </Button>
                </div>
            )}
        </div>
    );
};