import React, { useReducer } from "react";
import { reg_init_State } from "./initialStates/register_Init_State";
import RegisterContext from "./RegisterContext";
import registerReducer from "./regReducer";

const RegisterProvider = ({ children }) => {
	

	const [state, dispatch] = useReducer(registerReducer, reg_init_State);
	return (
		<RegisterContext.Provider
			value={{
				user: state.user,
                mandatoryFields: state.mandatoryFields,
				optionalFields: state.optionalFields,
				manFieldRes: state.manFieldRes,
				optionalFieldRes: state.optionalFieldRes,
				token: state.token,
				state,
				dispatch,
			}}
		>
			{children}
		</RegisterContext.Provider>
	);
};

export default RegisterProvider;
