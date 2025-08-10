import React from "react";
import { Edit2, Trash2, MapPin, Plus } from "lucide-react";
import { Client } from "@/types";
import { Column, DynamicTable } from "@/components/common/DynamicTable";

interface UserTableProps {
  clients: Client[];
  onEditUser: (user: Client) => void;
  onDeleteUser: (userId: string) => void;
  onManageAddresses: (user: Client) => void;
  onAddUser: () => void;
}

const getGenderText = (gender: string) => ({
  male:"Masculino",
  female:"Femenino"
})?.[gender];

export default function UserTable({
  clients,
  onEditUser,
  onDeleteUser,
  onManageAddresses,
  onAddUser,
}: UserTableProps) {
  const handleDelete = (userId: string) => {
    if (
      window.confirm(
        `¿Está seguro de que desea eliminar a este usuario? Esto también eliminará todas las direcciones asociadas.`
      )
    ) {
      onDeleteUser(userId);
    }
  };

  const columns: Column<Client>[] = [
    {
      key: "completeName",
      label: "Nombre Completo",
      render: (u) => <span className="font-medium">{u.completeName}</span>,
    },
    { key: "identity", label: "Cédula" },
    { key: "email", label: "Correo" },
    {
      key: "gender",
      label: "Género",
      render: (u) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          {getGenderText(u!.gender)}
        </span>
      ),
    },
    {
      key: "addresses",
      label: "Direcciones",
      render: (u) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {u?.addresses?.length}{" "}
          {u?.addresses?.length === 1 ? "dirección" : "direcciones"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Acciones",
      align: "right",
      render: (u) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onManageAddresses(u)}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
            title="Gestionar direcciones"
          >
            <MapPin size={14} />
            Direcciones
          </button>
          <button
            onClick={() => onEditUser(u)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
            title="Editar usuario"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => handleDelete(u.uuid)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-md"
            title="Eliminar usuario"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Gestión de Usuarios
        </h2>
        <button
          onClick={onAddUser}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={16} />
          Agregar Usuario
        </button>
      </div>

      <DynamicTable
        columns={columns}
        data={clients}
        rowKey={(u) => u.uuid}
        emptyMessage="No se encontraron usuarios"
      />
    </div>
  );
}
