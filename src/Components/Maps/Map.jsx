import React, { useState } from "react";
import Geocode from "react-geocode";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { FaAnchor } from "react-icons/fa";
import Swal from "sweetalert2";
Geocode.setApiKey("AIzaSyDp8i_SiNUXrpREuWYpTXpBys9-sdYLWro");
export default function PBUGoogleMap() {
  const [latLong, setlatLong] = useState({
    latitude: 39.09366,
    longitude: -94.5875,
  });
  const showLabel = (text) => {
    Swal.fire(text);
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

  const generateMapsLink = (lat, lng) => {
    const baseUrl = "https://www.google.com/maps/search/?api=1&query=";
    const location = encodeURIComponent(`${lat},${lng}`);
    const link = `${baseUrl}${location}`;
    return link;
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
                    key={index}
                    position={{
                      lat: value.lat,
                      lng: value.lng,
                    }}
                    onClick={() => {
                      const link = generateMapsLink(value.lat, value.lng);
                      window.open(link, "_blank");
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
