import React from "react";

export const Button = (props) => {
	return (
		<button
			form={props.form || null}
			onClick={props.onClick || null}
			className={props.className}
			type={props.type}
		>
			{props.text}
		</button>
	);
};
