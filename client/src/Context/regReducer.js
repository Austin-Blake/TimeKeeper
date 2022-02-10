import React from "react";

const registerReducer = (state, action) => {
	switch (action.type) {
		case "SET_MAN_FIELDS":
			for (let [key, value] of action.payload) {
				if (!state.mandatoryFields.hasOwnPropery(key)) {
					state.mandatoryFields.key = value;
				} else if (state.mandatoryFields[key] !== value) {
					state.mandatoryFields[key] = value;
				}
			}
			return {
				...state,
				fields: state.mandatoryFields,
			}
        case "SET_MANDATORY_RESP":
			return {
				...state,
				manFieldRes: action.payload,
				token: action.payload.sys_user.token
			}
		case "SET_OPTIONAL_FIELDS_RESP":
			return {
				...state,
				optionalFields: action.payload
			}

		default:
			return {
				...state,
			};
	}
};

export default registerReducer;
