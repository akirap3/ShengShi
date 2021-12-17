import styled from 'styled-components';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

require('dotenv').config();
const GoogleMapsAPI = process.env.REACT_APP_GOOGLE_API_KEY;
const googleMapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GoogleMapsAPI}`;

const StyledLoadingElement = styled.div`
  height: 100%;
`;

const StyledContainerElement = styled.div`
  height: 200px;
`;

const StyledMapElement = styled.div`
  height: 100%;
  border-radius: 10px;
`;

const LocationMap = compose(
  withProps({
    googleMapURL,
    loadingElement: <StyledLoadingElement />,
    containerElement: <StyledContainerElement />,
    mapElement: <StyledMapElement />,
    isMarkerShown: true,
  }),
  withScriptjs,
  withGoogleMap
)(({ exchangeLocation }) => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={
      exchangeLocation
        ? {
            lat: exchangeLocation._lat,
            lng: exchangeLocation._long,
          }
        : { lat: 25.04267234987771, lng: 121.56497334150076 }
    }
  >
    <Marker
      position={
        exchangeLocation
          ? {
              lat: exchangeLocation._lat,
              lng: exchangeLocation._long,
            }
          : { lat: 25.04267234987771, lng: 121.56497334150076 }
      }
    />
  </GoogleMap>
));

export default LocationMap;
