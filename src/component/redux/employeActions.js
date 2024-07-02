import axios from "axios";

// Action Types
export const FETCH_EMPLOYES_REQUEST = "FETCH_EMPLOYES_REQUEST";
export const FETCH_EMPLOYES_SUCCESS = "FETCH_EMPLOYES_SUCCESS";
export const FETCH_EMPLOYES_FAILURE = "FETCH_EMPLOYES_FAILURE";
export const UPDATE_EMPLOYE = "UPDATE_EMPLOYE";
export const DELETE_EMPLOYE = "DELETE_EMPLOYE";

// Action Creators
export const fetchEmployesRequest = () => ({
  type: FETCH_EMPLOYES_REQUEST,
});

export const fetchEmployesSuccess = (employes) => ({
  type: FETCH_EMPLOYES_SUCCESS,
  payload: employes,
});

export const fetchEmployesFailure = (error) => ({
  type: FETCH_EMPLOYES_FAILURE,
  payload: error,
});

export const updateEmploye = (employeId, updatedData) => ({
  type: UPDATE_EMPLOYE,
  payload: {
    employeId,
    updatedData,
  },
});

export const deleteEmploye = (employeId) => ({
  type: DELETE_EMPLOYE,
  payload: employeId,
});

// Thunk to fetch employes
export const fetchEmployes = () => {
  return (dispatch) => {
    dispatch(fetchEmployesRequest());
    axios
      .get("http://localhost:8000/employe")
      .then((response) => {
        dispatch(fetchEmployesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchEmployesFailure(error.message));
      });
  };
};

export const deleteEmployeAsync = (employeId) => {
  return async (dispatch) => {
    try {
      console.log(`Tentative de suppression de l'employé avec l'ID : ${employeId}`);
      await axios.delete(`http://localhost:8000/employe/${employeId}`);
      console.log("Employé supprimé avec succès");
      dispatch(deleteEmploye(employeId));
    } catch (error) {
      console.error("Erreur de suppression de l'employé :", error);
    }
  };
};