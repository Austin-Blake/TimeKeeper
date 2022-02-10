import React from "react";

export const LabelInput = (props) => {
	return (
		<>
			<div className={(props.containerClass||"flex flex-col lg:w-full justify-center align-bottom")}>
				<label htmlFor={props.name} className={(props.labelClass||"w-3/4 mx-auto m-2 text-white font-serif")}>{props.labelText}</label>
				<input {...props.reference}
					className={(props.inputClass||"w-3/4 mx-auto rounded bg-slate-200 hover:shadow-none shadow-inner shadow-slate-400 px-3 font-serif")}
					type={props.type}
					id={props.id}
					name={props.name}
					onChange={(props.onChange || null)}
					autoComplete={props.autoComplete || 'on'}
					minLength={(props.minLength || null)}
					readOnly={(props.readOnly||null)}
					disabled={(props.disabled || null)}
					placeholder={(props.placeholder || null)}
					autoFocus={(props.autoFocus||null)}
					checked={(props.checked || null)}
				/>
			</div>
		</>
	);
};
