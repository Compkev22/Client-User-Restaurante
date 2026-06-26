'use strict';

import { Card } from '../../../shared/ui/Card.jsx';
import { Button } from '../../../shared/ui/Button.jsx';
import { Input } from '../../../shared/ui/Input.jsx';
import { Select } from '../../../shared/ui/Select.jsx';
import { TextArea } from '../../../shared/ui/TextArea.jsx';
import { AdditionalServicesChecklist } from './AdditionalServicesChecklist.jsx';

export const EventForm = ({
    branches = [],
    branchId, setBranchId,
    additionalServices = [],
    name, setName,
    eventDate, setEventDate,
    startTime, setStartTime,
    endTime, setEndTime,
    numberOfPersons, setNumberOfPersons,
    notes, setNotes,
    selectedServiceIds,
    onToggleService,
    onSubmit,
    submitting,
}) => (
    <Card>
        <form onSubmit={onSubmit} className="space-y-5">
            <Input
                label="Nombre del evento"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Cumpleaños de Ana"
                required
            />

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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label className="block text-xs font-bold text-[#a16207] uppercase mb-1">
                        Fecha
                    </label>
                    <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#e11d48] focus:ring-2 focus:ring-red-100 transition-all"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-[#a16207] uppercase mb-1">
                        Hora inicio
                    </label>
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#e11d48] focus:ring-2 focus:ring-red-100 transition-all"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-[#a16207] uppercase mb-1">
                        Hora fin
                    </label>
                    <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#e11d48] focus:ring-2 focus:ring-red-100 transition-all"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-[#a16207] uppercase mb-1">
                    Cantidad de personas
                </label>
                <input
                    type="number"
                    min={1}
                    value={numberOfPersons}
                    onChange={(e) => setNumberOfPersons(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#e11d48] focus:ring-2 focus:ring-red-100 transition-all"
                    required
                />
                <p className="text-xs text-gray-400 mt-1">
                    Las mesas se asignan automáticamente según la cantidad de personas.
                </p>
            </div>

            <AdditionalServicesChecklist
                additionalServices={additionalServices}
                selectedIds={selectedServiceIds}
                onToggle={onToggleService}
            />

            <TextArea
                label="Notas (opcional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                maxLength={250}
                placeholder="Ej. Decoración temática, pastel incluido, etc."
            />

            <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={submitting}
                className="w-full"
            >
                {submitting ? 'Creando evento...' : 'SOLICITAR EVENTO'}
            </Button>
        </form>
    </Card>
);