import React, { useRef, useState } from 'react';
import useSupercluster from 'use-supercluster';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';
import useRestaurants from '../../hooks/useRestaurants.js';
import InfoView from './InfoView';

require('dotenv').config();

const Marker = ({ children }) => children;

const RestaurantMap = () => {
  const myAPIKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const mapRef = useRef();
  const [zoom, setZoom] = useState(10);
  const [bounds, setBounds] = useState(null);
  const restaurants = useRestaurants();

  const defaultCenter = {};
  const setCurrentLocation = (position) => {
    defaultCenter.lat = position.coords.latitude;
    defaultCenter.lng = position.coords.longitude;
  };

  if (navigator.geolocation.getCurrentPosition(setCurrentLocation)) {
  } else {
    defaultCenter.lat = 25.04267234987771;
    defaultCenter.lng = 121.56497334150076;
  }

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

export default RestaurantMap;
