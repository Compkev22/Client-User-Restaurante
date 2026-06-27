'use strict';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerRequest } from '../../../shared/api/index.js';
import { showSuccess, showError } from '../../../shared/utils/toast.js';
import { Spinner } from '../../../shared/ui/Spinner.jsx';

export const RegisterForm = ({ onLogin }) => {
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await registerRequest({
                UserName:    data.UserName,
                UserSurname: data.UserSurname,
                Username:    data.Username,
                UserEmail:   data.UserEmail,
                password:    data.password,
                phone:       data.phone,
            });
            showSuccess('¡Cuenta creada! Revisa tu correo para verificarla.');
            onLogin();
        } catch (err) {
            showError(err.response?.data?.message || 'Error al crear la cuenta');
        } finally {
            setLoading(false);
        }
    };

    const inputClass = (err) =>
        `w-full px-4 py-2.5 bg-white border rounded-lg text-sm outline-none transition-all ${
            err ? 'border-red-400' : 'border-gray-200 focus:border-[#e11d48] focus:ring-2 focus:ring-red-100'
        }`;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-bold text-[#a16207] uppercase mb-1">Nombre</label>
                    <input className={inputClass(errors.UserName)} placeholder="Ana"
                        {...register('UserName', { required: 'Requerido' })} />
                    {errors.UserName && <p className="text-red-500 text-xs mt-1">{errors.UserName.message}</p>}
                </div>
                <div>
                    <label className="block text-xs font-bold text-[#a16207] uppercase mb-1">Apellido</label>
                    <input className={inputClass(errors.UserSurname)} placeholder="García"
                        {...register('UserSurname', { required: 'Requerido' })} />
                    {errors.UserSurname && <p className="text-red-500 text-xs mt-1">{errors.UserSurname.message}</p>}
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-[#a16207] uppercase mb-1">Nombre de usuario</label>
                <input className={inputClass(errors.Username)} placeholder="ana.garcia"
                    {...register('Username', { required: 'Requerido' })} />
                {errors.Username && <p className="text-red-500 text-xs mt-1">{errors.Username.message}</p>}
            </div>

            <div>
                <label className="block text-xs font-bold text-[#a16207] uppercase mb-1">Correo</label>
                <input type="email" className={inputClass(errors.UserEmail)} placeholder="tu@correo.com"
                    {...register('UserEmail', {
                        required: 'El correo es requerido',
                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Correo inválido' },
                    })} />
                {errors.UserEmail && <p className="text-red-500 text-xs mt-1">{errors.UserEmail.message}</p>}
            </div>

            <div>
                <label className="block text-xs font-bold text-[#a16207] uppercase mb-1">Teléfono</label>
                <input className={inputClass(errors.phone)} placeholder="12345678" maxLength={8}
                    {...register('phone', {
                        required: 'El teléfono es requerido',
                        pattern: { value: /^[0-9]{8}$/, message: 'Debe tener 8 dígitos' },
                    })} />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>

            <div>
                <label className="block text-xs font-bold text-[#a16207] uppercase mb-1">Contraseña</label>
                <input type="password" className={inputClass(errors.password)} placeholder="Mínimo 8 caracteres"
                    {...register('password', {
                        required: 'La contraseña es requerida',
                        minLength: { value: 8, message: 'Mínimo 8 caracteres' },
                    })} />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div>
                <label className="block text-xs font-bold text-[#a16207] uppercase mb-1">Confirmar Contraseña</label>
                <input type="password" className={inputClass(errors.confirmPassword)} placeholder="Repite tu contraseña"
                    {...register('confirmPassword', {
                        required: 'Confirma tu contraseña',
                        validate: (val) => val === watch('password') || 'Las contraseñas no coinciden',
                    })} />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <button type="submit" disabled={loading}
                className="w-full bg-[#e11d48] hover:bg-red-700 disabled:opacity-60 text-white font-black py-3 rounded-xl text-sm shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 mt-1"
            >
                {loading && <Spinner size="sm" color="text-white" />}
                {loading ? 'Creando cuenta...' : 'CREAR MI CUENTA'}
            </button>

            <div className="text-center pt-1">
                <button type="button" onClick={onLogin} className="text-xs font-bold text-[#a16207] hover:text-red-600 transition-colors">
                    ¿Ya tienes cuenta? Inicia sesión
                </button>
            </div>
        </form>
    );
};