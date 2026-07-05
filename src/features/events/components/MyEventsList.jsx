'use strict';

import { Card } from '../../../shared/ui/Card.jsx';
import { Badge } from '../../../shared/ui/Badge.jsx';
import { EmptyState } from '../../../shared/ui/EmptyState.jsx';
import { formatDateShort } from '../../../shared/utils/formatters.js';

const statusVariant = {
    Pendiente:  'warning',
    Aceptada: 'success',
    Rechazada:  'danger',
    Cancelada: 'neutral',
    Finalizado: 'neutral',
};

export const MyEventsList = ({ eventRequests, onCancel }) => (
    <div>
        <h2 className="text-xl font-black text-gray-800 mb-4">Mis eventos</h2>

        {eventRequests.length === 0 ? (
            <EmptyState
                icon="🎉"
                title="Sin eventos todavía"
                description="Cuando solicites un evento, aparecerá aquí."
            />
        ) : (
            <div className="space-y-3">
                {eventRequests.map((ev) => (
                    <Card key={ev._id} className="flex items-center justify-between flex-wrap gap-3">
                        <div>
                            <p className="font-bold text-gray-800">{ev.name}</p>
                            <p className="text-sm text-gray-500">
                                {formatDateShort(ev.eventDate)} · {ev.startTime} - {ev.endTime} · {ev.numberOfPersons} personas
                            </p>
                            {ev.tables?.length > 0 && (
                                <p className="text-xs text-gray-400 mt-1">
                                    Mesas asignadas: {ev.tables.map((t) => t.numberTable).join(', ')}
                                </p>
                            )}
                            {ev.status === 'Rechazada' && ev.rejectionReason && (
                                <p className="text-xs text-red-500 italic mt-1">Motivo: {ev.rejectionReason}</p>
                            )}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <Badge variant={statusVariant[ev.status] || 'neutral'}>
                                {ev.status}
                            </Badge>
                            {ev.status === 'Pendiente' && (
                                <button
                                    onClick={() => onCancel(ev._id)}
                                    className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors"
                                >
                                    Cancelar solicitud
                                </button>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        )}
    </div>
);
