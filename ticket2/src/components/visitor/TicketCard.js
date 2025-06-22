"use client";

import React, { useState } from "react";
import { Button, Card } from "flowbite-react";
import { Calendar, ChevronDown, ChevronUp, MapPin, Users } from "lucide-react";
import QRCodeSlider from "./QrCodeSlider";

export default function TicketCard({ ticket }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const event = ticket.eventDetails || {};

  return (
    <Card className="w-full border border-gray-200 shadow-md">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-semibold text-gray-900">
              {event.title || "Event Title"}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-700">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-blue-500" />
              {formatDate(event.eventDateTime)}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-red-500" />
              {event.eventVenue}
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-purple-500" />
              {ticket.qrCodes?.length || 0} ticket
              {ticket.qrCodes?.length > 1 ? "s" : ""}
            </div>
          </div>
        </div>

        <Button
          color="light"
          size="xs"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2"
        >
          QR Codes
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>

      {isExpanded && (
        <div className="pt-4 mt-4 border-t border-gray-200">
          <h4 className="text-lg font-medium mb-2">
            Your QR Codes ({ticket.qrCodes?.length || 0})
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            Present these QR codes at the venue.
          </p>

          {event.description && (
            <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
              <p className="text-sm text-blue-800">
                <strong>Description:</strong> {event.description}
              </p>
              {event.headCapacity && (
                <p className="text-sm text-blue-700 mt-1">
                  <strong>Capacity:</strong> {event.headCapacity} people
                </p>
              )}
            </div>
          )}

          {/* Render QR Code slider or list here */}
          <QRCodeSlider qrCodes={ticket.qrCodes} />
        </div>
      )}
    </Card>
  );
}
