import { useCallback, useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

import "./App.css";

import type { ChangeEvent } from "react";
import type {
  MapCameraChangedEvent,
  MapCameraProps,
} from "@vis.gl/react-google-maps";

// TODO: Get a Google Maps Platform API key:
/*
 * 1. Open the Project IDX view by pressing Ctrl+Shift+P / Cmd+Shift+P and type "IDX focus", then select "IDX: Focus on Project IDX View"
 * 2. Click on the "Google Maps Platform" integration.
 * 3. Click "Enable APIs" to enable the Google Maps Platform APIs.
 * 4. Click "Get API Key" to get an API key.
 * 5. Create a file named .env.local in the root directory. The .local suffix keeps secrets out of source control.
 * 6. In the file, add the line: VITE_MAPS_API_KEY=YOUR_API_KEY.
 * 7. Replace YOUR_API_KEY with the API key you got in step 4. */
const MAPS_API_KEY = import.meta.env.VITE_MAPS_API_KEY as string;

const SANTIAGO_LOCATION = { lat: -33.45722938110794, lng: -70.66642630502507 };
const LAGOS_LOCATION = { lat: 6.537278579005752, lng: 3.3148704496574943 };

const SANTIAGO_CAMERA_STATE = {
  center: SANTIAGO_LOCATION,
  zoom: 10,
  heading: 0,
  tilt: 0,
};

const LAGOS_CAMERA_STATE = {
  center: LAGOS_LOCATION,
  zoom: 10,
  heading: 0,
  tilt: 0,
};

function App() {
  const [cameraState, setCameraState] = useState<MapCameraProps>(
    SANTIAGO_CAMERA_STATE,
  );
  const [city, setCity] = useState("santiago");

  const onCameraChanged = useCallback((ev: MapCameraChangedEvent) => {
    setCameraState(ev.detail);
  }, []);

  const onCityChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    setCameraState(
      e.target.value === "santiago"
        ? SANTIAGO_CAMERA_STATE
        : LAGOS_CAMERA_STATE,
    );
  }, []);

  return (
    <>
      <h1>Vite + React + Google Maps Platform</h1>
      <div className="starter-instructions">
        <h2>Add an API key to reveal the map</h2>
        <ol>
          <li>
            Create a file named <code>.env.local</code> in the root directory.
            The <code>.local</code> suffix makes sure the file, and your API key
            within, is ignored when checking in to source control (per the
            .gitignore file).
          </li>
          <li>
            In the file, add the line:
            <br />
            <code>VITE_MAPS_API_KEY=YOUR_API_KEY</code>
          </li>
          <li>
            Press <code>Ctrl+Shift+P</code> (Windows) or{" "}
            <code>Cmd+Shift+P</code> (Mac) to open the command palette. Type
            "IDX focus" and choose "IDX: Focus on Project IDX View" to open the
            IDX integrations panel. Enable the Google Maps Platform integration,
            enable the APIs, and click "Get an API Key".
          </li>
          <li>
            Replace <code>YOUR_API_KEY</code> with an API key you obtained in
            the previous step.
          </li>
        </ol>
        <h2>Documentation</h2>
        <p>
          Visit{" "}
          <a href="https://developers.google.com/maps" target="_blank">
            developers.google.com/maps
          </a>{" "}
          for more about Google Maps Platform and{" "}
          <a href="https://goo.gle/react-google-maps" target="_blank">
            goo.gle/react-google-maps
          </a>{" "}
          for documentation and examples related to the
          @vis.gl/react-google-maps library.
        </p>
      </div>

      <div id="city-chooser">
        <p>
          <strong>Choose a city to update the state of the map center</strong>
        </p>
        <div id="radios">
          <label>
            <input
              type="radio"
              id="santiago"
              name="city"
              value="santiago"
              checked={city === "santiago"}
              onChange={onCityChange}
            />{" "}
            Santiago
          </label>
          <label>
            <input
              type="radio"
              id="lagos"
              name="city"
              value="lagos"
              checked={city === "lagos"}
              onChange={onCityChange}
            />{" "}
            Lagos
          </label>
        </div>
      </div>

      {/* Be sure to wrap the Map component in a container that has a width and height >0px in order for the map to be visible. */}
      <div id="map">
        <APIProvider
          apiKey={MAPS_API_KEY}
          solutionChannel="GMP_idx_templates_v0_reactts"
        >
          <Map
            // Get a Map ID to use cloud-based maps styling, advanced markers, and vector maps
            // Documentation at https://goo.gle/get-map-id
            mapId={"DEMO_MAP_ID"}
            disableDefaultUI={true}
            {...cameraState}
            onCameraChanged={onCameraChanged}
          >
            <Marker position={SANTIAGO_LOCATION} />
            <Marker position={LAGOS_LOCATION} />
          </Map>
        </APIProvider>
      </div>
    </>
  );
}

export default App;
