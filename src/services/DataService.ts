import UrlService from "./UrlService";
import axios from "axios";
let index ={}
axios.get(UrlService.apiUrl() + "index").then((response) => {
  index= {
    materias: response.data.materias,
    ambientes: response.data.ambientes,
    menciones: response.data.menciones,
    semestres: response.data.semestres,
    periodos: response.data.periodos,
    periodoActual: response.data.periodoActual,
    responsables: response.data.responsables,
    clases: response.data.clases,
    index: response.data,
    loading: false,
  };
  console.group("Descarga de datos");
  console.log(index)
  console.log("descarga exitosa")
  console.groupEnd()
});

class DataService {
  static indexData() { return index ; }
  // static apiUrl(){return apiDomain + 'api/';}
}

export default DataService;