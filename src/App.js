import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false); // New state variable for loading

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=b578c12a7c0d381305eef1d5bfc8a80b`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      setLoading(true); // Set loading state to true
      axios.get(url).then((response) => {
        setData(response.data);
        setLoading(false); // Set loading state to false after data is fetched
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          type="text"
          placeholder="Enter location"
        />
      </div>
      <div className="container">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="okay">
            <div className="top">
              <div className="location">
                <p>{data.name}</p>
              </div>
              <div className="temp">
                {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
              </div>
              <div className="description">
                {data.weather ? <p>{data.weather[0].main}</p> : null}
              </div>
            </div>
            {data.name !== undefined && (
              <div className="bottom">
                <div className="feels">
                  {data.main ? (
                    <p className="bold">{data.main.feels_like.toFixed()}°F</p>
                  ) : null}
                  <p>Feels like</p>
                </div>
                <div className="humidity">
                  {data.main ? (
                    <p className="bold">{data.main.humidity}%</p>
                  ) : null}
                  <p>Humidity</p>
                </div>
                <div className="wind">
                  {data.wind ? (
                    <p className="wind">{data.wind.speed.toFixed()} MPH</p>
                  ) : null}
                  <p>Wind speed</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
