import { Route, Routes } from "react-router-dom";
import { CreatePayment } from "./CreatePayment";
import { MyPayments } from "./MyPayments";
import { PaymentDetails } from "./PaymentDetails";
import { PaymentsList } from "./PaymentsList";

export const PaymentRoutes = () => {
  return (
    <Routes>
      <Route path="admin/payments" element={<PaymentsList />} />
      <Route path="my-payments" element={<MyPayments />} />
      <Route path="create" element={<CreatePayment />} />  {/* For creating new payments */}
      <Route path=":id" element={<PaymentDetails />} />
    </Routes>
  );
};
