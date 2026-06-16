'use strict';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.js';
import { Spinner } from '../../../shared/ui/Spinner.jsx';

export const LoginForm = ({ onRegister, onForgot }) => {
    const navigate = useNavigate();
    const login    = useAuthStore((s) => s.login);
    const loading  = useAuthStore((s) => s.loading);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const result = await login(data);
        if (result.success) navigate('/portal');
    };

    const inputClass = (err) =>
        `w-full px-4 py-2.5 bg-white border rounded-lg text-sm outline-none transition-all ${
            err
                ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                : 'border-gray-200 focus:border-[#e11d48] focus:ring-2 focus:ring-red-100'
        }`;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-xs font-bold text-[#a16207] uppercase mb-1">
                    Correo Electrónico
                </label>
                <input
                    type="email"
                    className={inputClass(errors.UserEmail)}
                    placeholder="tu@correo.com"
                    {...register('UserEmail', {
                        required: 'El correo es requerido',
                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Correo inválido' },
                    })}
                />
                {errors.UserEmail && <p className="text-red-500 text-xs mt-1">{errors.UserEmail.message}</p>}
            </div>

            <div>
                <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-[#a16207] uppercase">Contraseña</label>
                    <button type="button" onClick={onForgot} className="text-[10px] font-bold text-orange-600 hover:text-red-600 transition-colors">
                        ¿OLVIDASTE TU CLAVE?
                    </button>
                </div>
                <input
                    type="password"
                    className={inputClass(errors.password)}
                    placeholder="••••••••"
                    {...register('password', {
                        required: 'La contraseña es requerida',
                        minLength: { value: 8, message: 'Mínimo 8 caracteres' },
                    })}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#e11d48] hover:bg-red-700 disabled:opacity-60 text-white font-black py-3 rounded-xl text-sm shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 mt-2"
            >
                {loading && <Spinner size="sm" color="text-white" />}
                {loading ? 'Ingresando...' : 'INGRESAR A COMER'}
            </button>

            <div className="text-center pt-1">
                <button type="button" onClick={onRegister} className="text-xs font-bold text-[#a16207] hover:text-red-600 transition-colors">
                    ¿No tienes cuenta? Regístrate aquí
                </button>
            </div>
        </form>
    );
};