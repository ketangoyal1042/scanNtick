import React, { useEffect, useState } from "react";
import { getVisitorTickets } from "../../../api/ticket";
import { toast } from "react-toastify";
import TicketCard from "@/components/visitor/TicketCard";

const index = () => {
  const [tickets, setTickets] = useState([]);
  const getVisTickets = async () => {
    try {
      const { tickets } = await getVisitorTickets();
      console.log(tickets);
      setTickets(tickets);
    } catch (error) {
      toast.error("Something went wrong. Please try again." + error.message);
    }
  };
  useEffect(() => {
    getVisTickets();
  }, []);
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export default index;
