import AddressModal from "@/components/pages/clients/AddressModal";

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
import { useEffect, useState } from "react";
import UserModal from "./UserModal";
import UserTable from "./UserTable";

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
    <div>
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
  );
};
