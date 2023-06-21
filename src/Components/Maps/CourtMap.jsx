import React, { useState } from "react";
import Geocode from "react-geocode";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { FaAnchor } from "react-icons/fa";
import Swal from "sweetalert2";
Geocode.setApiKey("AIzaSyDp8i_SiNUXrpREuWYpTXpBys9-sdYLWro");
export default function PBUCourtGoogleMap() {
  const [searchResult, setSearchResult] = useState(null);
  const [latLong, setlatLong] = useState({
    latitude: 39.09366,
    longitude: -94.5875,
  });
  const showLabel = (text, link) => {
    Swal.fire({
      title: text,
      showCancelButton: true,
      confirmButtonText: "Open In Google Maps",
    }).then((result) => {
      if (result.isConfirmed) {
        window.open(link, "_blank");
      }
    });
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
            style={{ minHeight: "500px" }}
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
              minHeight: "500px",
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
                    // onClick={() => {
                    //   console.log(value);
                    //   showLabel(value.street);
                    // }}
                    onClick={() => {
                      const link = generateMapsLink(value.lat, value.lng);
                      showLabel(value.street, link);
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
