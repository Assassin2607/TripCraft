import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CloudSun, Loader2 } from 'lucide-react';

const WeatherWidget = ({ lat, lng, destinationName }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchWeather = async () => {
      try {
        setLoading(true);
        // Free third-party Weather API
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
        );
        const data = await res.json();
        if (isMounted) {
          setWeather(data.current_weather);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchWeather();
    return () => {
      isMounted = false;
    };
  }, [lat, lng]);

  if (loading) {
    return (
      <div className="weather-chip loading">
        <Loader2 className="spin-icon" size={14} />
        <span>Live weather for {destinationName}...</span>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="weather-chip">
      <CloudSun size={16} />
      <span>
        <strong>{weather.temperature}°C</strong> (Wind: {weather.windspeed} km/h)
      </span>
    </div>
  );
};

// Prop validation requirement
WeatherWidget.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  destinationName: PropTypes.string.isRequired
};

export default WeatherWidget;