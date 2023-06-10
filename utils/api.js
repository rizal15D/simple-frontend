import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com', // Ganti dengan URL dasar API Anda
  // tambahkan opsi lainnya sesuai kebutuhan
});

const postData = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (err) {
    // tangani kesalahan jika ada
    const error = err.response.data.error;
    throw new Error(error[error.length - 1]);
  }
};

const updateData = async (endpoint, data) => {
    try {
      const response = await api.put(endpoint, data);
      return response.data;
    } catch (err) {
      // tangani kesalahan jika ada
      const error = err.response.data.error;
      throw new Error(error[error.length - 1]);
    }
  };

const getData = async (endpoint) => {
    try {
      const response = await api.get(endpoint);
      return response.data;
    } catch (err) {
      // tangani kesalahan jika ada
      const error = err.response.data.error;
      throw new Error(error[error.length - 1]);
    }
  };

const deleteData = async (endpoint) => {
    try {
        const response = await api.delete(endpoint);
        console.log(response);
        return response.data;
      } catch (err) {
        // tangani kesalahan jika ada
        // const error = err.response.data.error;
        throw new Error("Gagal menghapus data");
      }
}

module.exports = {
    postData,
    getData,
    deleteData,
    updateData,
}