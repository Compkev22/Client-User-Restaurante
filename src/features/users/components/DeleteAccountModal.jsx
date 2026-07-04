'use strict';

import { useState } from 'react';
import { Modal } from '../../../shared/ui/Modal.jsx';
import { Input } from '../../../shared/ui/Input.jsx';
import { Button } from '../../../shared/ui/Button.jsx';
import { deleteAccountRequest } from '../../../shared/api/auth.js';
import { deactivateAccount } from '../../../shared/api/client.js';
import { showSuccess, showError } from '../../../shared/utils/toast.js';

export const DeleteAccountModal = ({ open, onClose, onDeleted }) => {
    const [password, setPassword] = useState('');
    const [confirmText, setConfirmText] = useState('');
    const [errors, setErrors] = useState({});
    const [deleting, setDeleting] = useState(false);

    const handleClose = () => {
        setPassword('');
        setConfirmText('');
        setErrors({});
        onClose();
    };

    const handleDelete = async () => {
        const newErrors = {};
        if (!password) newErrors.password = 'Ingresa tu contraseña para confirmar.';
        if (confirmText.trim().toUpperCase() !== 'ELIMINAR') {
            newErrors.confirmText = 'Escribe ELIMINAR para confirmar.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setDeleting(true);
        try {
            // 1. Desactiva la identidad en el Auth-Service (bloquea futuros logins)
            await deleteAccountRequest(password);
            // 2. Desactiva el perfil local (preserva historial de pedidos/reservas)
            await deactivateAccount();

            showSuccess('Tu cuenta ha sido eliminada.');
            handleClose();
            onDeleted?.();
        } catch (err) {
            showError(err.response?.data?.message || 'No se pudo eliminar la cuenta.');
        } finally {
            setDeleting(false);
        }
    };

    return (
        <Modal open={open} onClose={handleClose} title="Eliminar cuenta" size="sm">
            <div className="space-y-4">
                <p className="text-sm text-gray-500">
                    Esta acción es <span className="font-black text-red-600">permanente</span>. No podrás iniciar sesión de nuevo con esta cuenta.
                </p>

                <Input
                    type="password"
                    label="Confirma tu contraseña"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    error={errors.password}
                />
                <Input
                    label='Escribe "ELIMINAR" para confirmar'
                    value={confirmText}
                    onChange={(e) => {
                        setConfirmText(e.target.value);
                        if (errors.confirmText) setErrors((prev) => ({ ...prev, confirmText: undefined }));
                    }}
                    error={errors.confirmText}
                />

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button type="button" variant="ghost" className="flex-1" onClick={handleClose} disabled={deleting}>
                        Cancelar
                    </Button>
                    <Button type="button" variant="danger" className="flex-2" loading={deleting} onClick={handleDelete}>
                        Eliminar mi cuenta
                    </Button>
                </div>
            </div>
        </Modal>
    );
};