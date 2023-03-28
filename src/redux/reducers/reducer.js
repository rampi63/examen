import { FETCH_TABLA_CLIMA, FETCH_TABLA_CLIMA_ERROR, FETCH_TABLA_CLIMA_SUCCESS } from "../actions/action"

const initialState = {
    loading: false,
    res: {},
    error: ""
}

const paginado = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TABLA_CLIMA:
            return {
                ...state,
                loading: true
            }

        case FETCH_TABLA_CLIMA_SUCCESS:
            return {
                loading: false,
                res: action.payload,
                error: ""
            }

        case FETCH_TABLA_CLIMA_ERROR:
            return {
                loading: false,
                res: [],
                error: action.payload
            }

        default: return state
    }
}

export default paginado