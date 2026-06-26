'use strict';

import { useState } from 'react';
import { showError, showSuccess } from '../../../shared/utils/toast.js';
import { Spinner } from '../../../shared/ui/Spinner.jsx';
import { useEvents } from '../hook/useEvents.js';
import { EventForm } from './EventForm.jsx';
import { MyEventsList } from './MyEventsList.jsx';

export const EventsView = () => {
    const {
        events,
        additionalServices,
        branches,
        loadingPage,
        submitting,
        submitEvent,
    } = useEvents();

    // ── Estado de UI local (inputs controlados del formulario) ──
    const [branchId, setBranchId]               = useState('');
    const [name, setName]                       = useState('');
    const [eventDate, setEventDate]             = useState('');
    const [startTime, setStartTime]             = useState('');
    const [endTime, setEndTime]                 = useState('');
    const [numberOfPersons, setNumberOfPersons] = useState(10);
    const [notes, setNotes]                     = useState('');
    const [selectedServiceIds, setSelectedServiceIds] = useState([]);

    const toggleService = (id) => {
        setSelectedServiceIds((prev) =>
            prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
        );
    };

    const resetForm = () => {
        setBranchId('');
        setName('');
        setEventDate('');
        setStartTime('');
        setEndTime('');
        setNumberOfPersons(10);
        setNotes('');
        setSelectedServiceIds([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!branchId || !name || !eventDate || !startTime || !endTime || !numberOfPersons) {
            showError('Completa sucursal, nombre, fecha, horas y cantidad de personas.');
            return;
        }

        if (startTime >= endTime) {
            showError('La hora de fin debe ser posterior a la hora de inicio.');
            return;
        }

        const payload = {
            branchId,
            name,
            eventDate,
            startTime,
            endTime,
            numberOfPersons: Number(numberOfPersons),
            notes,
            additionalServices: selectedServiceIds.map((id) => ({ additionalServiceId: id })),
        };

        const ok = await submitEvent(payload);

        if (ok) {
            showSuccess('Evento creado exitosamente. Las mesas fueron asignadas automáticamente.');
            resetForm();
        } else {
            showError('No se pudo crear el evento. Verifica disponibilidad de espacio.');
        }
    };

    if (loadingPage) {
        return (
            <div className="flex justify-center py-20">
                <Spinner size="lg" color="text-[#e11d48]" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 animate-fadeIn space-y-8">
            <div className="text-center">
                <div className="text-6xl mb-2">🎉</div>
                <h1 className="text-3xl font-black text-[#7f1d1d] mb-1">Solicita tu evento</h1>
                <p className="text-gray-500 text-sm">
                    Indica los detalles del evento; nosotros asignamos las mesas automáticamente.
                </p>
            </div>

            <EventForm
                branches={branches}
                branchId={branchId} setBranchId={setBranchId}
                additionalServices={additionalServices}
                name={name} setName={setName}
                eventDate={eventDate} setEventDate={setEventDate}
                startTime={startTime} setStartTime={setStartTime}
                endTime={endTime} setEndTime={setEndTime}
                numberOfPersons={numberOfPersons} setNumberOfPersons={setNumberOfPersons}
                notes={notes} setNotes={setNotes}
                selectedServiceIds={selectedServiceIds}
                onToggleService={toggleService}
                onSubmit={handleSubmit}
                submitting={submitting}
            />

            <MyEventsList events={events} />
        </div>
    );
};