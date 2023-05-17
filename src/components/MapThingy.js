import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapThingy = () => {
  return (
    <MapContainer
      center={[33.7756, -84.3963]}
      zoom={15}
      scrollWheelZoom={false}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        url="https://api.mapbox.com/styles/v1/f4jfkfdj/clgc7yln9005401ok46tgl6g9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZjRqZmtmZGoiLCJhIjoiY2xnYzd1emZ5MDljMzN0c3g3YjU2azRuYyJ9.IfQPt_OC5nHkmVYn2tq_NA
        "
        //   />
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapThingy;
