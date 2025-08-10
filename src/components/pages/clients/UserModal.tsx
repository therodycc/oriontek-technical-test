import CustomModal from "@/components/common/Modal";
import { Client, UserFormData } from "@/types";
import React, { useEffect, useState } from "react";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: UserFormData) => void;
  editUser?: Client | null;
}

export default function UserModal({
  isOpen,
  onClose,
  onSave,
  editUser,
}: UserModalProps) {
  const [formData, setFormData] = useState<UserFormData>({
    completeName: "",
    identity: "",
    email: "",
    gender: "male",
  });
  const [errors, setErrors] = useState<Partial<UserFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (editUser) {
        setFormData({
          completeName: editUser.completeName,
          identity: editUser.identity,
          email: editUser.email,
          gender: editUser.gender,
        });
      } else {
        setFormData({
          completeName: "",
          identity: "",
          email: "",
          gender: "male",
        });
      }
      setErrors({});
    }
  }, [isOpen, editUser]);

  const validateForm = (): boolean => {
    const newErrors: Partial<UserFormData> = {};

    if (!formData.completeName.trim()) {
      newErrors.completeName = "El nombre es requerido";
    }

    if (!formData.identity.trim()) {
      newErrors.identity = "La cédula es requerida";
    } else if (!/^\d{3}-\d{7}-\d{1}$/.test(formData.identity)) {
      newErrors.identity = "La cédula debe seguir el formato: 402-2323342-4";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Por favor ingrese un email válido";
    }

    if (!formData?.gender.trim()) {
      newErrors.gender = "Por favor seleccione el género";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error saving user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof UserFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (!isOpen) return null;

  return (
    <CustomModal
      title={editUser ? "Editar Usuario" : "Agregar Nuevo Usuario"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nombre Completo *
            </label>
            <input
              type="text"
              id="completeName"
              name="completeName"
              value={formData.completeName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.completeName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Juan"
            />
            {errors.completeName && (
              <p className="mt-1 text-sm text-red-600">{errors.completeName}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="identity"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Cédula *
            </label>
            <input
              type="text"
              id="identity"
              name="identity"
              value={formData.identity}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.identity ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="402-2323342-4"
              maxLength={13}
            />
            {errors.identity && (
              <p className="mt-1 text-sm text-red-600">{errors.identity}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-4">
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Género *
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.gender ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Seleccione género</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="juan@ejemplo.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
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
              : editUser
              ? "Actualizar Usuario"
              : "Crear Usuario"}
          </button>
        </div>
      </form>
    </CustomModal>
  );
}
