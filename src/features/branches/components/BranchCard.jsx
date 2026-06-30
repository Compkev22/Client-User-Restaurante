'use strict';

import { Badge } from '../../../shared/ui/Badge.jsx';
import BranchLocationIcon from '../../../assets/icons/BranchLocation.svg';
import BranchPhoneIcon from '../../../assets/icons/BranchPhone.svg';
import DriveThruIcon from '../../../assets/icons/Drive-Thru.svg';

const DEFAULT_IMG = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400&h=200&auto=format&fit=crop';

export const BranchCard = ({ branch, selected, onSelect }) => {
    const isActive = branch.branchStatus === 'ACTIVE';
    const photo  = branch.Photos?.[0]?.ImageURL || branch.Photos?.[0]?.ImgaeURL;
    const imgSrc = photo || DEFAULT_IMG;

    return (
        <div
            onClick={() => isActive && onSelect(branch)}
            className={`bg-white rounded-3xl shadow-md border overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer animate-fadeIn ${
                selected
                    ? 'border-[#e11d48] shadow-lg shadow-red-100 scale-[1.01]'
                    : 'border-gray-100 hover:border-[#e11d48]/40'
            } ${!isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            <div className={`h-2 bg-gradient-to-r ${isActive ? 'from-green-400 to-green-600' : 'from-red-400 to-red-600'}`} />

            <div className="w-full h-44 bg-gray-100 overflow-hidden">
                <img
                    src={imgSrc}
                    alt={branch.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = DEFAULT_IMG; }}
                />
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4 gap-2">
                    <h3 className="text-lg font-black text-gray-800 uppercase italic leading-tight">
                        {branch.name}
                    </h3>
                    <span className={`shrink-0 px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                        isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                        {isActive ? 'Activa' : 'Inactiva'}
                    </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600 font-medium flex-1">
                    <div className="flex items-start gap-2">
                        <img src={BranchLocationIcon} alt="Ubicación" className="w-4 h-4 mt-0.5 shrink-0" style={{ filter: 'invert(20%) sepia(90%) saturate(700%) hue-rotate(330deg)' }} />
                        <span className="line-clamp-2">{branch.address}, Zona {branch.zone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src={BranchPhoneIcon} alt="Teléfono" className="w-4 h-4 shrink-0" style={{ filter: 'invert(20%) sepia(90%) saturate(700%) hue-rotate(330deg)' }} />
                        <span>{branch.phone}</span>
                    </div>
                    <div className="text-xs text-gray-400 font-bold bg-gray-50 rounded-xl px-3 py-2 mt-2">
                        🕐 {branch.OpenedAt} — {branch.ClosedAt} &nbsp;|&nbsp; {branch.Category}
                    </div>
                </div>

                {branch.hasDriveThru && (
                    <div className="mt-3">
                        <span className="bg-yellow-100 text-yellow-700 text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
                            <img src={DriveThruIcon} alt="Drive-Thru" className="w-3.5 h-3.5" style={{ filter: 'invert(45%) sepia(60%) saturate(600%) hue-rotate(10deg)' }} />
                            Drive-Thru disponible
                        </span>
                    </div>
                )}

                {selected && (
                    <div className="mt-3 text-center text-xs font-black text-[#e11d48] uppercase tracking-widest border border-[#e11d48]/30 rounded-xl py-1.5">
                        ✓ Sucursal seleccionada
                    </div>
                )}
            </div>
        </div>
    );
};