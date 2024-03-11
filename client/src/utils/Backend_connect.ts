import axios from 'axios';

const connection = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BACK}/api`,
});

export default connection;