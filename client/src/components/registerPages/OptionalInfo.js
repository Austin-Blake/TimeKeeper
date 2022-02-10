import {React, useState,useEffect} from "react";
import { A } from "hookrouter";
import { Button } from "../util_components/Button";
import { registerUpdate } from "../../apiUtils";
import { LabelInput } from "../util_components/Label_input";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";

export const OptionalInfo = () => {
	const {
		register,
		handleSubmit,
	} = useForm();
	
	const [status,setStatus] = useState(null);
	const [errMessage, setErrMessage] = useState();

	const { mutate } = useMutation(data => {
		registerUpdate(data).then(res => {
			//if error set error message
			if (res.toString().includes("Error")||res.toString().includes("No")) {
				setErrMessage(res.toString());
			} else {
				//on success remove error
				setErrMessage(null);
				setStatus(200);
			}
		});
	});

	return (
		<div className="flex justify-center border-black-900 w-screen h-full"
		>
			<form
				onSubmit={handleSubmit(mutate)}
				id="UpdateAccount"
				className="flex flex-col h-full w-2/3 border-2 border-slate-500 shadow-lg bg-indigo-500 p-7 rounded-xl  shadow-indigo-800 m-9"
			>
				<A href={`/dashboard`} className="ml-auto">
					<Button
						className="w-fit bg-indigo-700 md:text-base sm:text-xs text-white p-1 rounded-lg shadow-inner shadow-indigo-300 border"
						text="Skip"
						type="button"
					/>
				</A>
					<h1 className="mx-auto text-indigo-900 font-bold">Company Information</h1>
				<LabelInput
					labelText="Company"
					type="text" id="company" name="company"
					reference={register("company")}
				/>
				<LabelInput
					labelText="Manager"
					type="text" id="manager" name="manager"
					reference={register("manager")}
					
				/>
					<h1 className="mx-auto mt-5 text-indigo-900 font-bold">User Information</h1>
				<LabelInput
					labelText="Gender"
					type="text" id="sex" name="gender"
					reference={register("sex")}
					
				/><LabelInput
					labelText="Phone Number"
					type="tel" id="phone" name="phone"
					reference={register("phone")}
					
				/>
				
				<label className="mx-auto mt-5 text-indigo-900 font-bold">Home Address</label>
				
				<LabelInput
					labelText="Street"
					type="text" id="street" name="street"
					reference={register("street")}
					
				/><LabelInput
					labelText="City"
					type="text" id="city" name="city"
					reference={register("city")}
					
				/><LabelInput
					labelText="State"
					type="text" id="state" name="state"
					reference={register("state")}
					
				/><LabelInput
					labelText="Zip"
					type="text" id="zip" name="zip"
					reference={register("zip")}
					
				/>
				{errMessage && <span className="ml-[12%] text-red-900">{errMessage}</span>}		
				{status != 200 && (
					<Button
						className="w-fit m-auto mt-5 bg-indigo-700 md:text-base text-xs text-white  p-1 rounded-3xl shadow-inner shadow-indigo-300 border"
						form="UpdateAccount"
						text="Update"
						type="submit"
					/>) 
						}
						{status == 200 ? (
							<A href={`/dashboard`} className='ml-auto'>
					<Button
							className="w-fit bg-indigo-700 md:text-base sm:text-xs text-white p-1 rounded-lg shadow-inner shadow-indigo-300 border"
							text="Next"
							type="button"
						/>
				</A>
				):null}
							
			</form>
		</div>
	);
};
