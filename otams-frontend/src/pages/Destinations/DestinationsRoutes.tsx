import { Route, Routes } from "react-router-dom";
import "../Destinations/destinations.css";
import { CreateDestination } from "./CreateDestination";
import { DestinationDetails } from "./DestinationDetails";
import { Destinations } from "./Destinations";
import { EditDestination } from "./EditDestination";

export const DestinationsRoutes = () => {
  return (
    <Routes>
        <Route path="" element={<Destinations />} />
        <Route path=":id" element={<DestinationDetails />} />
        <Route path="create" element={<CreateDestination />} />
        <Route path="edit/:id" element={<EditDestination />} />
    </Routes>
  );
};
