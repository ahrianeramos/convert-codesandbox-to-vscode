import React, { useState } from "react";
import axios from "axios";

export default function Search(props) {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState({});
  const [submit, setSubmit] = useState(false);

  function displayTemperature(response) {
    setSubmit(true);
    setTemp({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "d181817faaf7ac4148d91ac2cdf0c65a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" onChange={updateCity} placeholder="Enter a city" />
      <button type="submit">Search</button>
    </form>
  );

  if (submit) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature: {Math.round(temp.temperature)}°C</li>
          <li>Description: {temp.description}</li>
          <li>Humidity: {temp.humidity}%</li>
          <li>Wind: {temp.wind}km/h</li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
