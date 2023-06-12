import React, { useState } from "react";
import Geocode from "react-geocode";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { FaAnchor } from "react-icons/fa";
import Swal from "sweetalert2";
Geocode.setApiKey("AIzaSyDp8i_SiNUXrpREuWYpTXpBys9-sdYLWro");
export default function PBUGoogleMap() {
  const [searchResult, setSearchResult] = useState(null);
  const [latLong, setlatLong] = useState({
    latitude: 39.09366,
    longitude: -94.5875,
  });
  const showLabel = (text) => {
    Swal.fire(text);
    // console.log(text);
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDp8i_SiNUXrpREuWYpTXpBys9-sdYLWro",
    libraries: ["places"],
  });

  const onDargEndGetAddress = ({ latLng }) => {
    setlatLong({
      latitude: latLng.lat(),
      longitude: latLng.lng(),
    });
  };

  const render = ({ marker = {}, isCenter = false }) => {
    return (
      <>
        {isLoaded ? (
          <GoogleMap
            zoom={8}
            center={
              isCenter
                ? {
                    lat: marker?.positions[0]?.lat,
                    lng: marker?.positions[0]?.lng,
                  }
                : {
                    lat: latLong.latitude,
                    lng: latLong.longitude,
                  }
            }
            // onBoundsChanged={(e) => console.log(e)}
            mapContainerStyle={{
              maxHeight: "100%",
              height: "80%",
              width: "100%",
            }}
          >
            {marker.positions?.length > 0 ? (
              <>
                {marker.positions.map((value, index) => (
                  <Marker
                    {...marker}
                    key={index}
                    position={{
                      lat: value.lat,
                      lng: value.lng,
                    }}
                    onClick={() => {
                      console.log(value);
                      showLabel(value.street);
                    }}
                    onDragEnd={onDargEndGetAddress}
                  >
                    <FaAnchor />
                  </Marker>
                ))}
              </>
            ) : (
              <Marker
                {...marker}
                position={{
                  lat: latLong.latitude,
                  lng: latLong.longitude,
                }}
                onDragEnd={onDargEndGetAddress}
              />
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
