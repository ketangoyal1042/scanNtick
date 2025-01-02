import React from "react";

const UpcomingEventList = () => {
  return (
    <div className="mx-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                Noteworthy technology acquisitions 2021
              </h5>
              <p class="mb-3 font-normal text-purple-700 dark:text-purple-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
              {/* {event.title} */}
              {/* {event.description} */}
              {/* Date: {event.eventDate} */}
              {/* Location: {event.eventVenue} */}
            </div>
          </a>
        </div>
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
            <div class="flex flex-col justify-between p-4 leading-normal">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-purple-900 dark:text-white">
                Noteworthy technology acquisitions 2021
              </h5>
              <p class="mb-3 font-normal text-purple-700 dark:text-purple-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
              {/* {event.title} */}
              {/* {event.description} */}
              {/* Date: {event.eventDate} */}
              {/* Location: {event.eventVenue} */}
            </div>
          </a>
        </div>
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
            <div class="flex flex-col justify-between p-4 leading-normal">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-purple-900 dark:text-white">
                Noteworthy technology acquisitions 2021
              </h5>
              <p class="mb-3 font-normal text-purple-700 dark:text-purple-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
              {/* {event.title} */}
              {/* {event.description} */}
              {/* Date: {event.eventDate} */}
              {/* Location: {event.eventVenue} */}
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventList;
