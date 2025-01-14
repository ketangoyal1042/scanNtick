"use client";

import { Button, Tabs, TabsRef } from "flowbite-react";
import { useRef, useState } from "react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard, MdLiveTv } from "react-icons/md";

const EventPage = () => {
  const tabsRef = useRef(null);
  const [, setActiveTab] = useState(0);

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
          <div className="mx-40">
            This is{" "}
            <span className="font-medium text-gray-800 dark:text-white">
              Profile tab's associated content Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Eos libero laboriosam accusantium.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              molestias recusandae numquam dolores officia consectetur ad culpa
              harum voluptate quis odit, aperiam cum incidunt sit iusto aliquid
              libero dicta dolor non placeat natus tempore aut rerum? Quasi
              inventore qui labore!
            </span>
          </div>
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

export default EventPage;
