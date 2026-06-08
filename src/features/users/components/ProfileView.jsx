'use strict';

import { useClientStore } from '../../auth/store/clientStore.js';
import { formatDate, getInitials } from '../../../shared/utils/formatters.js';

export const ProfileView = () => {
    const user   = useClientStore((s) => s.user);
    const logout = useClientStore((s) => s.logout);

    if (!user) return null;

    return (
        <div className="max-w-2xl mx-auto px-4 py-10 animate-fadeIn">
            <h1 className="text-2xl font-black text-[#7f1d1d] mb-6">Mi Perfil</h1>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-[#facc15] flex items-center justify-center text-red-900 font-black text-2xl shadow-md">
                        {getInitials(user.UserName, user.UserSurname)}
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-gray-800">
                            {user.UserName} {user.UserSurname}
                        </h2>
                        <p className="text-gray-500 text-sm">{user.UserEmail}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                            {user.role}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 text-sm">
                    <div>
                        <p className="text-gray-400 font-medium">Estado</p>
                        <p className="font-bold text-gray-700">{user.UserStatus}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 font-medium">Miembro desde</p>
                        <p className="font-bold text-gray-700">{formatDate(user.UserCreatedAt)}</p>
                    </div>
                </div>
            </div>

            {/* TODO: Agregar formulario de edición con updateProfileRequest() */}

            <button
                onClick={logout}
                className="w-full border-2 border-[#e11d48] text-[#e11d48] hover:bg-red-50 font-black py-3 rounded-xl transition-all"
            >
                Cerrar Sesión
            </button>
        </div>
    );
};