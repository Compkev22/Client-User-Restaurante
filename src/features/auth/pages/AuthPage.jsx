// AuthPage.jsx
'use strict';

import { useState } from 'react';
import { LoginForm }    from '../components/LoginForm.jsx';
import { RegisterForm } from '../components/RegisterForm.jsx';
import { ForgotForm }   from '../components/ForgotForm.jsx';
import logo from '../../../assets/img/KinalFriedChickenLogo.png';

const VIEWS = { LOGIN: 'login', REGISTER: 'register', FORGOT: 'forgot' };

export const AuthPage = () => {
    const [view, setView] = useState(VIEWS.LOGIN);

    const titles = {
        [VIEWS.LOGIN]:    '¡Bienvenido de Nuevo!',
        [VIEWS.REGISTER]: 'Únete a la Familia',
        [VIEWS.FORGOT]:   'Recuperar Acceso',
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#7f1d1d] p-4">
            <div className="bg-[#fffaf2] w-full max-w-[420px] rounded-3xl shadow-2xl p-8 border border-orange-100 animate-fadeIn">

                {/* Marca */}
                <div className="text-center mb-6">
                    <img
                        src={logo}
                        alt="Kinal Fried Chicken"
                        className="h-24 mx-auto object-contain drop-shadow-md mb-2"
                    />
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                        {titles[view]}
                    </h1>
                    <p className="text-[11px] font-bold text-[#dc2626] uppercase tracking-[0.2em] mt-1">
                        Kinal Fried Chicken
                    </p>
                </div>

                {view === VIEWS.LOGIN    && <LoginForm    onRegister={() => setView(VIEWS.REGISTER)} onForgot={() => setView(VIEWS.FORGOT)} />}
                {view === VIEWS.REGISTER && <RegisterForm onLogin={() => setView(VIEWS.LOGIN)} />}
                {view === VIEWS.FORGOT   && <ForgotForm   onBack={() => setView(VIEWS.LOGIN)} />}

                <p className="mt-6 text-center text-[11px] text-gray-400">
                    Kinal Fried Chicken &copy; {new Date().getFullYear()}
                </p>
            </div>
        </div>
    );
};