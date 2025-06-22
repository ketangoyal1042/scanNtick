"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  QrCode,
  MapPin,
  Ticket,
} from "lucide-react";

export default function QRCodeSlider({ qrCodes }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? qrCodes.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === qrCodes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentQR = qrCodes[currentIndex];

  if (qrCodes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No QR codes available
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* QR Code Display Card */}
      <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-6 shadow-md">
        <div className="text-center space-y-6">
          {/* QR Code Box */}
          <div className="mx-auto w-48 h-48 bg-white rounded-xl shadow-inner border-4 border-gray-200 flex items-center justify-center">
            <div className="text-center">
              <img
                src={currentQR.qrCode}
                alt="QR Code"
                className="h-40 w-40 object-contain mx-auto mb-2"
              />
            </div>
          </div>

          {/* Ticket Info */}
          <div className="space-y-3">
            <div className="flex justify-center flex-wrap gap-2">
              {/* {currentQR.ticketType && (
                <span className="inline-flex items-center gap-1 text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded">
                  <Ticket className="h-4 w-4" />
                  {currentQR.ticketType}
                </span>
              )} */}
              {/* {currentQR.seatNumber && (
                <span className="inline-flex items-center gap-1 text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">
                  <MapPin className="h-4 w-4" />
                  {currentQR.seatNumber}
                </span>
              )} */}
            </div>
            <div className="text-sm text-gray-600">
              <p className="font-medium">
                Ticket {currentIndex + 1} of {qrCodes.length}
              </p>
              <p className="font-mono text-xs mt-1 bg-gray-100 px-2 py-1 rounded inline-block">
                ID: {currentQR.qrCodeId}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      {qrCodes.length > 1 && (
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={goToPrevious}
            className="flex items-center gap-2 text-sm px-4 py-2 border border-gray-300 rounded hover:bg-blue-50 transition"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {qrCodes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`rounded-full transition-all duration-200 h-2 ${
                  index === currentIndex
                    ? "bg-blue-500 w-6"
                    : "bg-gray-300 w-2 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="flex items-center gap-2 text-sm px-4 py-2 border border-gray-300 rounded hover:bg-blue-50 transition"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Quick Access Grid */}
      {qrCodes.length > 1 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-4 border-t border-gray-200">
          {qrCodes.map((qr, index) => (
            <button
              key={qr.id}
              onClick={() => setCurrentIndex(index)}
              className={`text-xs px-3 py-2 rounded text-center border ${
                index === currentIndex
                  ? "bg-blue-500 text-white"
                  : "bg-white border-gray-300 hover:bg-gray-100"
              } flex flex-col items-center gap-1`}
            >
              <QrCode className="h-4 w-4" />
              <span>{qr.seatNumber || `Ticket ${index + 1}`}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
