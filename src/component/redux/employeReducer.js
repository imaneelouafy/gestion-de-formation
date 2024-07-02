import {
  FETCH_EMPLOYES_REQUEST,
  FETCH_EMPLOYES_SUCCESS,
  FETCH_EMPLOYES_FAILURE,
  UPDATE_EMPLOYE,
  DELETE_EMPLOYE,
} from "./employeActions";

const initialState = {
  employes: [],
  loading: false,
  error: null,
};

const employeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_EMPLOYES_SUCCESS:
      return {
        ...state,
        loading: false,
        employes: action.payload,
      };
    case FETCH_EMPLOYES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_EMPLOYE:
      return {
        ...state,
        employes: state.employes.map((employe) =>
          employe.id === action.payload.employeId
            ? { ...employe, ...action.payload.updatedData }
            : employe
        ),
      };
    case DELETE_EMPLOYE:
      return {
        ...state,
        employes: state.employes.filter(
          (employe) => employe.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default employeReducer;