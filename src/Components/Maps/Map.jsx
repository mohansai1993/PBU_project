import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Geocode from "react-geocode";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { FaAnchor } from "react-icons/fa";
Geocode.setApiKey("AIzaSyDp8i_SiNUXrpREuWYpTXpBys9-sdYLWro");
export default function PBUGoogleMap() {
  const [searchResult, setSearchResult] = useState(null);
  const [latLong, setlatLong] = useState({
    latitude: 39.09366,
    longitude: -94.5875,
  });
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDp8i_SiNUXrpREuWYpTXpBys9-sdYLWro",
    libraries: ["places"],
  });

  const onDargEndGetAddress = ({ latLng }) => {
    console.log(latLng.lat(), latLng.lng());
    setlatLong({
      latitude: latLng.lat(),
      longitude: latLng.lng(),
    });
  };

  const render = ({ marker = {} }) => {
    return (
      <>
        {isLoaded ? (
          <GoogleMap
            zoom={8}
            center={{
              lat: latLong.latitude,
              lng: latLong.longitude,
            }}
            // onBoundsChanged={(e) => console.log(e)}
            mapContainerStyle={{
              maxHeight: "100%",
              height: "80%",
              width: "100%",
            }}
          >
            {marker.positions ? (
              <>
                {marker.positions.map((value, index) => (
                  <Marker
                    {...marker}
                    key={index}
                    position={{
                      lat: value.lat,
                      lng: value.lng,
                    }}
                    onDragEnd={onDargEndGetAddress}
                  >
                    <FaAnchor />
                  </Marker>
                ))}
              </>
            ) : (
              <Marker {...marker} onDragEnd={onDargEndGetAddress} />
            )}
          </GoogleMap>
        ) : null}
      </>
    );
  };
  return {
    render,
    latLong,
    onDargEndGetAddress,
  };
}
