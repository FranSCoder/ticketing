import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // Estamos en el server

    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
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
