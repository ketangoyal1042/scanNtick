"use client";

import { Button, Tabs, TabsRef } from "flowbite-react";
import { useRef, useState } from "react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard, MdLiveTv } from "react-icons/md";
import { getAllEvents } from "../../api/event";
import UpcomingEventList from "@/components/events/UpcomingEventList";

const ManageEvent = () => {
  const tabsRef = useRef(null);
  const [, setActiveTab] = useState(0);
  const [EventList, setEventList] = useState([]);

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
    <div className="flex flex-col gap-3 text-center">
      <Tabs
        aria-label="Default tabs"
        variant="default"
        ref={tabsRef}
        onActiveTabChange={(tab) => setActiveTab(tab)}
        className="flex justify-center"
      >
        <Tabs.Item active title="Upcoming" icon={MdLiveTv}>
          <UpcomingEventList/>
        </Tabs.Item>
        <Tabs.Item title="Past" icon={MdDashboard} className="mx-5">
          <div className="mx-40">
            This is{" "}
            <span className="font-medium text-gray-800 dark:text-white">
              Dashboard tab's associated content
            </span>
          </div>
        </Tabs.Item>
      </Tabs>
    </div>
  );
};

export default ManageEvent;
