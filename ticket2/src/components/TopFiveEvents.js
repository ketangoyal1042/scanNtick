import React, { useEffect } from "react";
import { topUpcomingEvents } from "../../api/event";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { toast } from "react-toastify";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

const TopFiveEvents = () => {
  const router = useRouter();
  const [events, setEvents] = React.useState([]);
  const getEvents = async () => {
    try {
      const response = await topUpcomingEvents(5);
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
    <div className="">
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {events?.map((event) => (
            <Grid item size={4} key={event._id}>
              <Card sx={{ maxWidth: 345 }} className="cursor-pointer hover:border border-blue-600 transition-shadow" onClick={() => router.push(`/event/${event._id}`)}>
                <CardMedia className="h-30"
                  component="img"
                  alt="green iguana"
                  height="240"
                  width={100}
                  image="https://cdn5.vectorstock.com/i/1000x1000/25/19/event-pr-line-icon-vector-36352519.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h4" component="div">
                    {event.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {event.description}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Date: {event.eventDate}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Location: {event.eventVenue}
                  </Typography>
                </CardContent>
                {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default TopFiveEvents;
