'use strict';

import { useEffect, useState } from 'react';

import { useAuthStore } from '../../auth/store/authStore.js';
import { getProfile, updateProfile } from '../../../shared/api/client.js';
import { formatDate, getInitials } from '../../../shared/utils/formatters.js';
import { showSuccess, showError } from '../../../shared/utils/toast.js';

import { Button } from '../../../shared/ui/Button.jsx';
import { Spinner } from '../../../shared/ui/Spinner.jsx';
import { ProfileModal } from './ProfileModal.jsx';
import { AddressCard } from './AddressCard.jsx';
import { AddressModal } from './AddressModal.jsx';

export const ProfileView = () => {
    const logout      = useAuthStore((s) => s.logout);
    const updateUser  = useAuthStore((s) => s.updateUser);

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving]   = useState(false);
    const [form, setForm]       = useState({ UserName: '', UserSurname: '', phone: '' });
    const [errors, setErrors]   = useState({});

    const [addressModalOpen, setAddressModalOpen] = useState(false);
    const [editingIndex, setEditingIndex]          = useState(null); // null = nueva
    const [savingAddress, setSavingAddress]         = useState(false);
    const [deletingIndex, setDeletingIndex]         = useState(null);

    const addresses = profile?.addresses || [];

    useEffect(() => {
        let active = true;

        (async () => {
            try {
                const { data } = await getProfile();
                if (!active) return;
                setProfile(data.user);
                setForm({
                    UserName: data.user.UserName || '',
                    UserSurname: data.user.UserSurname || '',
                    phone: data.user.phone || '',
                });
            } catch (err) {
                showError('No se pudo cargar tu perfil');
            } finally {
                if (active) setLoading(false);
            }
        })();

        return () => { active = false; };
    }, []);

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const handleCancel = () => {
        if (!profile) return;
        setForm({
            UserName: profile.UserName || '',
            UserSurname: profile.UserSurname || '',
            phone: profile.phone || '',
        });
        setErrors({});
        setEditing(false);
    };

    const handleSave = async () => {
        setSaving(true);
        setErrors({});

        try {
            const { data } = await updateProfile(profile.uid, {
                UserName: form.UserName.trim(),
                UserSurname: form.UserSurname.trim(),
                phone: form.phone.trim(),
            });

            setProfile(data.data);
            updateUser({
                firstName: data.data.UserName,
                lastName: data.data.UserSurname,
                phone: data.data.phone,
            });

            showSuccess('Perfil actualizado correctamente');
            setEditing(false);
        } catch (err) {
            const apiErrors = err.response?.data?.error;
            if (Array.isArray(apiErrors)) {
                const fieldErrors = {};
                apiErrors.forEach(({ field, message }) => { fieldErrors[field] = message; });
                setErrors(fieldErrors);
            }
            showError(err.response?.data?.message || 'Error actualizando el perfil');
        } finally {
            setSaving(false);
        }
    };

    const openAddAddress = () => {
        setEditingIndex(null);
        setAddressModalOpen(true);
    };

    const openEditAddress = (index) => {
        setEditingIndex(index);
        setAddressModalOpen(true);
    };

    const saveAddresses = async (newAddresses) => {
        const { data } = await updateProfile(profile.uid, { addresses: newAddresses });
        setProfile(data.data);
        return data;
    };

    const handleSubmitAddress = async (payload) => {
        setSavingAddress(true);
        try {
            const next = [...addresses];

            if (payload.isDefault) {
                next.forEach((addr) => { addr.isDefault = false; });
            }

            if (editingIndex === null) {
                next.push(payload);
            } else {
                next[editingIndex] = payload;
            }

            await saveAddresses(next);
            showSuccess(editingIndex === null ? 'Dirección agregada correctamente' : 'Dirección actualizada correctamente');
            setAddressModalOpen(false);
            return {};
        } catch (err) {
            const apiErrors = err.response?.data?.error;
            if (Array.isArray(apiErrors)) {
                const fieldErrors = {};
                apiErrors.forEach(({ field, message }) => {
                    // los errores de express-validator llegan como "addresses[0].label"
                    const cleanField = field?.replace(/^addresses\[\d+\]\./, '');
                    fieldErrors[cleanField] = message;
                });
                showError(err.response?.data?.message || 'Error guardando la dirección');
                return { fieldErrors };
            }
            showError(err.response?.data?.message || 'Error guardando la dirección');
            return {};
        } finally {
            setSavingAddress(false);
        }
    };

    const handleDeleteAddress = async (index) => {
        const target = addresses[index];
        if (!window.confirm(`¿Eliminar la dirección "${target.label}"?`)) return;

        setDeletingIndex(index);
        try {
            const next = addresses.filter((_, i) => i !== index);
            await saveAddresses(next);
            showSuccess('Dirección eliminada correctamente');
        } catch (err) {
            showError(err.response?.data?.message || 'Error eliminando la dirección');
        } finally {
            setDeletingIndex(null);
        }
    };

    if (loading) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-20 flex justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!profile) return null;

    return (
        <div className="max-w-2xl mx-auto px-4 py-10 animate-fadeIn">
            <h1 className="text-2xl font-black text-[#7f1d1d] mb-6">Mi Perfil</h1>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-[#facc15] flex items-center justify-center text-red-900 font-black text-2xl shadow-md">
                        {getInitials(profile.UserName, profile.UserSurname)}
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-gray-800">
                            {profile.UserName} {profile.UserSurname}
                        </h2>
                        <p className="text-gray-500 text-sm">{profile.UserEmail}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                            {profile.role}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 text-sm">
                    <div>
                        <p className="text-gray-400 font-medium">Estado</p>
                        <p className="font-bold text-gray-700">{profile.UserStatus}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 font-medium">Miembro desde</p>
                        <p className="font-bold text-gray-700">{formatDate(profile.UserCreatedAt)}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-black text-[#a16207] uppercase tracking-wide">
                        Información personal
                    </h3>
                    {!editing && (
                        <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                            Editar
                        </Button>
                    )}
                </div>

                {editing ? (
                    <ProfileModal
                        form={form}
                        errors={errors}
                        saving={saving}
                        onChange={handleChange}
                        onCancel={handleCancel}
                        onSave={handleSave}
                    />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-gray-400 font-medium">Nombre</p>
                            <p className="font-bold text-gray-700">{profile.UserName}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 font-medium">Apellido</p>
                            <p className="font-bold text-gray-700">{profile.UserSurname}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 font-medium">Teléfono</p>
                            <p className="font-bold text-gray-700">{profile.phone || 'No registrado'}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 font-medium">Correo</p>
                            <p className="font-bold text-gray-700">{profile.UserEmail}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-black text-[#a16207] uppercase tracking-wide">
                        Direcciones favoritas
                    </h3>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={openAddAddress}
                        disabled={addresses.length >= 2}
                        title={addresses.length >= 2 ? 'Ya tienes 2 direcciones guardadas' : ''}
                    >
                        Agregar
                    </Button>
                </div>

                {addresses.length > 0 ? (
                    <div className="space-y-3">
                        {addresses.map((address, index) => (
                            <AddressCard
                                key={address.addressId || index}
                                address={address}
                                onEdit={() => openEditAddress(index)}
                                onDelete={() => handleDeleteAddress(index)}
                                deleting={deletingIndex === index}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 text-sm text-center py-4">
                        Aún no tienes direcciones favoritas guardadas.
                    </p>
                )}
            </div>

            <button
                onClick={logout}
                className="w-full border-2 border-[#e11d48] text-[#e11d48] hover:bg-red-50 font-black py-3 rounded-xl transition-all"
            >
                Cerrar Sesión
            </button>

            <AddressModal
                open={addressModalOpen}
                onClose={() => setAddressModalOpen(false)}
                onSubmit={handleSubmitAddress}
                address={editingIndex !== null ? addresses[editingIndex] : null}
                saving={savingAddress}
            />
        </div>
    );
};