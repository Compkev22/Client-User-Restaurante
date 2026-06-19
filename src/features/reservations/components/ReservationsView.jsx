'use strict';

import { useEffect, useMemo, useState } from 'react';
import { showError } from '../../../shared/utils/toast.js';
import { Spinner } from '../../../shared/ui/Spinner.jsx';
import { useReservations } from '../hooks/useReservations.js';
import { buildTimeSlots } from './buildTimeSlots.js';
import { ReservationSearchForm } from './ReservationSearchForm.jsx';
import { TableAvailabilityGrid } from './TableAvailabilityGrid.jsx';
import { MyReservationsList } from './MyReservationsList.jsx';
import ReservationIcon from '../../../assets/icons/Reservation.svg';

export const ReservationsView = () => {
    const {
        branches,
        myReservations,
        loadingPage,
        tables,
        loadingTables,
        submitting,
        fetchAvailability,
        clearTables,
        submitReservation,
        cancelReservation,
    } = useReservations();

    // ── Estado de UI local (inputs controlados del formulario) ──
    const [branchId, setBranchId]   = useState('');
    const [date, setDate]           = useState('');
    const [time, setTime]           = useState('');
    const [numberOfPersons, setNumberOfPersons] = useState(2);
    const [notes, setNotes]         = useState('');
    const [selectedTableId, setSelectedTableId] = useState('');

    const selectedBranch = useMemo(
        () => branches.find((b) => b._id === branchId),
        [branches, branchId]
    );

    const timeSlots = useMemo(
        () => buildTimeSlots(selectedBranch?.OpenedAt, selectedBranch?.ClosedAt),
        [selectedBranch]
    );

    // ── Al cambiar sucursal, resetea hora seleccionada ──
    useEffect(() => {
        setTime('');
        clearTables();
        setSelectedTableId('');
    }, [branchId, clearTables]);

    // ── Cuando hay sucursal + fecha + hora, consulta disponibilidad ──
    useEffect(() => {
        setSelectedTableId('');
        fetchAvailability(branchId, date, time);
    }, [branchId, date, time, fetchAvailability]);

    const handleSelectTable = (table) => {
        if (table.isOccupied) return;
        if (table.capacity < numberOfPersons) {
            showError(`Esa mesa solo tiene capacidad para ${table.capacity} personas.`);
            return;
        }
        setSelectedTableId(table._id);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!branchId || !date || !time || !selectedTableId) {
            showError('Completa sucursal, fecha, hora y selecciona una mesa.');
            return;
        }

        const ok = await submitReservation({
            branchId,
            tableId: selectedTableId,
            date,
            time,
            numberOfPersons: Number(numberOfPersons),
            notes,
        });

        if (ok) {
            setSelectedTableId('');
            setNotes('');
        }
    };

    const handleCancel = (id) => cancelReservation(id);

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
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-[#e11d48] flex items-center justify-center shadow-md">
                    <img
                        src={ReservationIcon}
                        alt="Reservaciones"
                        className="w-8 h-8"
                        style={{ filter: 'brightness(0) invert(1)' }}
                    />
                </div>
                <h1 className="text-3xl font-black text-[#7f1d1d] mb-1">Reserva tu mesa</h1>
                <p className="text-gray-500 text-sm">Elige sucursal, fecha y hora para ver las mesas disponibles.</p>
            </div>

            <ReservationSearchForm
                branches={branches}
                branchId={branchId}
                setBranchId={setBranchId}
                numberOfPersons={numberOfPersons}
                setNumberOfPersons={setNumberOfPersons}
                date={date}
                setDate={setDate}
                time={time}
                setTime={setTime}
                timeSlots={timeSlots}
                notes={notes}
                setNotes={setNotes}
                onSubmit={handleSubmit}
                submitting={submitting}
                selectedTableId={selectedTableId}
            >
                <TableAvailabilityGrid
                    branchId={branchId}
                    date={date}
                    time={time}
                    loadingTables={loadingTables}
                    tables={tables}
                    selectedTableId={selectedTableId}
                    numberOfPersons={numberOfPersons}
                    onSelectTable={handleSelectTable}
                />
            </ReservationSearchForm>

            <MyReservationsList
                reservations={myReservations}
                onCancel={handleCancel}
            />
        </div>
    );
};