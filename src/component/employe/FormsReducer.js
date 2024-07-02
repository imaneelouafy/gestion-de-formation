
export const Form_Reducer_Default_Values = {
  nom: '',
  prenom: '',
  age: '',
  tele: '',
  email: '',
  diplome: '',
  nombreFomation: '',
} 

export const formReducer = (state, action) => {
  switch (action.type){
    case 'input_change':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case 'reset_form':
      return Form_Reducer_Default_Values;
    default:
      return state;
  }
}