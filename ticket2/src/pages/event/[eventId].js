"use client";

import { Button, Tabs, TabsRef } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { HiAdjustments, HiClipboardList, HiDotsVertical, HiUserCircle } from "react-icons/hi";
import { MdDashboard, MdLiveTv } from "react-icons/md";
import { Dropdown } from "flowbite-react";
import ModernWrapperModal from "@/components/common/ModernWrapperModal";
import UpdateEvent from "@/components/forms/UpdateEvent";
import DeleteEvent from "@/components/forms/DeleteEvent";
import { useRouter } from "next/router";
import { getEventData } from "../../../api/event";
import { toast } from "react-toastify";
import { ArrowLeft, Calendar, Clock, MapPin, Share2 } from "lucide-react";
import TicketGenerateFromEvent from "@/components/forms/TicketGenerateFromEvent";

const EventPage = () => {
  const router = useRouter();
  const [, setActiveTab] = useState(0);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openTicketModal, setOpenTicketModal] = useState(false);

  const { eventId } = router.query;
  const [event, setEvent] = useState(null);

  const getEvent = async () => {
    try {
      console.log("Fetching event with ID:", eventId);
      const response = await getEventData({ event_id: eventId });
      if (response.success) {
        setEvent(response.event);

      }
    } catch (error) {
      toast("Something went wrong. Please try again." + error.message);
    }
  };


  useEffect(() => {
    if (router.isReady && eventId) {
      getEvent();
    }
  }, [router.isReady && eventId]);

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
        <UpdateEvent setOpenModal={setOpenUpdateModal} eventData={event} eventId={eventId} />
      </ModernWrapperModal>
      <ModernWrapperModal openModal={openDeleteModal} setOpenModal={setOpenDeleteModal}>
        <DeleteEvent setOpenModal={setOpenDeleteModal} eventId={eventId} />
      </ModernWrapperModal>
      <ModernWrapperModal openModal={openTicketModal} setOpenModal={setOpenTicketModal}>
        <TicketGenerateFromEvent openModal={openTicketModal} setOpenModal={setOpenTicketModal} eventId={eventId} />
      </ModernWrapperModal>


      {event && <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96">
          <img
            // src={event.image}
            src="https://cdn5.vectorstock.com/i/1000x1000/25/19/event-pr-line-icon-vector-36352519.jpg"
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <button
            // onClick={onBack}
            className="absolute top-4 left-4 bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <span className="absolute top-4 right-4 bg-white/90 text-black px-4 py-2 rounded-full text-sm font-medium">
            {event.category}
          </span>
        </div>

        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{event.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium">{event.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{event.location}</p>
              </div>
            </div>
          </div>

          <div className="prose max-w-none mb-8">
            <h2 className="text-2xl font-semibold mb-4">About the Event</h2>
            <p className="whitespace-pre-line">{event.fullDescription}</p>
          </div>

          {/* <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Event Schedule</h2>
            <div className="space-y-3">
              {event.agenda.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div> */}

          <div className="flex gap-4">
            <button onClick={() => setOpenTicketModal(true)} className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium">
              Register Now
            </button>
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Share2 className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>}
    </>
  );
};

export default EventPage;
