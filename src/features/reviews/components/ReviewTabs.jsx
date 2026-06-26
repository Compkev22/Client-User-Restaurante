'use strict';

export const ReviewTabs = ({
    activeTab,
    setActiveTab,
    pendingCount = 0
}) => {

    const tabs = [
        { key: 'REVIEWS', label: 'Mis reseñas' },
        { key: 'PENDING', label: 'Mis órdenes', badge: pendingCount }
    ];

    return (
        <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-2 px-5 md:px-6 py-2.5 rounded-full text-[11px] md:text-xs font-black uppercase tracking-wider transition-all border-2 whitespace-nowrap ${
                        activeTab === tab.key
                            ? 'bg-[#e11d48] border-[#e11d48] text-white shadow-lg'
                            : 'bg-white border-orange-100 text-gray-400 hover:border-[#e11d48] hover:text-[#e11d48]'
                    }`}
                >
                    {tab.label}
                    {!!tab.badge && (
                        <span
                            className={`flex items-center justify-center min-w-4.5 h-4.5 px-1 rounded-full text-[10px] font-black ${
                                activeTab === tab.key
                                    ? 'bg-white text-[#e11d48]'
                                    : 'bg-[#facc15] text-red-900'
                            }`}
                        >
                            {tab.badge}
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
};
