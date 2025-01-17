"use client";

import { Button, Tabs, TabsRef } from "flowbite-react";
import { useRef, useState } from "react";
import { HiAdjustments, HiClipboardList, HiDotsVertical, HiUserCircle } from "react-icons/hi";
import { MdDashboard, MdLiveTv } from "react-icons/md";
import { Dropdown } from "flowbite-react";
import ModernWrapperModal from "@/components/common/ModernWrapperModal";
import UpdateEvent from "@/components/forms/UpdateEvent";
import DeleteEvent from "@/components/forms/DeleteEvent";

const EventPage = () => {
  const tabsRef = useRef(null);
  const [, setActiveTab] = useState(0);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleUpdate = () => {
    setOpenModal(true);
  }

  return (
    <>
      <div className="flex flex-wrap gap-4 float-end mr-20">

        <Dropdown
          label={<HiDotsVertical className="w-5 h-5 cursor-pointer" />}
          inline={true}
          arrowIcon={false}
        >
          <Dropdown.Item onClick={() => setOpenUpdateModal(true)}>Update</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => setOpenDeleteModal(true)} className="text-red-600">Delete</Dropdown.Item>
        </Dropdown>
      </div>
      <ModernWrapperModal openModal={openUpdateModal} setOpenModal={setOpenUpdateModal}>
        <UpdateEvent />
      </ModernWrapperModal>
      <ModernWrapperModal openModal={openDeleteModal} setOpenModal={setOpenDeleteModal}>
        <DeleteEvent setOpenModal={setOpenDeleteModal} />
      </ModernWrapperModal>
    </>
  );
};

export default EventPage;
