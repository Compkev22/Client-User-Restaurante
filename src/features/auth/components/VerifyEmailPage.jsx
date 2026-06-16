// VerifyEmailPage.jsx
'use strict';

import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../../../shared/api/index.js';
import { showSuccess, showError } from '../../../shared/utils/toast.js';
import { Spinner } from '../../../shared/ui/Spinner.jsx';
import logo from '../../../assets/img/KinalFriedChickenLogo.png';

export const VerifyEmailPage = () => {
    const [searchParams] = useSearchParams();
    const navigate       = useNavigate();

    const [status, setStatus]   = useState('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = searchParams.get('token');
        const email = localStorage.getItem('pending_verification_email');

        if (!token) {
            setStatus('error');
            setMessage('El enlace de verificación es inválido o ha expirado.');
            return;
        }

        if (!email) {
            setStatus('error');
            setMessage(
                'No encontramos tu correo en esta sesión. ' +
                'Por favor inicia sesión con tu cuenta o regístrate de nuevo.'
            );
            return;
        }

        verifyEmail({ email, token })
            .then(() => {
                localStorage.removeItem('pending_verification_email');
                setStatus('success');
                showSuccess('¡Cuenta activada! Ya puedes iniciar sesión.');
            })
            .catch((err) => {
                const msg =
                    err.response?.data?.message ||
                    'El enlace es inválido o ya fue utilizado.';
                setStatus('error');
                setMessage(msg);
                showError(msg);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const Screen = {
        loading: (
            <div className="flex flex-col items-center gap-4">
                <Spinner size="lg" color="text-[#e11d48]" />
                <p className="text-sm text-gray-600 font-medium">
                    Verificando tu cuenta, un momento...
                </p>
            </div>
        ),

        success: (
            <div className="text-center">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-xl font-black text-gray-900 mb-2">
                    ¡Cuenta Activada!
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                    Tu correo fue verificado exitosamente. Ya puedes iniciar sesión.
                </p>
                <button
                    onClick={() => navigate('/login', { replace: true })}
                    className="w-full bg-[#e11d48] hover:bg-red-700 text-white font-black py-3 rounded-xl text-sm shadow-lg transition-all active:scale-95"
                >
                    IR AL INICIO DE SESIÓN
                </button>
            </div>
        ),

        error: (
            <div className="text-center">
                <div className="text-5xl mb-4">❌</div>
                <h2 className="text-xl font-black text-gray-900 mb-2">
                    Error de Verificación
                </h2>
                <p className="text-sm text-gray-500 mb-6">{message}</p>
                <button
                    onClick={() => navigate('/login', { replace: true })}
                    className="w-full bg-[#e11d48] hover:bg-red-700 text-white font-black py-3 rounded-xl text-sm shadow-lg transition-all active:scale-95"
                >
                    VOLVER AL INICIO DE SESIÓN
                </button>
            </div>
        ),
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#7f1d1d] p-4">
            <div className="bg-[#fffaf2] w-full max-w-[420px] rounded-3xl shadow-2xl p-8 border border-orange-100">

                {/* Marca */}
                <div className="text-center mb-8">
                    <img
                        src={logo}
                        alt="Kinal Fried Chicken"
                        className="h-24 mx-auto object-contain drop-shadow-md mb-2"
                    />
                    <p className="text-[11px] font-bold text-[#dc2626] uppercase tracking-[0.2em] mt-1">
                        Verificación de cuenta
                    </p>
                </div>

                {Screen[status]}

                <p className="mt-8 text-center text-[11px] text-gray-400">
                    Kinal Fried Chicken &copy; {new Date().getFullYear()}
                </p>
            </div>
        </div>
    );
};