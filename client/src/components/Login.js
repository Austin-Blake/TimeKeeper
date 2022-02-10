import { React, useState, useEffect } from "react";
import { login } from "../apiUtils";
import { A, navigate } from "hookrouter";
import { Button } from "./util_components/Button";
import { useMutation } from "react-query";
import { LabelInput } from "./util_components/Label_input";
import { useForm } from "react-hook-form";

export const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [showPassword, setShowPassword] = useState(false);
	const [errMessage, setErrMessage] = useState();

	//POST Request for user login
	const { mutate } = useMutation(data => {
		login(data).then(res => {
			//if error
			if (res.toString().indexOf("Error") != -1) {
				setErrMessage(res.toString());
			} else {
					//if user login success set session data
				setErrMessage(null);
				sessionStorage.setItem("sys_id", res.sys_user.sys_id);
				sessionStorage.setItem("user_id", res.sys_user.user_id);
				sessionStorage.setItem("token", res.sys_user.token);
				setTimeout(() => {
					navigate("/dashboard", true);
				}, 1000);
			}
		})
	});





	//Show password state toggle
	const toggleVisible = (prev) => {
		return setShowPassword(!prev);
	};

	return (
		<div className="flex flex-col border-black-900 w-screen h-screen ">
			<form
				onSubmit={handleSubmit(mutate)}
				className="flex flex-col h-fit md:w-7/12 sm:w-2/4 border-2 border-slate-500 shadow-lg  bg-indigo-500 p-7 rounded-xl  shadow-indigo-800 mx-auto"
				autoComplete="on"
				id="Login"
			>
				<h1 className="text-indigo-700 font-extrabold text-2xl">
					LOGIN
				</h1>
				{errMessage && <span className="ml-[12%] text-red-900">{errMessage}</span>}
				<LabelInput
					labelText="UserName"
					type="text"
					id="user_id"
					name="user_id"
					reference={register("user_id", { required: "Required" })}
				/>
				{errors.user_id && (
					<span className="ml-[12%] text-red-900">{errors.user_id.message}</span>
				)}
				<LabelInput
					labelText="Password"
					type={showPassword ? "text" : "password"}
					id="password"
					name="password"
					reference={register("password", { required: "Required" })}
				/>
				{errors.password && (
					<span className="ml-[12%] text-red-900">
						{errors.password.message}
					</span>
				)}
				<LabelInput
					containerClass="flex flex-col"
					inputClass="self-end mr-10"
					labelClass="self-end text-white"
					labelText="Show Password"
					type="checkbox"
					onChange={() => toggleVisible(showPassword)}
				/>
				<Button
					className="w-fit self-center bg-indigo-700 text-white px-3 rounded-3xl shadow-inner shadow-indigo-300 border"
					form="Login"
					text="Login"
					color="white"
					type="submit"
				>
					Submit
				</Button>
			</form>
			<div className="flex justify-center mt-4">
				<p>Dont have an Account?</p>
				<A href={"/register"} className="text-blue-500">
					Register an Account
				</A>
			</div>
		</div>
	);
};
