import { useEffect, useState } from "react";

//From these options we can manage how to get the user location
//If enableHighAccuracy is true it returns the user location more accurate.
//maximumAge is a option that controls how to get the location from the cache.(0 means that we won't take the location from cache).
const OPTIONS = { enableHighAccuracy: true, maximumAge: 0 };

const useMyLocation = () => {
	const [locationInfo, setLocationInfo] = useState({
		lon: 0,
		lat: 0,
	});
	const [error, setError] = useState({ message: "" });
	const [loading, setLoading] = useState(false);

	//Update states if the geolocation info is returned successfully
	const onSuccess = (position) => {
		const freshLon = position.coords.longitude;
		const freshLat = position.coords.latitude;

		//If the coordinates are changed update them
		if (freshLon !== locationInfo?.lon || freshLat !== locationInfo?.lat) {
			setLocationInfo({ lon: freshLon, lat: freshLat });
		}
		setLoading(false);
	};

	const onError = (error) => {
		setError(error);
		setLoading(false);
	};

	useEffect(() => {
		try {
			//Check if the browser supports geolocation
			if (navigator.geolocation) {
				setLoading(true);

				//watchPosition returns the user location when the device location is changed
				const watcherId = navigator.geolocation.watchPosition(
					onSuccess,
					onError,
					OPTIONS
				);

				return () => {
					navigator.geolocation.clearWatch(watcherId);
				};
			} else {
				throw new Error(
					"Geolocation is not supported by this browser."
				);
			}
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	}, []);

	return {
		locationInfo,
		error,
		loading,
	};
};

export default useMyLocation;
