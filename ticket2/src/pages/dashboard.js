"use client";
import WrapperModal from "@/components/common/WrapperModal";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import CreateEvent from "@/components/forms/CreateEvent";
import TopFiveEvents from "@/components/TopFiveEvents";
import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import TicketGenerate from "@/components/forms/TicketGenerate";
import { getAllEvents } from "../../api/event";

const dashboard = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [EventList, setEventList] = useState([]);

  const [openTicketFormModal, setOpenTicketFormModal] = useState(false);
  const handleOpen = () => setOpen(true);

  const openTicketForm = async () => {
    setOpenTicketFormModal(true);
    try {
      const response = await getAllEvents();
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
            className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            onClick={() => router.push("/manage-events")}
          >
            Manage Events
          </Button>
          <Button variant="outlined" onClick={openTicketForm}>
            Create Tickets
          </Button>
          <Button variant="outlined">Scan Tickets</Button>
        </div>
      </Stack>
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 text-center">
        <Button
          className="text-center text-base/7 font-semibold text-indigo-600"
          onClick={handleOpen}
        >
          Create New Event
        </Button>
        <p className="mx-auto mt-2 max-w-lg text-balance text-center text-3xl font-semibold tracking-tight text-gray-950 sm:text-5xl"></p>
        <WrapperModal open={open} setOpen={setOpen}>
          <CreateEvent />
        </WrapperModal>
        <h1 className="m-5 p-3 font-bold text-3xl text-gray-800">
          5 Upcoming Events
        </h1>
        <TopFiveEvents />
        <TicketGenerate
          openModal={openTicketFormModal}
          setOpenModal={setOpenTicketFormModal}
          EventList={EventList}
        />
      </div>
    </div>
  );
};

export default dashboard;
