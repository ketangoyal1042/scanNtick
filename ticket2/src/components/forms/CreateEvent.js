import React, { useState } from "react";
import styles from "./EventForm.module.css";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Modal,
} from "@mui/material";

import Grid from "@mui/material/Grid2";
import { useSelector } from "react-redux";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventVenue: "",
    eventDate: "",
    headCapacity: "",
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newerr = {};
    if (!formData.title) newerr.title = "Title is required";
    if (!formData.description) newerr.description = "Description is required";
    if (!formData.eventVenue) newerr.eventVenue = "Event venue is required";
    if (!formData.eventDate) newerr.eventDate = "Event date is required";
    if (!formData.headCapacity)
      newerr.headCapacity = "Head capacity is required";
    setErrors(newerr);
    return Object.keys(newerr).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      auth = useSelector((state) => state.auth);
      if (token) {
        const response = await fetch(
          "http://localhost:5000/api/v1/event/registeration",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: auth.token,
            },
            body: JSON.stringify(formData),
          }
        );
        if (!response.ok) {
          console.log("Error creating event", response);
          alert("Failed to create event");
        }
        const data = await response.json();
        setResponseMessage("Event created successfully!");
        setModalOpen(true);
      }
    } catch (error) {
      setResponseMessage("Failed to create event. Please try again.");
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  console.log(formData);

  return (
    <div>
      <Container maxWidth="sm" className={styles.container}>
        <Box sx={{ m: 2 }} className="text-center">
          <Typography variant="h4" gutterBottom className={styles.title}>
            Create New Event
          </Typography>
          <form>
            <Grid container spacing={2} className={styles.gridContainer}>
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Event Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={styles.textField}
                  error={!!errors.title}
                  helperText={errors.title}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Event Venue"
                  name="eventVenue"
                  value={formData.eventVenue}
                  onChange={handleChange}
                  className={styles.textField}
                  error={!!errors.eventVenue}
                  helperText={errors.eventVenue}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Event Date"
                  name="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className={styles.textField}
                  error={!!errors.eventDate}
                  helperText={errors.eventDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Head Capacity"
                  name="headCapacity"
                  type="number"
                  value={formData.headCapacity}
                  onChange={handleChange}
                  className={styles.textField}
                  error={!!errors.headCapacity}
                  helperText={errors.headCapacity}
                  required
                />
              </Grid>
              <Grid item size={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={styles.textField}
                  multiline
                  rows={4}
                  error={!!errors.description}
                  helperText={errors.description}
                  required
                />
              </Grid>
              <Grid item size={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={handleCreateEvent}
                  fullWidth
                  className={styles.submitButton}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
        {/* Modal Component */}
        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              width: 300,
            }}
          >
            <Typography variant="h6" component="h2">
              {responseMessage.includes("successfully") ? "Success" : "Error"}
            </Typography>
            <Typography sx={{ mt: 2 }}>{responseMessage}</Typography>
            <Button
              onClick={handleCloseModal}
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
            >
              Close
            </Button>
          </Box>
        </Modal>
      </Container>
    </div>
  );
};

export default CreateEvent;
