import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

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

const MapThingy = () => {
  return (
    <MapContainer
      center={[33.7756, -84.3963]}
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
      <Marker position={[33.7703, -84.3925]} icon={houseIcon}></Marker>
    </MapContainer>
  );
};

export default MapThingy;
