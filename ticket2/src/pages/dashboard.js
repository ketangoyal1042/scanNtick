import WrapperModal from "@/components/common/WrapperModal";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import CreateEvent from "@/components/forms/CreateEvent";
import TopFiveEvents from "@/components/TopFiveEvents";

const dashboard = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 text-center">
        <Button
          className="text-center text-base/7 font-semibold text-indigo-600"
          onClick={handleOpen}
        >
          Create New Event
        </Button>
        <p className="mx-auto mt-2 max-w-lg text-balance text-center text-3xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
          Everything you need to deploy your app
        </p>
        <Button onClick={handleOpen}>Open modal</Button>
        <WrapperModal open={open} setOpen={setOpen}>
          <CreateEvent />
        </WrapperModal>
        <TopFiveEvents />
      </div>
    </div>
  );
};

export default dashboard;
