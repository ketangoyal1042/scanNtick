import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
const WrapperModal = ({ children, open, setOpen }) => {
  
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      xs: 400,  // 400px for extra small screens (phones)
      sm: 700,  // 700px for small screens (tablets and up)
      md: 700,  // 700px for medium screens (larger devices)
    },
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
  };

  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default WrapperModal;
