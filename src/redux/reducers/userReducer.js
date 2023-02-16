import {ADD_USER, USER_UPDATE, REMOVE_USER} from '../constants/index';

const initialState = {
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        user: action.payload,
      };
    case REMOVE_USER:
      return {
        ...state,
        user: '',
      };

    case USER_UPDATE:
      /* so you return a new state object with all the data from old state
      user also contain the data from old state.user but you update some of his parameters
      like this.props.updateUser({  email:'abc@gmail.com' }); update only email field 
      this.props.updateUser({   user_name : 'sdfd' , email:'abc@gmail.com' }); 
      update only user_name field

      change the name of action too, 
      because later you will add more item in the redux and "change" dont say it 
      change what ( just an idea )
      */
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
