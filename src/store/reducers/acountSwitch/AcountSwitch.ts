import { CancelButton } from './../../../components/common/buttons/CancelButton';
 
 import { AcountSwitchActionType, IAcountSwitch } from "./types";

const initState: IAcountSwitch = {
 
    user: [],
  };
  
  
   
  export const AcountSwitch = (state = initState, action: any): IAcountSwitch => {
    switch (action.type) {
      case AcountSwitchActionType.LOGIN_USER_ADD: {
        
         const existingAccount = state.user.find(user => user.userId === action.payload.userId);
 
        if (!existingAccount) {
              return {
                ...state,
                user: [...state.user, action.payload],
            };
        } else {
             console.error('Акаунт з вказаним ID вже існує');
            return state;  
        }
      }
      case  AcountSwitchActionType.CLEAR_TOKENS:
      return { ...state, user: [] };
     
   
    }
    return state;
  };
  