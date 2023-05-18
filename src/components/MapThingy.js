import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useCallback, useContext } from "react";
import { AppContext } from "/src/components/AppState.js";

const icon = new L.icon({
  // iconUrl: "/images/icons8-building-100.png",
  iconUrl:
    "https://1000logos.net/wp-content/uploads/2021/06/Georgia-Tech-Yellow-Jackets-logo.png",
  iconSize: [38.4 * 5, 21.6 * 5],
  // iconAnchor: [20, 20],
});

const houseIcon = new L.icon({
  iconUrl: "/images/icons8-building-100.png",
  iconSize: [40, 40],
});

const defaultCenter = [33.7756, -84.3963];

export default function MapThingy() {
  let { mapCenter, setMapCenter } = useContext(AppContext);

  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(defaultCenter);

  // const onClick = useCallback(() => {
  //   map.setView(center, zoom);
  // }, [map]);

  const onMove = useCallback(() => {
    if (map) {
      const center = map.getCenter();
      setPosition([center.lat, center.lng]);
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      map.on("move", onMove);
      return () => {
        map.off("move", onMove);
      };
    }
  }, [map, onMove]);

  return (
    <MapContainer
      center={position}
      ref={setMap}
      zoom={15}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
      className=" z-0"
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        url="https://api.mapbox.com/styles/v1/f4jfkfdj/clgc7yln9005401ok46tgl6g9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZjRqZmtmZGoiLCJhIjoiY2xnYzd1emZ5MDljMzN0c3g3YjU2azRuYyJ9.IfQPt_OC5nHkmVYn2tq_NA
        "
        //   />
      />
      <Marker position={[33.777, -84.3975]} icon={icon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      {/* <Marker position={[33.7703, -84.3925]} icon={houseIcon}></Marker> */}
    </MapContainer>
  );
}
