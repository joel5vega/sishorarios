import React, { useState, createContext } from "react";
export const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};
export const responsables = [
  {
    id: 2,
    nombre: "Joel",
    ap_paterno: "Vega",
    ap_materno: "Cruz",
    puesto: "auxiliar",
    titulo: "univ",
    estado: "interino",
  },
  {
    id: 3,
    nombre: "",
    ap_paterno: "Amestegui",
    ap_materno: "",
    puesto: "docente",
    titulo: "Ing",
    estado: "titular",
  },
  {
    id: 4,
    nombre: "",
    ap_paterno: "Nava",
    ap_materno: "",
    puesto: "docente",
    titulo: "Ing",
    estado: "",
  },
  {
    id: 5,
    nombre: "",
    ap_paterno: "Quiroga",
    ap_materno: "",
    puesto: "docente",
    titulo: "Ing",
    estado: "",
  },
  {
    id: 6,
    nombre: "",
    ap_paterno: "Sanabria",
    ap_materno: "",
    puesto: "docente",
    titulo: "Ing",
    estado: "",
  },
  {
    id: 7,
    nombre: "",
    ap_paterno: "Oropeza",
    ap_materno: "",
    puesto: "docente",
    titulo: "Ing",
    estado: "",
  },
  {
    id: 8,
    nombre: "",
    ap_paterno: "Mayori",
    ap_materno: "",
    puesto: "docente",
    titulo: "Ing",
    estado: "",
  },
  {
    id: 9,
    nombre: "",
    ap_paterno: "Molina",
    ap_materno: "",
    puesto: "docente",
    titulo: "Ing",
    estado: "",
  },
  {
    id: 10,
    nombre: "",
    ap_paterno: "Gutierrez",
    ap_materno: "",
    puesto: "docente",
    titulo: "Ing",
    estado: "",
  },
  {
    id: 11,
    nombre: "",
    ap_paterno: "Zota",
    ap_materno: "",
    puesto: "docente",
    titulo: "Lic",
    estado: "",
  },
];

async function responsable() {
  let urlResponsables = "http://127.0.0.1:8000/index/responsables";
  const data = await fetch(urlResponsables).then((value) => value.json());
  const datos = data.responsables;
  // console.log(datos);
  return datos;
}

// export const responsables = responsable();
export const ContextProvider = createContext(
  //   themes.dark, // default value,
  responsables
);
export default ContextProvider;
