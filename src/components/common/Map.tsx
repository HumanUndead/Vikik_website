import React, { useRef } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

interface GeolocationModalProps {
  articles: any;
}

const GeolocationModal: React.FC<GeolocationModalProps> = ({ articles }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) {
    return (
      <div className="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-gray-100 tw-z-50">
        {/* Circular Loading Indicator */}
        <div className="tw-animate-spin tw-rounded-full tw-h-12 tw-w-12 tw-border-t-2 tw-border-b-2 tw-border-gray-500"></div>
      </div>
    );
  }

  function htmlToText(html: string): string {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || "";
  }

  return (
    <>
      {/* Full-Screen Overlay */}
      <div className="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center tw-z-50 tw-bg-gray-100">
        {/* Card Container */}
        <div className="tw-bg-white tw-w-full tw-h-full tw-flex tw-flex-col tw-relative tw-shadow-2xl">
          {/* Header */}
          <div className="tw-bg-gray-300 tw-text-white tw-p-4 tw-flex tw-items-center tw-justify-between">
            <div className="tw-flex tw-items-center tw-gap-4">
              <h2 className="tw-text-lg tw-font-bold tw-text-gray-800">s</h2>
            </div>
            <button className="tw-text-gray-800 hover:tw-text-gray-200 tw-transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="tw-h-6 tw-w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {/* Map Container */}
          <div className="tw-relative  w-full h-[400px] lg:h-[800px]">
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={{ lat: 31.963158, lng: 35.930359 }}
              zoom={7}
              options={{
                streetViewControl: false,
                mapTypeControl: true,
                fullscreenControl: true,
                zoomControl: true,
                styles: [
                  {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "on" }],
                  },
                  {
                    featureType: "transit",
                    elementType: "labels",
                    stylers: [{ visibility: "on" }],
                  },
                ],
              }}
            >
              {articles.map((article, idx) => (
                <Marker
                  key={article.id || idx}
                  position={{
                    lat:
                      Number(htmlToText(article.MiddleDescription)) ||
                      32.5314559,
                    lng:
                      Number(htmlToText(article.ShortDescription)) ||
                      35.8776817,
                  }}
                  onClick={() => {
                    const lat =
                      Number(htmlToText(article.MiddleDescription)) ||
                      32.5314559;
                    const lng =
                      Number(htmlToText(article.ShortDescription)) ||
                      35.8776817;
                    const url = `https://www.google.com/maps?q=${lat},${lng}`;
                    window.open(url, "_blank");
                  }}
                />
              ))}
            </GoogleMap>
          </div>
        </div>
      </div>
    </>
  );
};
export default GeolocationModal;
