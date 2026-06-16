'use strict';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '../../../shared/components/ui/Modal.jsx';
import { Input } from '../../../shared/components/ui/Input.jsx';
import { Button } from '../../../shared/components/ui/Button.jsx';
import { useCouponStore } from '../../auth/store/clientStore.js';
import { showSuccess, showError } from '../../../shared/utils/toast.js';

export const CouponFormModal = ({ open, onClose, coupon }) => {
    const isEdit = Boolean(coupon?._id);

    const createCoupon = useCouponStore((s) => s.createCoupon);
    const updateCoupon = useCouponStore((s) => s.updateCoupon);

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

    useEffect(() => {
        if (open) {
            reset({
                code: coupon?.code || '',
                discountPercentage: coupon?.discountPercentage || '',
                expirationDate: coupon?.expirationDate
                    ? new Date(coupon.expirationDate).toISOString().slice(0, 10)
                    : '',
                usageLimit: coupon?.usageLimit || 10,
            });
        }
    }, [open, coupon, reset]);

    const onSubmit = async (data) => {
        try {
            const payload = {
                code: data.code,
                discountPercentage: Number(data.discountPercentage),
                expirationDate: data.expirationDate,
                usageLimit: Number(data.usageLimit),
            };

            if (isEdit) {
                await updateCoupon(coupon._id, payload);
                showSuccess('Cupón actualizado correctamente');
            } else {
                await createCoupon(payload);
                showSuccess('Cupón creado exitosamente');
            }

            onClose();
        } catch (err) {
            showError(err.response?.data?.message || 'Error al guardar el cupón');
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={isEdit ? 'Editar Cupón' : 'Nuevo Cupón'}
            footer={
                <>
                    <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                    <Button onClick={handleSubmit(onSubmit)} loading={isSubmitting}>
                        {isEdit ? 'Guardar Cambios' : 'Crear Cupón'}
                    </Button>
                </>
            }
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <Input
                    label="Código"
                    placeholder="PROMO10"
                    maxLength={15}
                    error={errors.code?.message}
                    {...register('code', {
                        required: 'El código es obligatorio',
                        pattern: { value: /^[A-Za-z0-9]+$/, message: 'Solo letras y números' },
                        minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                        maxLength: { value: 15, message: 'Máximo 15 caracteres' },
                    })}
                />

                <Input
                    label="Porcentaje de descuento"
                    type="number"
                    placeholder="10"
                    error={errors.discountPercentage?.message}
                    {...register('discountPercentage', {
                        required: 'El porcentaje es obligatorio',
                        min: { value: 1, message: 'Mínimo 1%' },
                        max: { value: 100, message: 'Máximo 100%' },
                    })}
                />

                <Input
                    label="Fecha de expiración"
                    type="date"
                    error={errors.expirationDate?.message}
                    {...register('expirationDate', { required: 'La fecha es obligatoria' })}
                />

                <Input
                    label="Límite de usos"
                    type="number"
                    placeholder="10"
                    error={errors.usageLimit?.message}
                    {...register('usageLimit', {
                        required: 'El límite es obligatorio',
                        min: { value: 1, message: 'Mínimo 1' },
                    })}
                />
            </form>
        </Modal>
    );
};