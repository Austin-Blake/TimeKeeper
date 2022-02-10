

//Login POST request
export async function login(obj) {
	console.log(obj);
	try {
		const response = await fetch("http://localhost:5000/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user_id: obj.user_id,
				password: obj.password,
			}),
		});

		if (response.ok) {
			const jsonRes = await response.json();
			console.log(jsonRes);
			return jsonRes;
		}
		throw new Error(await response.json());
	} catch (err) {
		console.error(err.message);
		return err;
	}
}

//Register Post request
export async function registerAPI(user) {
	try {
		const response = await fetch("http://localhost:5000/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				created_by: user.user_id,
				gender: user.gender || null,
				manager: user.manager || null,
				first_name: user.first_name,
				middle_name: user.middle_name || null,
				last_name: user.last_name,
				email: user.email,
				phone: user.phone || null,
				user_id: user.user_id,
				password: user.password,
				state: user.state || null,
				street: user.street || null,
				zip: user.zip || null,
			}),
		});

		if (response.ok) {
			const jsonRes = await response.json();
			return jsonRes;
		}
		throw new Error(await response.json());
	} catch (err) {
		console.error(err.message);
		return err;
	}
}

export async function registerUpdate(user) {
	const sys_id = sessionStorage.getItem("sys_id");
	//check if any values in obj
	if (Object.values(user).length == 0 || Object.values(user).every((x)=>x == '')) {
		return "No Data to Update!"
	}
	try {
		//check user obj key/values and only update what is sent.
		let obj = {};
		for (const [key, value] of Object.entries(user)) {
			if (value != "") obj[key] = value;
		}
		const response = await fetch(
			`http://localhost:5000/auth/register/update-user/${sys_id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(obj),
			}
		);

		if (response.ok) {
			const jsonRes = await response.json();
			return jsonRes;
		}
		throw new Error(await response.json());
	} catch (err) {
		console.error(err.message);
		return err;
	}
}

export const getUser = async () => {
	const sys_id = sessionStorage.getItem("sys_id");
	try {
		const response = await fetch(`http://localhost:5000/users/${sys_id}`);
		if (response.ok) {
			const jsonRes = await response.json();
			return jsonRes;
		}
		throw new Error("Request Failed!");
	} catch (err) {
		console.error(err.message);
	}
};
