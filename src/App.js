import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabla from "./components/Tabla/Tabla";
import fetchClima from "./redux/actions/action";


//Para extraer la info de un ID en especifico hay que agregar el parametro _id a la peticion
//Para navegar en la paginacion de la api hay que utilizar el parametro page

function App() {

  const [dataMaster, setDataMaster] = useState([])
  const [pagination, setPagination] = useState({ page: 0 })
  const [loading, setLoading] = useState(false)

  const data = useSelector((state) => state.paginado) //Variable que traerá las diferentes respuestas del axios

  const dispatch = useDispatch()

  const respuestaCondicionesAtmosfericas = (fetchData) => {
    //console.log(fetchData)

    if (fetchData.error) {
      console.error(fetchData.error)
      return
    }

    if (Object.values(fetchData.res).length) {
      if (fetchData.res.pagination.page === pagination.page + 1) {
        setDataMaster([...dataMaster, ...fetchData.res.results])
        setPagination(fetchData.res.pagination)
      }
    }

    setLoading(fetchData.loading)
  }

  useEffect(() => {
    dispatch(fetchClima(1)) // Primera petición
  }, [])

  useEffect(() => {
    respuestaCondicionesAtmosfericas(data) // Para guardar los datos
  }, [data])

  //console.log(data)

  return (
    <div className="App">
      <div>
        <h1>Condiciones Atmosféricas</h1>
      </div>
      <Tabla informacion={dataMaster} />
      {
        pagination.page * pagination.pageSize < pagination.total ? //Esto valida que no puedes hacer mas request en caso de que hayas llegado al limite de paginas
          <div>
            {
              loading ?
                <h2 className="loading">
                  Cargando...
                </h2> //Esto es un mensaje de carga de carga
                :
                <h2 className="more-info" onClick={() => { dispatch(fetchClima(pagination.page + 1)) }}>
                  Cargar más información
                </h2> //Cargar mas informacion
            }
          </div>
          :
          <></>
      }
    </div>
  );
}

export default App;
