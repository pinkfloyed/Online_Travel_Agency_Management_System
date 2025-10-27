import axios from "axios";

const API_URL = "http://localhost:5255/api/Destinations";

export const getAllDestinations = () => axios.get(API_URL);

export const getDestinationById = (id: number) =>
  axios.get(`${API_URL}/${id}`);
