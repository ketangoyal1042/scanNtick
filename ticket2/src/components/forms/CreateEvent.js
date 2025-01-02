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
import { createEvent } from "../../../api/event";
import { toast } from "react-toastify";

const CreateEvent = () => {
  const auth = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventVenue: "",
    eventDateTime: "",
    headCapacity: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newerr = {};
    if (!formData.title) newerr.title = "Title is required";
    if (!formData.description) newerr.description = "Description is required";
    if (!formData.eventVenue) newerr.eventVenue = "Event venue is required";
    if (!formData.eventDateTime)
      newerr.eventDateTime = "Event date is required";
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
      if (auth.token) {
        // Convert eventDateTime to IST
        const utcDate = new Date(formData.eventDateTime);
        const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
        const istDate = new Date(utcDate.getTime() + istOffset).toISOString();
        const updatedFormData = { ...formData, eventDateTime: istDate };
        let response = await createEvent(updatedFormData);
        if (!response.success) {
          console.log("Error creating event", response.success);
        }
        toast(response?.message);
      }
      handleCloseModal();
    } catch (error) {
      toast("Failed to create event. Please try again.");
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Container maxWidth="sm" className={styles.container}>
        <Box sx={{ m: 2 }} className="text-center">
          <Typography variant="h5" gutterBottom className={styles.title}>
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
                  name="eventDateTime"
                  type="datetime-local"
                  value={formData.eventDateTime}
                  onChange={handleChange}
                  className={styles.textField}
                  error={!!errors.eventDateTime}
                  helperText={errors.eventDateTime}
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
      </Container>
    </div>
  );
};

export default CreateEvent;
