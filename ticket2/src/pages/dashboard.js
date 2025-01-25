"use client";
import WrapperModal from "@/components/common/WrapperModal";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import CreateEvent from "@/components/forms/CreateEvent";
import TopFiveEvents from "@/components/TopFiveEvents";
import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import TicketGenerate from "@/components/forms/TicketGenerate";
import { getActiveEvents } from "../../api/event";
import { toast } from "react-toastify";
import ScanTicket from "@/components/ticket/ScanTicket";
import ModernWrapperModal from "@/components/common/ModernWrapperModal";

const dashboard = () => {
  const router = useRouter();
  const [eventopen, setEventOpen] = useState(false);
  const [scanopen, setScanOpen] = useState(false);
  const [EventList, setEventList] = useState([]);

  const [openTicketFormModal, setOpenTicketFormModal] = useState(false);
  const handleOpenEvent = () => setEventOpen(true);

  const openTicketForm = async () => {
    setOpenTicketFormModal(true);
    try {
      const response = await getActiveEvents();
      const { events } = response;
      setEventList(events);
    } catch (error) {
      toast.error(
        error.message ||
        "Something went wrong fetching the Events. Please try again."
      );
    }
  };

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <Stack spacing={8} direction="row">
        <div className="flex justify-center gap-3">
          <Button
            className=""
            onClick={() => router.push("/manage-events")}
          >
            Manage Events
          </Button>
          <Button variant="outlined" onClick={openTicketForm}>
            Create Tickets
          </Button>
          <Button variant="outlined" onClick={() => setScanOpen(true)}>Scan Tickets</Button>
        </div>
      </Stack>
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 text-center">
        <Button
          className="text-center text-base/7 font-semibold text-indigo-600"
          onClick={handleOpenEvent}
        >
          Create New Event
        </Button>
        <p className="mx-auto mt-2 max-w-lg text-balance text-center text-3xl font-semibold tracking-tight text-gray-950 sm:text-5xl"></p>
        <WrapperModal open={eventopen} setOpen={setEventOpen}>
          <CreateEvent setOpen={setEventOpen} />
        </WrapperModal>
        <h1 className="m-5 p-3 font-bold text-3xl text-gray-800">
          5 Upcoming Events
        </h1>
        <TopFiveEvents />

        {/* Modal */}
        <TicketGenerate
          openModal={openTicketFormModal}
          setOpenModal={setOpenTicketFormModal}
          EventList={EventList}
        />
        <ModernWrapperModal openModal={scanopen} setOpenModal={setScanOpen}>
          <ScanTicket
            openModal={scanopen}
            setOpenModal={setScanOpen}
          />
        </ModernWrapperModal>
      </div>
    </div>
  );
};

export default dashboard;
