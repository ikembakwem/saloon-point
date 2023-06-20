import React from "react";
import { createRoot } from "react-dom/client";
import { AppointmentsDayView } from "./AppointmentsDayView";
import { sampleAppointments } from "./sampleData";

const root = createRoot(document.getElementById("app"));

root.render(<AppointmentsDayView appointments={sampleAppointments} />);
