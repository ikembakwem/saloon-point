import { AppointmentsDayView } from "./AppointmentsDayView";
import { sampleAppointments } from "./sampleData";
import { CustomerForm } from "./components/CustomerForm";

const blankCustomer = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
};

export default function App() {
  return (
    <>
      <AppointmentsDayView
        appointments={sampleAppointments}
      />
      <CustomerForm original={blankCustomer} />
    </>
  );
}
