'use strict';

import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/img/KinalFriedChickenLogo.png';
import BranchesIcon from '../../../assets/icons/Branches.svg';

export const HomeHero = ({ selectedBranch }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-gradient-to-br from-[#7f1d1d] via-[#e11d48] to-[#fb923c] text-white">
            <div className="max-w-6xl mx-auto px-4 py-14 text-center">
                <img src={logo} alt="Kinal Fried Chicken" className="h-20 w-auto mx-auto mb-4 drop-shadow-lg" />
                <h1 className="text-3xl sm:text-4xl font-black mb-2">
                    Bienvenido a KINAL FRIED CHICKEN
                </h1>
                <p className="text-white/90 text-sm sm:text-base max-w-md mx-auto mb-6">
                    El mejor sabor de pollo frito con la mejor experiencia de servicio en Guatemala.
                </p>

                {selectedBranch ? (
                    <button
                        onClick={() => navigate('/portal/sucursales')}
                        className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-bold transition-colors"
                    >
                        <img src={BranchesIcon} alt="" className="w-4 h-4" style={{ filter: 'brightness(0) invert(1)' }} />
                        Pidiendo desde: {selectedBranch.name} — cambiar
                    </button>
                ) : (
                    <button
                        onClick={() => navigate('/portal/sucursales')}
                        className="bg-[#facc15] hover:bg-yellow-300 text-red-900 font-black px-6 py-3 rounded-full shadow-lg transition-all active:scale-95"
                    >
                        Elegir sucursal y empezar
                    </button>
                )}
            </div>
        </div>
    );
};