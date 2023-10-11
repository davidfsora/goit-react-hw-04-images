import { useState, useEffect } from "react";
import axios from "axios";

// export default async function useFetch({ url, method }) {
// 	let response = await axios({ method, url });
// 	return { ...response };
// }

export default function useFetchImages({ url, method }) {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios({ method, url });
				setData(response.data);
			} catch (err) {
				setError(err);
			}
		};

		fetchData();
	}, [url, method]);

	return { data, error };
}

