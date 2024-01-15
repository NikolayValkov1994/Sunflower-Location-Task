import "./App.css";
import useMyLocation from "./hooks/useMyLocation";

function App() {
	//useMyLocation returns location info, error and loading state
	const { locationInfo, error, loading } = useMyLocation();

	return (
		<div className="App">
			{loading ? (
				<h1>Loading...</h1>
			) : error?.message === "" ? (
				<div>
					<h1>
						<strong>{"Lat: " + locationInfo.lat}</strong>
						<strong>{"Lon: " + locationInfo.lon}</strong>
					</h1>
				</div>
			) : (
				<h1>{error.message}</h1>
			)}
		</div>
	);
}

export default App;
