'use strict';

import { Spinner } from '../../../shared/ui/Spinner.jsx';

export const TableAvailabilityGrid = ({
    branchId,
    date,
    time,
    loadingTables,
    tables,
    selectedTableId,
    numberOfPersons,
    onSelectTable,
}) => {
    if (!branchId || !date || !time) return null;

    return (
        <div>
            <p className="text-xs font-bold text-[#a16207] uppercase mb-2">
                Selecciona una mesa
            </p>

            {loadingTables ? (
                <div className="flex justify-center py-8">
                    <Spinner size="md" color="text-[#e11d48]" />
                </div>
            ) : tables.length === 0 ? (
                <p className="text-sm text-gray-500 py-4 text-center">
                    No hay mesas registradas en esta sucursal.
                </p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {tables.map((table) => {
                        const isSelected = table._id === selectedTableId;
                        const isTooSmall = table.capacity < numberOfPersons;
                        const isDisabled = table.isOccupied || isTooSmall;

                        const baseClass = 'rounded-xl border-2 p-3 text-center transition-all cursor-pointer';
                        const stateClass = table.isOccupied
                            ? 'bg-red-50 border-red-200 text-red-400 cursor-not-allowed opacity-70'
                            : isTooSmall
                                ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed opacity-70'
                                : isSelected
                                    ? 'bg-[#e11d48] border-[#e11d48] text-white shadow-lg scale-105'
                                    : 'bg-white border-gray-200 hover:border-[#e11d48] hover:shadow-md';

                        return (
                            <button
                                type="button"
                                key={table._id}
                                onClick={() => onSelectTable(table)}
                                disabled={isDisabled}
                                className={`${baseClass} ${stateClass}`}
                            >
                                <p className="font-black text-sm">Mesa {table.numberTable}</p>
                                <p className="text-[11px] mt-1">
                                    {table.capacity} personas
                                </p>
                                <p className="text-[10px] mt-1 font-bold uppercase">
                                    {table.isOccupied ? 'Ocupada' : isTooSmall ? 'Muy pequeña' : 'Disponible'}
                                </p>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};