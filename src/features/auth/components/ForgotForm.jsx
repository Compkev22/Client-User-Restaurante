'use strict';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { forgotPassword } from '../../../shared/api/index.js';
import { showSuccess, showError } from '../../../shared/utils/toast.js';
import { Spinner } from '../../../shared/ui/Spinner.jsx';

export const ForgotForm = ({ onBack }) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const { data: res } = await forgotPassword(data.UserEmail);
            showSuccess(res?.message || `Se enviaron instrucciones a ${data.UserEmail}`);
            onBack();
        } catch (err) {
            showError(err.response?.data?.message || 'No se pudo procesar la solicitud');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-xs font-bold text-[#a16207] uppercase mb-1">Correo Electrónico</label>
                <input
                    type="email"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#e11d48] focus:ring-2 focus:ring-red-100 transition-all"
                    placeholder="tu@correo.com"
                    {...register('UserEmail', {
                        required: 'El correo es requerido',
                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Correo inválido' },
                    })}
                />
                {errors.UserEmail && <p className="text-red-500 text-xs mt-1">{errors.UserEmail.message}</p>}
            </div>

            <button type="submit" disabled={loading}
                className="w-full bg-[#e11d48] hover:bg-red-700 disabled:opacity-60 text-white font-black py-3 rounded-xl text-sm shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
                {loading && <Spinner size="sm" color="text-white" />}
                {loading ? 'Enviando...' : 'ENVIAR INSTRUCCIONES'}
            </button>

            <div className="text-center">
                <button type="button" onClick={onBack} className="text-xs font-bold text-[#a16207] hover:text-red-600 transition-colors">
                    ← Volver al inicio de sesión
                </button>
            </div>
        </form>
    );
};