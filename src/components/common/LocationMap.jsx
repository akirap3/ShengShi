import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const LocationMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: (
      <div
        style={{
          height: `100%`,
        }}
      />
    ),
    containerElement: (
      <div
        style={{
          height: `200px`,
        }}
      />
    ),
    mapElement: <div style={{ height: `100%`, borderRadius: `10px` }} />,
    isMarkerShown: true,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={
      props.exchangeLocation
        ? {
            lat: props.exchangeLocation._lat,
            lng: props.exchangeLocation._long,
          }
        : { lat: 25.04267234987771, lng: 121.56497334150076 }
    }
  >
    <Marker
      position={
        props.exchangeLocation
          ? {
              lat: props.exchangeLocation._lat,
              lng: props.exchangeLocation._long,
            }
          : { lat: 25.04267234987771, lng: 121.56497334150076 }
      }
    />
  </GoogleMap>
));

export default LocationMap;
