import { Route, Routes } from "react-router-dom";
import { CreatePackage } from "./CreatePackage";
import { EditPackage } from "./EditPackage";
import { PackageDetails } from "./PackageDetails";
import { Packages } from "./Packages";
import "../Packages/packages.css";


export const PackagesRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Packages />} /> {/* /packages */}
      <Route path="create" element={<CreatePackage />} /> {/* /packages/create */}
      <Route path="edit/:id" element={<EditPackage />} /> {/* /packages/edit/:id */}
      <Route path=":id" element={<PackageDetails />} /> {/* /packages/:id */}
    </Routes>
  );
};
