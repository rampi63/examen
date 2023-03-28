import axios from "axios"

export const FETCH_TABLA_CLIMA = "FETCH_TABLA_CLIMA"
export const FETCH_TABLA_CLIMA_SUCCESS = "FETCH_TABLA_CLIMA_SUCCESS"
export const FETCH_TABLA_CLIMA_ERROR = "FETCH_TABLA_CLIMA_ERROR"

export const fetchTablaClimaRequest = () => {
    return {
        type: FETCH_TABLA_CLIMA
    }
}

export const fetchTablaClimaRequestSuccess = (Clima) => {
    return {
        type: FETCH_TABLA_CLIMA_SUCCESS,
        payload: Clima
    }
}

export const fetchTablaClimaRequestError = (Error) => {
    return {
        type: FETCH_TABLA_CLIMA,
        payload: Error
    }
}

const fetchClima = (value) => {

    return (dispatch) => {
        dispatch(fetchTablaClimaRequest())

        axios.get(`https://api.datos.gob.mx/v1/condiciones-atmosfericas?page=${value}`).then(res => {
            dispatch(fetchTablaClimaRequestSuccess(res.data))
        }).catch(error => {
            dispatch(fetchTablaClimaRequestError("No se pudieron llamar los datos"))
        })
    }
}

export default fetchClima