import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [long, setLong] = useState();
	const [lat, setLat] = useState();
	const [error, setError] = useState({ message: null });

	const loading = !long || !lat ? true : false;

	const setCoordinates = (long, lat) => {
		setLong(long);
		setLat(lat);
	};

	const getLocationSuccessfully = (position) => {
		const freshLong = position.coords.longitude.toFixed(7);
		const freshLat = position.coords.latitude.toFixed(7);

		if (freshLong !== long || freshLat !== lat) {
			setCoordinates(freshLong, freshLat);
		}
	};

	const getLocationIssue = (e) => {
		setError(e);
	};

	useEffect(() => {
		const timer = setInterval(() => {
			navigator.geolocation.getCurrentPosition(
				getLocationSuccessfully,
				getLocationIssue,
				{ enableHighAccuracy: true }
			);
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	const handledLog = error?.message
		? error.message
		: loading
		? "Loading..."
		: "long: " + long + " | " + "Lang: " + lat;

	return (
		<div className="App">
			<h1>{handledLog}</h1>
		</div>
	);
}

export default App;
