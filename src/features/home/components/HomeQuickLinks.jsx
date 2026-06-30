'use strict';

import { useNavigate } from 'react-router-dom';
import BranchesIcon from '../../../assets/icons/Branches.svg';
import MenuIcon from '../../../assets/icons/Menu.svg';
import ReservationIcon from '../../../assets/icons/Reservation.svg';
import EventsIcon from '../../../assets/icons/Events.svg';
import ReviewsIcon from '../../../assets/icons/Reviews.svg';
import UseCouponIcon from '../../../assets/icons/usecoupon.svg';

const QUICK_LINKS = [
    { label: 'Sucursales', path: '/portal/sucursales', icon: BranchesIcon },
    { label: 'Menú',       path: '/portal/menu',       icon: MenuIcon },
    { label: 'Reservas',   path: '/portal/reservas',   icon: ReservationIcon },
    { label: 'Eventos',    path: '/portal/eventos',    icon: EventsIcon },
    { label: 'Reseñas',    path: '/portal/resenas',    icon: ReviewsIcon },
    { label: 'Cupones',    path: '/portal/cupones',    icon: UseCouponIcon },
];

export const HomeQuickLinks = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-6xl mx-auto px-4 -mt-6">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 px-4 py-5 overflow-x-auto">
                <div className="flex gap-4 sm:gap-6 sm:justify-center min-w-max sm:min-w-0">
                    {QUICK_LINKS.map((link) => (
                        <button
                            key={link.path}
                            onClick={() => navigate(link.path)}
                            className="flex flex-col items-center gap-2 group shrink-0 w-20"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-[#fdfaf5] border-2 border-gray-100 group-hover:border-[#e11d48] flex items-center justify-center transition-colors shadow-sm">
                                <img
                                    src={link.icon}
                                    alt={link.label}
                                    className="w-7 h-7"
                                    style={{ filter: 'invert(20%) sepia(90%) saturate(700%) hue-rotate(330deg)' }}
                                />
                            </div>
                            <span className="text-[11px] font-black text-gray-600 group-hover:text-[#e11d48] uppercase tracking-wide text-center leading-tight">
                                {link.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};