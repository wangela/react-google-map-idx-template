import { SetStateAction, useState } from 'react'
import './App.css'
import {
  APIProvider,
  Map,
  MapCameraProps,
  Marker
} from '@vis.gl/react-google-maps';

// Defined in .env.local
const MAPS_API_KEY = import.meta.env.VITE_MAPS_API_KEY as string;

const SANTIAGO_LOCATION = { lat: -33.45722938110794, lng: -70.66642630502507 };
const LAGOS_LOCATION = { lat: 6.537278579005752, lng: 3.3148704496574943 };

const SANTIAGO_CAMERA_STATE = {
  center: SANTIAGO_LOCATION,
  zoom: 10,
  heading: 0,
  tilt: 0
};

const LAGOS_CAMERA_STATE = {
  center: LAGOS_LOCATION,
  zoom: 10,
  heading: 0,
  tilt: 0
};

function App() {
  const [cameraState, setCameraState] =
    useState<MapCameraProps>(SANTIAGO_CAMERA_STATE);
  const [city, setCity] = useState("santiago");

  const onCityChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setCity(e.target.value)
    setCameraState(e.target.value === "santiago" ? SANTIAGO_CAMERA_STATE : LAGOS_CAMERA_STATE);
  }

  return (
    <>
      <h1>Vite + React + Google Maps Platform</h1>
      <div className="starter-instructions">
        <h2>Add an API key to reveal the map</h2>
        <ol>
          <li>Create a file named <code>.env.local</code> in the root directory. The <code>.local</code> suffix makes sure the file, and your API key within, is ignored when checking in to source control (per the .gitignore file).</li>
          <li>In the file, add the line:<br />

            <code>
              VITE_MAPS_API_KEY=YOUR_API_KEY
            </code>
          </li>
          <li>Replace <code>YOUR_API_KEY</code> with an API key you obtain from the Google Maps Platform integration in IDX.</li>
        </ol>
        <h2>Documentation</h2>
        <p>Visit <a href="https://developers.google.com/maps" target="_blank">developers.google.com/maps</a> for more about Google Maps Platform and <a href="https://goo.gle/react-google-maps" target="_blank">goo.gle/react-google-maps</a> for documentation and examples related to the @vis.gl/react-google-maps library.</p>
      </div>

      <div id="city-chooser">
        <p><strong>Choose a city to update the state of the map center</strong></p>
        <div id="radios">
          <input
            type="radio"
            id="santiago"
            name="city"
            value="santiago"
            checked={city === "santiago"}
            onChange={onCityChange} /> Santiago
          <input
            type="radio"
            id="lagos"
            name="city"
            value="lagos"
            checked={city === "lagos"}
            onChange={onCityChange} /> Lagos
        </div>
      </div>

      {/* Be sure to wrap the Map component in a container that has a width and height >0px in order for the map to be visible. */}
      <div id="map">
        <APIProvider apiKey={MAPS_API_KEY}>
          <Map
            // Get a Map ID to use cloud-based maps styling, advanced markers, and vector maps
            // Documentaiton at https://goo.gle/get-map-id
            mapId={'DEMO_MAP_ID'}
            {...cameraState}>
            <Marker position={SANTIAGO_LOCATION} />
            <Marker position={LAGOS_LOCATION} />
          </Map>
        </APIProvider>
      </div>
    </>
  )
}

export default App
