'use strict';

import { Card } from '../../../shared/ui/Card.jsx';
import { Button } from '../../../shared/ui/Button.jsx';
import { Badge } from '../../../shared/ui/Badge.jsx';
import { EmptyState } from '../../../shared/ui/EmptyState.jsx';

const statusVariant = {
    Pendiente: 'warning',
    Confirmada: 'success',
    Cancelada: 'danger',
    Completada: 'neutral',
};

export const MyReservationsList = ({ reservations, onCancel }) => (
    <div>
        <h2 className="text-xl font-black text-gray-800 mb-4">Mis reservas</h2>

        {reservations.length === 0 ? (
            <EmptyState
                icon="📅"
                title="Sin reservas todavía"
                description="Cuando reserves una mesa, aparecerá aquí."
            />
        ) : (
            <div className="space-y-3">
                {reservations.map((res) => (
                    <Card key={res._id} className="flex items-center justify-between flex-wrap gap-3">
                        <div>
                            <p className="font-bold text-gray-800">
                                {res.branchId?.name || 'Sucursal'} — Mesa {res.tableId?.numberTable}
                            </p>
                            <p className="text-sm text-gray-500">
                                {new Intl.DateTimeFormat('es-GT', { timeZone: 'UTC' }).format(new Date(res.date))} a las {res.time}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Badge variant={statusVariant[res.status] || 'neutral'}>
                                {res.status}
                            </Badge>
                            {res.status === 'Pendiente' && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onCancel(res._id)}
                                >
                                    Cancelar
                                </Button>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        )}
    </div>
);