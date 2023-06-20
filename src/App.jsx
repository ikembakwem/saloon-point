import { AppointmentsDayView } from "./AppointmentsDayView";
import { sampleAppointments } from "./sampleData";

export default function App() {
  return (
    <AppointmentsDayView
      appointments={sampleAppointments}
    />
  );
}
