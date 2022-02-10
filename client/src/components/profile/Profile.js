import RegisterContext from "../../Context/RegisterContext";
import { useContext } from "react";
import { useQuery } from "react-query";
import { getUser } from "../../apiUtils";

export const Profile = () => {
	const my_Context = useContext(RegisterContext);
	const { optionalFieldRes } = my_Context;
	let dataArr = [];
	const { isSuccess, isLoading, isError, data, error } = useQuery(
		"userInfo",
		getUser
	);
	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: {error.message}</span>;
	}
	if (isSuccess) {
		console.log(data);
	
    let values = Object.entries(data.rows[0]);
   values = values.filter((index) => {
     return index[1] != null;
    })
		console.log(values);

		return (
			<div>
				<table>
					<thead>
						<tr>
							{values.map((elm, i) => {
                return <th key={i}>{elm[0]}</th>
          })}
						</tr>
					</thead>
					<tbody>
            <tr>
              {values.map((elm, i) => {
                return <td>{elm[1]}</td>
          })}
            </tr>
					</tbody>
				</table>
			</div>
		);
	}
};
