import { React, useState } from "react";
import { Button } from "../util_components/Button";
import { A } from "hookrouter";
import { registerAPI } from "../../apiUtils";
import { LabelInput } from "../util_components/Label_input";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

export const RegisterUser = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [errMessage, setErrMessage] = useState();
	const [status, setStatus] = useState();
	const [showPassword, setShowPassword] = useState(false);

	//used to set path
	let id = sessionStorage.getItem("sys_id");

	//Mutation Hook to POST REST
	const { mutate} = useMutation((data) => {
		registerAPI(data).then((res) => {

			if (res.toString().indexOf("Error") != -1) {
				setErrMessage(res.toString());
				setStatus(500);
			} else {
				setErrMessage(null);
				sessionStorage.setItem("sys_id", res.sys_user.sys_id);
				sessionStorage.setItem("user_id", res.sys_user.user_id);
				sessionStorage.setItem("token", res.sys_user.token);
				setStatus(200);
			}
		});
	});
	//Show password state toggle
	const toggleVisible = (prev) => {
		return setShowPassword(!prev);
	}

	return (
		<>
			{status == 200 ? (
				<div className="flex flex-col w-full ">
					<div className="flex flex-col bg-indigo-800 text-white p-5 border-4 border-indigo-300 w-full self-center m-9">
					<h1 className="mx-auto font-extrabold text-xl">Welcome to TimeKeeper!</h1>
					</div>
					<div className="flex flex-col bg-indigo-800 text-white p-5 border-4 border-indigo-300 w-fit self-center">
						<h1>
							Hello {sessionStorage.getItem("user_id")}, Your account has been
							created!
						</h1>
					</div>
						<A href={`/register/update-user/${id}`} className="w-fit bg-indigo-700 text-white px-3 rounded-3xl shadow-inner shadow-indigo-300 border self-center mt-5">
							<Button text="Next" bgColor="green" />
						</A>
				</div>
			) : (
				<div className="flex justify-center border-black-900 w-screen h-5/6 ">
					<form
						onSubmit={handleSubmit(mutate)}
						autoComplete="on"
						id="createUser"
						className="flex flex-col h-full md:w-7/12 sm:w-2/4 border-2 border-slate-500 shadow-lg bg-indigo-500 p-7 rounded-xl  shadow-indigo-800"
					>
						<h1 className="text-indigo-700 font-extrabold text-2xl">
							Create an Account
						</h1>
						<LabelInput
							labelText="UserName"
							type="text"
							id="user_id"
							name="user_id"
							autoFocus="autofocus"
							reference={register("user_id", { required: "Required" })}
						/>
						{errors.user_id && (
							<span className="ml-[12%] text-red-900">{errors.user_id.message}</span>
						)}
						{errMessage && <span className="ml-[12%] text-red-900">{errMessage}</span>}
						<LabelInput
							labelText="Password"
							type={showPassword?'text':"password"}
							id="password"
							name="password"
							reference={register("password", {
								required: "Required",
								minLength: {
									value: 8,
									message: "Password must be 8 characters long.",
								},
							})}
						/>
						{errors.password && (
							<span className="ml-[12%] text-red-900">
								{errors.password.message}
							</span>
							)}
							<LabelInput
					containerClass="flex flex-col"
					inputClass='self-end mr-10'
					labelClass='self-end text-white'
					labelText="Show Password"
					type="checkbox"
					onChange={()=> toggleVisible(showPassword)}
				/>
						<LabelInput
							labelText="Email"
							id="email"
							name="email"
							reference={register("email", {
								required: "Required",
								pattern: {
									value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
									message: "Invalid Email",
								},
							})}
						/>
						{errors.email && (
							<span className="ml-[12%] text-red-900">{errors.email.message}</span>
						)}
						<LabelInput
							labelText="First Name"
							id="first_name"
							name="first_name"
							reference={register("first_name", { required: "Required" })}
						/>

						{errors.first_name && (
							<span className="ml-[12%] text-red-900">{errors.first_name.message}</span>
						)}
						<LabelInput
							labelText="Last Name"
							id="last_name"
							name="last_name"
							reference={register("last_name", { required: "Required" })}
						/>
						{errors.last_name && (
							<span className="ml-[12%] text-red-900">{errors.last_name.message}</span>
						)}
						<div className="mx-auto m-3">
							<Button
								className="w-fit bg-indigo-700 text-white px-3 rounded-3xl shadow-inner shadow-indigo-300 border"
								form="createUser"
								text="Create Account"
								type="submit"
							/>
						</div>
					</form>
				</div>
			)}
		</>
	);
};
