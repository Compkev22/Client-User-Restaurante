'use strict';

import { Button } from '../../../shared/ui/Button.jsx';
import { Input } from '../../../shared/ui/Input.jsx';

export const ProfileModal = ({
    form,
    errors,
    saving,
    onChange,
    onCancel,
    onSave,
}) => {
    return (
        <div className="space-y-4">
            <Input
                label="Nombre"
                value={form.UserName}
                onChange={onChange('UserName')}
                error={errors.UserName}
                maxLength={100}
            />
            <Input
                label="Apellido"
                value={form.UserSurname}
                onChange={onChange('UserSurname')}
                error={errors.UserSurname}
                maxLength={100}
            />
            <Input
                label="Teléfono"
                value={form.phone}
                onChange={onChange('phone')}
                error={errors.phone}
                placeholder="Ej. 5555-5555"
            />

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                    type="button"
                    variant="ghost"
                    className="flex-1"
                    onClick={onCancel}
                    disabled={saving}
                >
                    Cancelar
                </Button>
                <Button
                    type="button"
                    className="flex-2"
                    loading={saving}
                    onClick={onSave}
                >
                    Guardar cambios
                </Button>
            </div>
        </div>
    );
};
