import axios from "axios";
const API_URL = "http://localhost:8000/arsip_surat/";

// Surat Masuk
const getDataSuratMasuk = () => {
  return axios.get(API_URL + "get_data_suratMasuk");
}

// Surat Keluar
const getDataSuratKeluar = () => {
  return axios.get(API_URL + "get_data_suratKeluar");
}

const downloadFileSuratMasuk = (surat) => {
  return API_URL + `download_file_suratMasuk/${surat}`;
}

const downloadFileSuratKeluar = (surat) => {
  return API_URL + `download_file_suratKeluar/${surat}`;
}

const getDataSuratMasukById = (id) => {
   return axios.get(API_URL + `get_data_byId_suratMasuk/${id}`)
}

const getDataSuratKeluarById = (id) => {
   return axios.get(API_URL + `get_data_byId_suratKeluar/${id}`)
}

// eslint-disable-next-line
export default {
  getDataSuratMasuk,
  getDataSuratKeluar,
  downloadFileSuratMasuk,
  downloadFileSuratKeluar,
  getDataSuratMasukById,
  getDataSuratKeluarById
};
