"use client";
import { useState, useEffect } from "react";

export function useDemoSettings() {
  const [simulateBusy, setSimulateBusy] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("sendja_demo_settings");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setSimulateBusy(!!parsed.simulateBusyHours);
      } catch (_e) {
        console.warn("Failed to parse demo settings, ignoring");
      }
    }
  }, []);

  const toggleBusyHours = () => {
    const newVal = !simulateBusy;
    setSimulateBusy(newVal);
    localStorage.setItem("sendja_demo_settings", JSON.stringify({ simulateBusyHours: newVal }));
    window.location.reload();
  };

  return { simulateBusy, toggleBusyHours };
}
