"use client";

import { Button, Tabs, TabsRef } from "flowbite-react";
import { useRef, useState } from "react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard, MdLiveTv } from "react-icons/md";
import { getAllEvents } from "../../api/event";
import UpcomingEventList from "@/components/events/UpcomingEventList";
import WrapperModal from "@/components/common/WrapperModal";
import CreateEvent from "@/components/forms/CreateEvent";
import PastEventList from "@/components/events/PastEventList";

const ManageEvent = () => {
  const tabsRef = useRef(null);
  const [, setActiveTab] = useState(0);
  const [EventList, setEventList] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const getAllEventsListing = async () => {
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
    <>
      <div className="mx-16">
        <Button
          className="text-center text-base/7 bg-purple-600 text-white px-2 py-1 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          onClick={handleOpen}
        >
          Create New Event
        </Button>
      </div>
      <div className="flex flex-col gap-3 text-center">
        <Tabs
          aria-label="Default tabs"
          variant="default"
          ref={tabsRef}
          onActiveTabChange={(tab) => setActiveTab(tab)}
          className="flex justify-center"
        >
          <Tabs.Item active title={<span className="text-purple-600 font-bold">Upcoming</span>} icon={MdLiveTv}>
            <UpcomingEventList />
          </Tabs.Item>
          <Tabs.Item title={<span className="text-purple-600 font-bold">Past</span>} icon={MdDashboard} className="mx-5">
            <PastEventList />
          </Tabs.Item>
        </Tabs>
      </div>
      <WrapperModal open={open} setOpen={setOpen}>
        <CreateEvent />
      </WrapperModal>
    </>
  );
};

export default ManageEvent;
