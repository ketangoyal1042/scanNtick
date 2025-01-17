import React, { useEffect } from "react";
import { getEventsData } from "../../../api/event";
import { toast } from "react-toastify";

const UpcomingEventList = () => {
  const [events, setEvents] = React.useState([]);
  const getEvents = async () => {
    try {
      const response = await getEventsData({ event_type: 'upcoming' });
      if (response.success) {
        setEvents(response.events);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again." + error.message);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);
  return (
    <div className="mx-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        {events?.map((event) => (
          <div>
            <a
              href="#"
              class="flex flex-col items-center bg-white border border-purple-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-purple-100 dark:border-purple-700 dark:bg-purple-800 dark:hover:bg-purple-700"
            >
              <img
                class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                src="https://flowbite.com/docs/images/blog/image-4.jpg"
                alt=""
              />
              <div class="flex flex-col justify-between p-2 leading-normal">
                <h5 class="mb-2 text-xl font-bold tracking-tight text-purple-900 dark:text-white">
                  {event.title}
                </h5>
                <p class="mb-3 font-normal text-purple-700 dark:text-purple-400">
                  {event.description}
                </p>
                {/* {event.title} */}
                {/* {event.description} */}
                {/* Date: {event.eventDate} */}
                {/* Location: {event.eventVenue} */}
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEventList;
