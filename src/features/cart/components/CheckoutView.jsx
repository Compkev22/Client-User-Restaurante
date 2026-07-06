'use strict';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore, useBranchStore, useOrderRequestStore } from '../../auth/store/clientStore.js';
import { sendInvoice, getProfile } from '../../../shared/api/client.js';

import { TypeStep } from './TypeStep.jsx';
import { PickupStep } from './PickupStep.jsx';
import { DeliveryStep } from './DeliveryStep.jsx';
import { PaymentStep } from './PaymentStep.jsx';
import { BillingStep } from './BillingStep.jsx';
import { ConfirmationStep } from './ConfirmationStep.jsx';
import { CouponStep } from './CouponStep.jsx';

const STEPS = {
    TYPE: 'type',
    PICKUP: 'pickup',
    DELIVERY: 'delivery',
    COUPON: 'coupon',
    PAYMENT: 'payment',
    BILLING: 'billing',
    CONFIRMING: 'confirming',
    DONE: 'done',
};

export const CheckoutView = () => {
    const navigate = useNavigate();
    const cart = useCartStore((s) => s.cart);
    const getCartTotal = useCartStore((s) => s.getCartTotal);
    const clearCart = useCartStore((s) => s.clearCart);
    const selectedBranch = useBranchStore((s) => s.selectedBranch);
    const createOrderRequest = useOrderRequestStore((s) => s.createOrderRequest);

    const [step, setStep] = useState(STEPS.TYPE);
    const [orderType, setOrderType] = useState(null);
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [deliveryLat, setDeliveryLat] = useState(null);
    const [deliveryLng, setDeliveryLng] = useState(null);
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvv, setCardCvv] = useState('');
    const [nit, setNit] = useState('');
    const [billEmail, setBillEmail] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [savedAddresses, setSavedAddresses] = useState([]);

    useEffect(() => {
        if (step === STEPS.DELIVERY) {
            getProfile()
                .then(({ data }) => setSavedAddresses(data.user?.addresses || []))
                .catch(() => setSavedAddresses([]));
        }
    }, [step]);

    if (cart.length === 0 && step !== STEPS.DONE) {
        navigate('/portal/carrito');
        return null;
    }

    const rawTotal = getCartTotal();
    const discountPercentage = appliedCoupon?.discountPercentage || 0;
    const total = rawTotal * (1 - discountPercentage / 100);
    const iva = total - total / 1.12;
    const subtotal = total / 1.12;

    const handleSelectType = (type) => {
        setOrderType(type);
        setError('');
        setStep(type === 'TAKEAWAY' ? STEPS.PICKUP : STEPS.DELIVERY);
    };

    const handleConfirmPickup = () => {
        setError('');
        setStep(STEPS.COUPON);
    };

    const handleConfirmDelivery = () => {
        if (!deliveryAddress.trim()) { setError('Ingresa una direccion de entrega.'); return; }
        if (!deliveryLat || !deliveryLng) { setError('Selecciona la ubicacion en el mapa.'); return; }
        setError('');
        setStep(STEPS.COUPON);
    };

    const handleApplyCoupon = (coupon) => setAppliedCoupon(coupon);
    const handleRemoveCoupon = () => setAppliedCoupon(null);
    const handleConfirmCoupon = () => setStep(STEPS.PAYMENT);

    const handlePay = (valid) => {
        if (!valid) { setError('Completa todos los datos de la tarjeta.'); return; }
        setError('');
        setStep(STEPS.BILLING);
    };

    const handleConfirmBilling = async () => {
        setLoading(true);
        setError('');
        setStep(STEPS.CONFIRMING);

        try {
            const branchId = selectedBranch._id;
            const items = cart.map((item) => ({
                ...(item.tipo === 'Combo' ? { comboId: item._id } : { productoId: item._id }),
                cantidad: item.cantidad,
            }));

            const res = await createOrderRequest({
                branch: branchId,
                orderType,
                deliveryAddress: orderType === 'DELIVERY' ? deliveryAddress : undefined,
                deliveryLat: orderType === 'DELIVERY' ? deliveryLat : undefined,
                deliveryLng: orderType === 'DELIVERY' ? deliveryLng : undefined,
                items,
                couponCode: appliedCoupon ? appliedCoupon.code : undefined,
                nit: nit.trim() || undefined,
                billEmail: billEmail.trim() || undefined,
            });

            if (billEmail.trim() && res?.data?.order) {
                try { await sendInvoice(res.data.order, billEmail.trim()); } catch { }
            }

            clearCart();
            setStep(STEPS.DONE);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al procesar el pago.');
            setStep(STEPS.BILLING);
        } finally {
            setLoading(false);
        }
    };

    const goBack = (target) => { setError(''); setStep(target); };

    if (step === STEPS.TYPE) return <TypeStep onSelect={handleSelectType} />;

    if (step === STEPS.PICKUP) return (
        <PickupStep
            selectedBranch={selectedBranch}
            onConfirm={handleConfirmPickup}
            onBack={() => goBack(STEPS.TYPE)}
            onBranches={() => navigate('/portal/sucursales')}
        />
    );

    if (step === STEPS.DELIVERY) return (
        <DeliveryStep
            address={deliveryAddress}
            savedAddresses={savedAddresses}
            lat={deliveryLat}
            lng={deliveryLng}
            error={error}
            onAddressChange={(v) => { setDeliveryAddress(v); setError(''); }}
            onLocationChange={(lat, lng) => { setDeliveryLat(lat); setDeliveryLng(lng); setError(''); }}
            onConfirm={handleConfirmDelivery}
            onBack={() => goBack(STEPS.TYPE)}
        />
    );

    if (step === STEPS.COUPON) return (
        <CouponStep
            appliedCoupon={appliedCoupon}
            onApply={handleApplyCoupon}
            onRemove={handleRemoveCoupon}
            rawTotal={rawTotal}
            onConfirm={handleConfirmCoupon}
            onBack={() => goBack(orderType === 'DELIVERY' ? STEPS.DELIVERY : STEPS.PICKUP)}
        />
    );

    if (step === STEPS.PAYMENT || step === STEPS.CONFIRMING) return (
        <PaymentStep
            cardNumber={cardNumber} setCardNumber={setCardNumber}
            cardHolder={cardHolder} setCardHolder={setCardHolder}
            cardExpiry={cardExpiry} setCardExpiry={setCardExpiry}
            cardCvv={cardCvv} setCardCvv={setCardCvv}
            error={error} setError={setError}
            isConfirming={step === STEPS.CONFIRMING}
            total={total} subtotal={subtotal} iva={iva}
            onPay={handlePay}
            onBack={() => goBack(STEPS.COUPON)} />
    );

    if (step === STEPS.BILLING) return (
        <BillingStep
            nit={nit} setNit={setNit}
            billEmail={billEmail} setBillEmail={setBillEmail}
            error={error} loading={loading}
            onConfirm={handleConfirmBilling}
            onBack={() => goBack(STEPS.PAYMENT)}
        />
    );

    if (step === STEPS.DONE) return <ConfirmationStep />;

    return null;
};
