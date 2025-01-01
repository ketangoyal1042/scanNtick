import React, { useEffect } from "react";
import { topUpcomingEvents } from "../../api/event";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";

const TopFiveEvents = () => {
  const [events, setEvents] = React.useState([]);
  const getEvents = async () => {
    try {
      const response = await topUpcomingEvents();
      if (response.success) {
        setEvents(response.events);
      }
    } catch (error) {
      toast("Something went wrong. Please try again." + error.message);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div>
      <h2>Top 5 Upcoming Events</h2>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {events.map((event) => (
            <Grid item xs={12}>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <span>Date: {event.eventDate}</span>
              <p>Location: {event.eventVenue}</p>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default TopFiveEvents;
