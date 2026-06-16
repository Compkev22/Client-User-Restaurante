// ResetPasswordForm.jsx
'use strict';

import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../../shared/api/auth.js';
import { showError, showSuccess } from '../../../shared/utils/toast.js';
import { Spinner } from '../../../shared/ui/Spinner.jsx';
import logo from '../../../assets/img/KinalFriedChickenLogo.png';

export const ResetPasswordPage = () => {
    const [searchParams]                = useSearchParams();
    const navigate                      = useNavigate();
    const token                         = searchParams.get('token');
    const [newPassword, setNewPassword] = useState('');
    const [confirm, setConfirm]         = useState('');
    const [loading, setLoading]         = useState(false);

    const inputClass = (hasError) =>
        `w-full px-4 py-2.5 bg-white border rounded-lg text-sm outline-none transition-all ${
            hasError
                ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                : 'border-gray-200 focus:border-[#e11d48] focus:ring-2 focus:ring-red-100'
        }`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirm) {
            showError('Las contraseñas no coinciden.');
            return;
        }
        if (newPassword.length < 8) {
            showError('La contraseña debe tener mínimo 8 caracteres.');
            return;
        }
        setLoading(true);
        try {
            await resetPassword(token, newPassword);
            showSuccess('Contraseña actualizada. Ya puedes iniciar sesión.');
            navigate('/login', { replace: true });
        } catch (err) {
            const msg = err.response?.data?.message || 'El enlace expiró o es inválido.';
            showError(msg);
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
                <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm text-center space-y-4">
                    <img src={logo} alt="Kinal Fried Chicken" className="h-20 mx-auto object-contain" />
                    <p className="text-red-500 font-bold text-sm">
                        Enlace inválido o expirado.
                    </p>
                    <button
                        onClick={() => navigate('/login')}
                        className="text-xs font-bold text-[#a16207] hover:text-red-600 transition-colors"
                    >
                        ← Volver al inicio de sesión
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 px-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">

                {/* Logo */}
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={logo}
                        alt="Kinal Fried Chicken"
                        className="h-24 object-contain drop-shadow-md"
                    />
                    <h1 className="text-xl font-black text-[#e11d48] mt-3 tracking-tight">
                        NUEVA CONTRASEÑA
                    </h1>
                    <p className="text-xs text-gray-400 mt-1 text-center">
                        Elige una contraseña segura para tu cuenta
                    </p>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-[#a16207] uppercase mb-1">
                            Nueva contraseña
                        </label>
                        <input
                            type="password"
                            className={inputClass(false)}
                            placeholder="••••••••"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            minLength={8}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-[#a16207] uppercase mb-1">
                            Confirmar contraseña
                        </label>
                        <input
                            type="password"
                            className={inputClass(confirm.length > 0 && confirm !== newPassword)}
                            placeholder="••••••••"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            required
                            minLength={8}
                        />
                        {confirm.length > 0 && confirm !== newPassword && (
                            <p className="text-red-500 text-xs mt-1">Las contraseñas no coinciden</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#e11d48] hover:bg-red-700 disabled:opacity-60 text-white font-black py-3 rounded-xl text-sm shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 mt-2"
                    >
                        {loading && <Spinner size="sm" color="text-white" />}
                        {loading ? 'Guardando...' : 'CAMBIAR CONTRASEÑA'}
                    </button>

                    <div className="text-center pt-1">
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="text-xs font-bold text-[#a16207] hover:text-red-600 transition-colors"
                        >
                            ← Volver al inicio de sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};