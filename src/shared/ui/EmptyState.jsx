'use strict';

export const EmptyState = ({
    icon = '🍗',
    title = 'Sin resultados',
    description = 'No hay nada aquí todavía.',
    action = null,
}) => (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fadeIn">
        <div className="text-6xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-gray-700 mb-2">{title}</h3>
        <p className="text-gray-500 mb-6 max-w-sm">{description}</p>
        {action && action}
    </div>
);