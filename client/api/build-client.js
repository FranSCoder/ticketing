import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // Estamos en el server

    return axios.create({
      baseURL: "http://www.ticketing-app-prod-microservices-course.store/",
      headers: req.headers,
    });
  } else {
    // Estamos en el navegador
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;
