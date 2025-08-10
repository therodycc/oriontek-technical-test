import CustomModal from "@/components/common/Modal";
import { clientSelector } from "@/redux/slices/clients/client.selector";
import { useSelector } from "@/redux/store";
import { Address, AddressFormData } from "@/types";
import { Edit2, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAddress: (userId: string, addressData: AddressFormData) => void;
  onUpdateAddress: (addressId: string, addressData: AddressFormData) => void;
  onDeleteAddress: (addressId: string) => void;
}

export default function AddressModal({
  isOpen,
  onClose,
  onAddAddress,
  onUpdateAddress,
  onDeleteAddress,
}: AddressModalProps) {
  const [formData, setFormData] = useState<AddressFormData>({
    address: "",
    province: "",
    name: "",
  });
  const [errors, setErrors] = useState<Partial<AddressFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [showForm, setShowForm] = useState(false);

  const selectedClient = useSelector(clientSelector.getSelectedClient);

  useEffect(() => {
    if (isOpen) {
      setShowForm(false);
      setEditingAddress(null);
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setFormData({
      address: "",
      province: "",
      name: "",
    });
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<AddressFormData> = {};

    if (!formData.address.trim()) {
      newErrors.address = "La dirección es requerida";
    }

    if (!formData.province.trim()) {
      newErrors.province = "La ciudad es requerida";
    }

    if (!formData.name.trim()) {
      newErrors.name = "El país es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (editingAddress) {
        await onUpdateAddress(editingAddress.uuid, formData);
      } else {
        await onAddAddress(selectedClient!.uuid, formData);
      }
      setShowForm(false);
      setEditingAddress(null);
      resetForm();
    } catch (error) {
      console.error("Error saving address:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      address: address.address,
      province: address.province,
      name: address?.name || "",
    });
    setShowForm(true);
    setErrors({});
  };

  const handleDelete = async (addressId: string) => {
    if (window.confirm("¿Está seguro de que desea eliminar esta dirección?")) {
      await onDeleteAddress(addressId);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof AddressFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAddress(null);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <CustomModal
      title={`Gestionar Direcciones de ${selectedClient?.completeName}`}
      isOpen={isOpen}
      onClose={onClose}
    >
      {/* Add Address Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="mb-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Agregar Nueva Dirección
        </button>
      )}

      {/* Address Form */}
      {showForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingAddress ? "Editar Dirección" : "Agregar Nueva Dirección"}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="md:col-span-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Dirección
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Ingrese la dirección"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="province"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Ciudad
                </label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.province ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Ingrese la ciudad"
                />
                {errors.province && (
                  <p className="mt-1 text-sm text-red-600">{errors.province}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  País
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Ingrese el país"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opaprovince-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting
                  ? "Guardando..."
                  : editingAddress
                  ? "Actualizar Dirección"
                  : "Agregar Dirección"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Address List */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">
          Direcciones Actuales ({selectedClient?.addresses?.length})
        </h3>
        {selectedClient?.addresses?.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No se encontraron direcciones. Agregue su primera dirección arriba.
          </p>
        ) : (
          selectedClient?.addresses.map((address) => (
            <div
              key={address.uuid}
              className="p-4 bg-white border border-gray-200 rounded-lg"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{address.address}</p>
                  <p className="text-gray-600">
                    {address.province}, {address.name}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(address)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    title="Editar dirección"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(address.uuid)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Eliminar dirección"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </CustomModal>
  );
}
