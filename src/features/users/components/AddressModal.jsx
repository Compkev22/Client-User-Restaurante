'use strict';

import { useEffect, useState } from 'react';

import { Modal } from '../../../shared/ui/Modal.jsx';
import { Input } from '../../../shared/ui/Input.jsx';
import { Button } from '../../../shared/ui/Button.jsx';

const EMPTY_FORM = { label: '', address: '', isDefault: false };

export const AddressModal = ({ open, onClose, onSubmit, address, saving }) => {
    const isEdit = Boolean(address?.addressId);

    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (open) {
            setForm({
                label: address?.label || '',
                address: address?.address || '',
                isDefault: address?.isDefault || false,
            });
            setErrors({});
        }
    }, [open, address]);

    const handleChange = (field) => (e) => {
        const value = field === 'isDefault' ? e.target.checked : e.target.value;
        setForm((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const handleSubmit = async () => {
        const result = await onSubmit({
            label: form.label.trim(),
            address: form.address.trim(),
            isDefault: form.isDefault,
        });

        if (result?.fieldErrors) setErrors(result.fieldErrors);
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={isEdit ? 'Editar dirección' : 'Nueva dirección favorita'}
            footer={
                <>
                    <Button variant="ghost" onClick={onClose} disabled={saving}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit} loading={saving}>
                        {isEdit ? 'Guardar cambios' : 'Agregar dirección'}
                    </Button>
                </>
            }
        >
            <div className="space-y-4">
                <Input
                    label="Nombre"
                    placeholder="Ej. Casa, Oficina"
                    value={form.label}
                    onChange={handleChange('label')}
                    error={errors.label}
                    maxLength={30}
                />
                <Input
                    label="Dirección completa"
                    placeholder="Ej. 5ta Calle 10-20, Zona 1, Guatemala"
                    value={form.address}
                    onChange={handleChange('address')}
                    error={errors.address}
                    maxLength={200}
                />
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={form.isDefault}
                        onChange={handleChange('isDefault')}
                        className="w-4 h-4 rounded border-gray-300 text-[#e11d48] focus:ring-[#e11d48]"
                    />
                    Usar como dirección principal
                </label>
            </div>
        </Modal>
    );
};