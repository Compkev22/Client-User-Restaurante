'use strict';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBranchStore, useCartStore } from '../../auth/store/clientStore.js';
import { getMenu } from '../../../shared/api/client.js';
import { showSuccess, showError } from '../../../shared/utils/toast.js';
import { HomeHero } from './HomeHero.jsx';
import { HomeQuickLinks } from './HomeQuickLinks.jsx';
import { HomeCategoryChips } from './HomeCategoryChips.jsx';
import { HomeFeaturedMenu } from './HomeFeaturedMenu.jsx';

export const HomeView = () => {
    const navigate = useNavigate();
    const { selectedBranch } = useBranchStore();
    const { addToCart } = useCartStore();

    const [menuItems, setMenuItems] = useState([]);
    const [loadingMenu, setLoadingMenu] = useState(false);

    const categories = [...new Set(menuItems.map((i) => i.category).filter(Boolean))];

    useEffect(() => {
        if (!selectedBranch) {
            setMenuItems([]);
            return;
        }
        const fetchMenu = async () => {
            setLoadingMenu(true);
            try {
                const { data } = await getMenu(selectedBranch._id);
                setMenuItems(data.menu || []);
            } catch {
                setMenuItems([]);
            } finally {
                setLoadingMenu(false);
            }
        };
        fetchMenu();
    }, [selectedBranch?._id]);

    const handleAddToCart = (item) => {
        const result = addToCart({
            _id: item._id,
            name: item.name,
            precio: item.price,
            tipo: item.type,
            category: item.category,
            branchId: selectedBranch._id,
            cantidad: 1,
        });
        if (result?.conflict) {
            showError('Ya tienes productos de otra sucursal en el carrito. Vacía el carrito primero.');
        } else {
            showSuccess(`${item.name} agregado al carrito`);
        }
    };

    return (
        <div className="animate-fadeIn bg-[#fdfaf5] min-h-screen">
            <HomeHero selectedBranch={selectedBranch} />
            <HomeQuickLinks />

            {!selectedBranch && (
                <div className="max-w-6xl mx-auto px-4 mt-10">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="text-sm text-yellow-700 font-bold">
                            Elige una sucursal para ver su menú y empezar a pedir.
                        </p>
                        <button
                            onClick={() => navigate('/portal/sucursales')}
                            className="bg-[#e11d48] hover:bg-red-700 text-white font-black px-5 py-2 rounded-xl text-sm shadow transition-colors"
                        >
                            Ver sucursales
                        </button>
                    </div>
                </div>
            )}

            {selectedBranch && (
                <>
                    <HomeCategoryChips categories={categories} />
                    <HomeFeaturedMenu
                        branchName={selectedBranch.name}
                        menuItems={menuItems}
                        loading={loadingMenu}
                        onAddToCart={handleAddToCart}
                        onViewAll={() => navigate('/portal/menu')}
                    />
                </>
            )}
        </div>
    );
};