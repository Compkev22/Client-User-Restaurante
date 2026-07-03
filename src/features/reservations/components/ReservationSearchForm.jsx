'use strict';

import { Card } from '../../../shared/ui/Card.jsx';
import { Button } from '../../../shared/ui/Button.jsx';
import { Select } from '../../../shared/ui/Select.jsx';

export const ReservationSearchForm = ({
    branches,
    branchId,
    setBranchId,
    numberOfPersons,
    setNumberOfPersons,
    date,
    setDate,
    time,
    setTime,
    timeSlots,
    notes,
    setNotes,
    onSubmit,
    submitting,
    selectedTableId,
    editingReservation,
    onCancelEdit,
    children,
}) => (
    <Card>
        <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                    label="Sucursal"
                    value={branchId}
                    onChange={(e) => setBranchId(e.target.value)}
                    options={[
                        { value: '', label: 'Selecciona una sucursal' },
                        ...branches.map((b) => ({ value: b._id, label: `${b.name} (Zona ${b.zone})` })),
                    ]}
                    required
                />

                <div>
                    <label className="block text-xs font-bold text-[#a16207] uppercase mb-1">
                        Cantidad de personas
                    </label>
                    <input
                        type="number"
                        min={1}
                        max={50}
                        value={numberOfPersons}
                        onChange={(e) => setNumberOfPersons(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#e11d48] focus:ring-2 focus:ring-red-100 transition-all"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-[#a16207] uppercase mb-1">
                        Fecha
                    </label>
                    <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#e11d48] focus:ring-2 focus:ring-red-100 transition-all"
                        required
                        disabled={!branchId}
                    />
                </div>

                <Select
                    label="Hora"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    options={[
                        { value: '', label: branchId ? 'Selecciona una hora' : 'Elige sucursal primero' },
                        ...timeSlots.map((slot) => ({ value: slot, label: slot })),
                    ]}
                    required
                    disabled={!branchId || !date}
                />
            </div>

            {/* Grilla de mesas (inyectada desde ReservationsView) */}
            {children}

            <div>
                <label className="block text-xs font-bold text-[#a16207] uppercase mb-1">
                    Notas (opcional)
                </label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    maxLength={250}
                    rows={3}
                    placeholder="Ej. Celebración de cumpleaños, silla para bebé, etc."
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#e11d48] focus:ring-2 focus:ring-red-100 transition-all resize-none"
                />
            </div>

            {editingReservation && (
                <div className="flex items-center justify-between bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-2">
                    <p className="text-sm text-yellow-700 font-bold">
                        Editando reservación — Mesa {editingReservation.tableId?.numberTable}
                    </p>
                    <button
                        type="button"
                        onClick={onCancelEdit}
                        className="text-xs text-yellow-600 hover:text-yellow-800 font-black underline"
                    >
                        Cancelar edición
                    </button>
                </div>
            )}

            <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={submitting}
                disabled={!selectedTableId}
                className="w-full"
            >
                {submitting
                    ? (editingReservation ? 'Actualizando...' : 'Reservando...')
                    : (editingReservation ? 'GUARDAR CAMBIOS' : 'CONFIRMAR RESERVA')}
            </Button>
        </form>
    </Card>
);