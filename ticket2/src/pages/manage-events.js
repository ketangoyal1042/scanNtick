"use client";

import { Button, Tabs, TabsRef } from "flowbite-react";
import { useRef, useState } from "react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard, MdLiveTv } from "react-icons/md";
import { getActiveEvents } from "../../api/event";
import UpcomingEventList from "@/components/events/UpcomingEventList";
import WrapperModal from "@/components/common/WrapperModal";
import CreateEvent from "@/components/forms/CreateEvent";
import PastEventList from "@/components/events/PastEventList";
import ScanTicket from "@/components/ticket/ScanTicket";

const ManageEvent = () => {
  const tabsRef = useRef(null);
  const [, setActiveTab] = useState(0);
  const [EventList, setEventList] = useState([]);
  const [eventopen, setEventOpen] = useState(false);
  const handleOpen = () => setEventOpen(true);

  const getAllEventsListing = async () => {
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
    <>
      <div className="flex justify-between mx-16">
        <div>
          <Button
            className="text-center text-base/7 bg-purple-600 text-white px-2 py-1 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            onClick={handleOpen}
          >
            Create New Event
          </Button>
        </div>
        <div className="w-[400px]">
          <form class="max-w-md ">
            <label htmlFor="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
              <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-purple-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
          </form>
        </div>
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
      <WrapperModal open={eventopen} setOpen={setEventOpen}>
        <CreateEvent setOpen={setEventOpen}/>
      </WrapperModal>
    </>
  );
};

export default ManageEvent;
