import React, { useRef, useState, useEffect, useCallback } from 'react';
import useSupercluster from 'use-supercluster';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';
import { getAllContents } from '../../utils/firebase';
import InfoView from './InfoView';
import ReactLoading from 'react-loading';

require('dotenv').config();

const Marker = ({ children }) => children;

const RestaurantMap = () => {
  const myAPIKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const mapRef = useRef();
  const [zoom, setZoom] = useState(10);
  const [bounds, setBounds] = useState(null);
  const [restaurants, setRestaurants] = useState();
  const [defaultCenter, setDefaultCenter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const setCurrentLocation = (position) => {
    setDefaultCenter({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setCurrentLocation);
    } else {
      setDefaultCenter({ lat: 25.04267234987771, lng: 121.56497334150076 });
      setIsLoading(false);
    }
  }, []);

  const getRestaurants = useCallback(() => {
    getAllContents('restaurants', setRestaurants);
  }, []);

  useEffect(() => {
    return getRestaurants();
  }, [getRestaurants]);

  const points =
    restaurants?.map((restaurant) => ({
      type: 'Feature',
      properties: {
        cluster: false,
        restaurantId: restaurant.id,
        imageUrl: restaurant.imageUrl,
        restaurantName: restaurant.name,
        rating: restaurant.rating,
        address: restaurant.address,
      },
      geometry: {
        type: 'Point',
        coordinates: [
          parseFloat(restaurant.location._long),
          parseFloat(restaurant.location._lat),
        ],
      },
    })) || [];

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: {
      radius: 75,
      maxZoom: 20,
    },
  });

  // console.log(clusters);

  const getLatLng = (e) => {
    console.log(e.lat);
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {isLoading ? (
        <StyledLoading
          type={'spin'}
          color={'#2a9d8f'}
          height={'10vw'}
          width={'10vw'}
        />
      ) : (
        <GoogleMapReact
          // bootstrapURLKeys={{ key: myAPIKey }}
          defaultCenter={defaultCenter}
          defaultZoom={12}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map }) => {
            mapRef.current = map;
          }}
          onChange={({ zoom, bounds }) => {
            setZoom(zoom);
            setBounds([
              bounds.nw.lng,
              bounds.se.lat,
              bounds.se.lng,
              bounds.nw.lat,
            ]);
          }}
          onClick={(e) => getLatLng(e)}
        >
          {clusters.map((cluster) => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const {
              cluster: isCluster,
              point_count: pointCount,
              imageUrl,
              restaurantName,
              rating,
              address,
            } = cluster.properties;

            if (isCluster) {
              return (
                <Marker key={cluster.id} lat={latitude} lng={longitude}>
                  <StyledDiv
                    style={{
                      width: `${10 + (pointCount / points.length) * 40}px`,
                      height: `${10 + (pointCount / points.length) * 40}px`,
                    }}
                    onClick={() => {
                      const expansionZoom = Math.min(
                        supercluster.getClusterExpansionZoom(cluster.id),
                        20
                      );
                      mapRef.current.setZoom(expansionZoom);
                      mapRef.current.panTo({ lat: latitude, lng: longitude });
                    }}
                  >
                    {pointCount}
                  </StyledDiv>
                </Marker>
              );
            }

            return (
              <Marker
                key={cluster.properties.restaurantId}
                lat={latitude}
                lng={longitude}
              >
                <InfoView
                  imageUrl={imageUrl}
                  restaurantName={restaurantName}
                  rating={rating}
                  address={address}
                />
              </Marker>
            );
          })}
        </GoogleMapReact>
      )}
    </div>
  );
};

const StyledDiv = styled.div`
  color: #fff;
  background: #1978c8;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLoading = styled(ReactLoading)`
  display: flex;
  position: relative;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default RestaurantMap;
