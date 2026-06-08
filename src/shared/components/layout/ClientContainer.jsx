'use strict';

import { Outlet } from 'react-router-dom';
import { ClientNavbar } from './ClientNavbar.jsx';
import { ClientFooter } from './ClientFooter.jsx';

export const ClientContainer = () => {
    return (
        <div className="min-h-screen bg-[#fdfaf5] flex flex-col">
            <ClientNavbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <ClientFooter />
        </div>
    );
};