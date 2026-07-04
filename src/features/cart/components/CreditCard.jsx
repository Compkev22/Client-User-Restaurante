'use strict';

const detectBrand = (number) => {
    const clean = number.replace(/\s/g, '');
    if (/^4/.test(clean)) return 'VISA';
    if (/^5[1-5]/.test(clean) || /^2[2-7]/.test(clean)) return 'MASTERCARD';
    if (/^3[47]/.test(clean)) return 'AMEX';
    return null;
};

const BrandLogo = ({ brand }) => {
    if (brand === 'VISA') {
        return (
            <span className="text-white font-black text-xl italic tracking-wider" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                VISA
            </span>
        );
    }
    if (brand === 'MASTERCARD') {
        return (
            <div className="flex items-center gap-0">
                <div className="w-7 h-7 rounded-full bg-red-400/80" />
                <div className="w-7 h-7 rounded-full bg-yellow-400/80 -ml-3" />
            </div>
        );
    }
    if (brand === 'AMEX') {
        return (
            <span className="text-white font-black text-sm tracking-wider" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                AMEX
            </span>
        );
    }
    return <div className="w-10 h-6 rounded bg-white/20" />;
};

export const CreditCard = ({ cardNumber = '', cardHolder = '', expiry = '' }) => {
    const brand = detectBrand(cardNumber);

    const displayNumber = cardNumber || '0000 0000 0000 0000';
    const displayHolder = cardHolder || 'NOMBRE APELLIDO';
    const displayExpiry = expiry || 'MM/AA';

    return (
        <div className="w-full max-w-[380px] mx-auto">
            <div
                className="relative rounded-2xl p-6 pb-5 text-white overflow-hidden shadow-2xl"
                style={{
                    background: 'linear-gradient(135deg, #e11d48 0%, #9f1239 50%, #7f1d1d 100%)',
                    aspectRatio: '1.586 / 1',
                }}
            >
                {/* Patrones decorativos */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white translate-y-1/3 -translate-x-1/4" />
                    <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full bg-white -translate-x-1/2 -translate-y-1/2" />
                </div>

                {/* Contenido */}
                <div className="relative z-10 flex flex-col justify-between h-full">
                    {/* Fila superior: chip + marca */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* Chip */}
                            <div className="w-10 h-7 rounded-md bg-gradient-to-br from-yellow-300 via-yellow-200 to-yellow-400 shadow-inner flex items-center justify-center">
                                <div className="w-6 h-4 rounded-sm border border-yellow-600/30" />
                            </div>
                            {/* Nivel */}
                            <div className="w-8 h-5 rounded bg-white/20 flex items-center justify-center">
                                <div className="w-5 h-3 rounded-sm border border-white/40" />
                            </div>
                        </div>
                        <BrandLogo brand={brand} />
                    </div>

                    {/* Numero de tarjeta */}
                    <div className="font-mono text-xl sm:text-2xl tracking-[0.15em] font-bold mt-4" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.2)' }}>
                        {displayNumber}
                    </div>

                    {/* Fila inferior: nombre + fecha */}
                    <div className="flex items-end justify-between mt-3">
                        <div className="flex-1 min-w-0 mr-4">
                            <p className="text-[9px] uppercase tracking-widest text-white/60 mb-0.5">Titular</p>
                            <p className="text-sm font-bold uppercase truncate tracking-wide">
                                {displayHolder}
                            </p>
                        </div>
                        <div className="text-right shrink-0">
                            <p className="text-[9px] uppercase tracking-widest text-white/60 mb-0.5">Expira</p>
                            <p className="text-sm font-bold tracking-wider">
                                {displayExpiry}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
