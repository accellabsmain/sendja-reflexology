"use client";
import { useState, useEffect, useCallback } from "react";
import { z } from "zod";
import { SendjaBooking, SendjaBookingSchema } from "../lib/validations";

const BOOKINGS_KEY = "sendja_mock_bookings";

export function useSendjaBookings() {
  const [bookings, setBookings] = useState<SendjaBooking[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(BOOKINGS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const validated = z.array(SendjaBookingSchema).parse(parsed);
        setBookings(validated);
      }
    } catch (error) {
      console.error("Failed to parse Sendja bookings, resetting state...", error);
      localStorage.removeItem(BOOKINGS_KEY);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveBookings = useCallback((newBookings: SendjaBooking[]) => {
    try {
      z.array(SendjaBookingSchema).parse(newBookings);
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(newBookings));
      setBookings(newBookings);
    } catch (error) {
      console.error("Failed to save bookings, invalid schema", error);
    }
  }, []);

  const addBooking = useCallback((booking: SendjaBooking) => {
    setBookings((prev) => {
      const newBookings = [...prev, booking];
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(newBookings));
      return newBookings;
    });
  }, []);
  
  const updateBookingStatus = useCallback((id: string, status: SendjaBooking['status']) => {
    setBookings((prev) => {
      const newBookings = prev.map(b => b.id === id ? { ...b, status } : b);
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(newBookings));
      return newBookings;
    });
  }, []);

  const clearBookings = useCallback(() => {
    localStorage.removeItem(BOOKINGS_KEY);
    setBookings([]);
  }, []);

  return { bookings, isLoaded, saveBookings, addBooking, updateBookingStatus, clearBookings };
}
