'use strict';

// Genera las horas disponibles en intervalos de 30 min dentro del horario de la sucursal
export const buildTimeSlots = (openedAt, closedAt) => {
    if (!openedAt || !closedAt) return [];

    const [openH, openM] = openedAt.split(':').map(Number);
    const [closeH, closeM] = closedAt.split(':').map(Number);

    const slots = [];
    let h = openH;
    let m = openM;

    while (h < closeH || (h === closeH && m <= closeM)) {
        const hh = String(h).padStart(2, '0');
        const mm = String(m).padStart(2, '0');
        slots.push(`${hh}:${mm}`);

        m += 30;
        if (m >= 60) {
            m = 0;
            h += 1;
        }
    }

    return slots;
};