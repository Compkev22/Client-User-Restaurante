'use strict';

import { useState } from 'react';
import { Modal } from '../../../shared/ui/Modal.jsx';
import { Input } from '../../../shared/ui/Input.jsx';
import { Button } from '../../../shared/ui/Button.jsx';
import { changePassword } from '../../../shared/api/auth.js';
import { showSuccess, showError } from '../../../shared/utils/toast.js';

export const ChangePasswordModal = ({ open, onClose }) => {
    const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const handleClose = () => {
        setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setErrors({});
        onClose();
    };

    const handleSubmit = async () => {
        const newErrors = {};
        if (!form.currentPassword) newErrors.currentPassword = 'Ingresa tu contraseña actual.';
        if (!form.newPassword || form.newPassword.length < 8) newErrors.newPassword = 'Debe tener al menos 8 caracteres.';
        if (form.newPassword !== form.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden.';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setSaving(true);
        try {
            await changePassword(form.currentPassword, form.newPassword);
            showSuccess('Contraseña actualizada correctamente.');
            handleClose();
        } catch (err) {
            showError(err.response?.data?.message || 'No se pudo cambiar la contraseña.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal open={open} onClose={handleClose} title="Cambiar contraseña" size="sm">
            <div className="space-y-4">
                <Input
                    type="password"
                    label="Contraseña actual"
                    value={form.currentPassword}
                    onChange={handleChange('currentPassword')}
                    error={errors.currentPassword}
                />
                <Input
                    type="password"
                    label="Nueva contraseña"
                    value={form.newPassword}
                    onChange={handleChange('newPassword')}
                    error={errors.newPassword}
                />
                <Input
                    type="password"
                    label="Confirmar nueva contraseña"
                    value={form.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    error={errors.confirmPassword}
                />

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button type="button" variant="ghost" className="flex-1" onClick={handleClose} disabled={saving}>
                        Cancelar
                    </Button>
                    <Button type="button" className="flex-2" loading={saving} onClick={handleSubmit}>
                        Guardar contraseña
                    </Button>
                </div>
            </div>
        </Modal>
    );
};