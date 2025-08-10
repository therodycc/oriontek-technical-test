import AddressModal from "@/components/common/AddressModal";
import UserModal from "@/components/common/UserModal";
import UserTable from "@/components/common/UserTable";
import {
  createAddress,
  removeAddress,
  updateAddress,
} from "@/redux/slices/address/address.actions";
import {
  createClient,
  getAllClient,
  removeClient,
  updateClient,
} from "@/redux/slices/clients/client.actions";
import { clientSelector } from "@/redux/slices/clients/client.selector";
import { setClientState } from "@/redux/slices/clients/client.slice";
import { useDispatch, useSelector } from "@/redux/store";

import { AddressFormData, Client, UserFormData } from "@/types";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";

export const ClientsPage = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Client | null>(null);
  const clients = useSelector(clientSelector.getAllClients);
  const selectedClient = useSelector(clientSelector.getSelectedClient);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllClient());
  }, [dispatch]);

  const handleAddUser = () => {
    setEditingUser(null);
    setIsUserModalOpen(true);
  };

  const handleEditUser = (user: Client) => {
    setEditingUser(user);
    setIsUserModalOpen(true);
  };

  const handleSaveUser = (userData: UserFormData) => {
    editingUser
      ? dispatch(updateClient(editingUser.uuid, userData, () => {}))
      : dispatch(createClient(userData, () => {}));
  };

  const handleDeleteUser = (userUuid: string) => {
    dispatch(removeClient(userUuid));
  };

  const handleManageAddresses = (client: Client) => {
    dispatch(
      setClientState({
        selectedClientUuid: client.uuid,
      })
    );
    setIsAddressModalOpen(true);
  };

  const handleAddAddress = (
    clientUuid: string,
    addressData: AddressFormData
  ) => {
    dispatch(createAddress(clientUuid, addressData));
  };

  const handleUpdateAddress = (
    addressUuid: string,
    addressData: AddressFormData
  ) => {
    dispatch(updateAddress(addressUuid, addressData, () => {}));
  };

  const handleDeleteAddress = (addressUuid: string) => {
    dispatch(removeAddress(addressUuid));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Users className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">
              Gestión de Usuarios y Direcciones
            </h1>
          </div>
          <p className="text-gray-600">Bienvenido a oriontek</p>
        </div>

        <UserTable
          clients={clients || []}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
          onManageAddresses={handleManageAddresses}
          onAddUser={handleAddUser}
        />

        <UserModal
          isOpen={isUserModalOpen}
          onClose={() => setIsUserModalOpen(false)}
          onSave={handleSaveUser}
          editUser={editingUser}
        />

        {selectedClient && (
          <AddressModal
            isOpen={isAddressModalOpen}
            onClose={() => setIsAddressModalOpen(false)}
            onAddAddress={handleAddAddress}
            onUpdateAddress={handleUpdateAddress}
            onDeleteAddress={handleDeleteAddress}
          />
        )}
      </div>
    </div>
  );
};
