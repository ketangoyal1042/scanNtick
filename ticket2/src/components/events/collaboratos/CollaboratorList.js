import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import {
  getEventCollaborator,
  removeEventCollaborator,
} from "../../../../api/event";
import RemoveCollaborator from "./RemoveCollaborator";
import ModernWrapperModal from "@/components/common/ModernWrapperModal";
import { useDispatch, useSelector } from "react-redux";
import { removeCollaborator, setCollaborator } from "@/store/slices/eventCollaboratorSlice";
import { toast } from "react-toastify";

const CollaboratorList = ({ EventId }) => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [RemoveCollabDialog, setRemoveCollabDialog] = useState(false);
  const collaboratorList = useSelector(
    (state) => state?.collaborator?.collaboratorList
  );
  useEffect(() => {
    getCollaboratorList();
  }, [EventId]);

  const getCollaboratorList = async () => {
    const UserList = await getEventCollaborator(EventId);
    if (UserList) {
      dispatch(setCollaborator(UserList?.subAdmins));
    }
  };

  const handleRemoveCollab = async (eid, uid) => {
    const payload = {
      eventId: eid,
      userId: uid,
    };
    let response = await removeEventCollaborator(payload);
    if (!response.success) {
      console.log(response.message);
      toast.error(response.message);
      return;
    }
    toast.success(response?.message);
    dispatch(removeCollaborator(uid));
    setRemoveCollabDialog(false);
  };

  const handleRemoveCollabDialog = (user) => {
    setSelectedUser(user);
    setRemoveCollabDialog(true);
  };
  return (
    <>
      <div className="">
        <h3 className="p-3 text-3xl text-center my-5 font-bold">
          Collaborators/SubAdmins
        </h3>
      </div>
      <div className="listing">
        <div className="overflow-x-auto ">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Sr No.</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Email Id</Table.HeadCell>
              <Table.HeadCell>Mobile No.</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {collaboratorList?.map((user, index) => (
                <>
                  <Table.Row className="whitespace-nowrap font-semibold text-gray-900 dark:text-white">
                    <Table.Cell>{++index}</Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-semibold text-gray-900 dark:text-white">
                      {user?.name}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-semibold text-gray-900 dark:text-white">{user?.email}</Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-semibold text-gray-900 dark:text-white">{user?.phone}</Table.Cell>
                    <Table.Cell>
                      <a
                        href="#"
                        className="font-bold transition-colors hover:text-purple-700 text-purple-600 hover:underline dark:text-purple-700"
                        onClick={() => handleRemoveCollabDialog(user)}
                      >
                        Remove
                      </a>
                    </Table.Cell>
                  </Table.Row>
                </>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
      <ModernWrapperModal
        openModal={RemoveCollabDialog}
        setOpenModal={setRemoveCollabDialog}
      >
        <RemoveCollaborator
          setOpenModal={setRemoveCollabDialog}
          eventId={EventId}
          user={selectedUser}
          handleRemoveCollab={handleRemoveCollab}
        />
      </ModernWrapperModal>
    </>
  );
};

export default CollaboratorList;
