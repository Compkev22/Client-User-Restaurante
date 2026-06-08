'use strict';

import { Toaster } from 'react-hot-toast';
import { AppRoutes } from './router/AppRoutes.jsx';

function App() {
    return (
        <>
            <Toaster
                position="top-center"
                toastOptions={{
                    style: {
                        fontFamily: 'inherit',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        borderRadius: '8px',
                    },
                }}
            />
            <AppRoutes />
        </>
    );
}

export default App;