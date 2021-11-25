import { useRef, useState, useEffect } from 'react';

import styled from 'styled-components';
import useSupercluster from 'use-supercluster';
import GoogleMapReact from 'google-map-react';

import InfoView from './InfoView';
import Loading from '../common/Loading';

require('dotenv').config();

const Marker = ({ children }) => children;

const RestaurantMap = ({ restaurants }) => {
  const myAPIKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const mapRef = useRef();
  const [zoom, setZoom] = useState(10);
  const [bounds, setBounds] = useState(null);
  const [defaultCenter, setDefaultCenter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  const setCurrentLocation = (position) => {
    setDefaultCenter({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    if (isMounted) {
      setIsLoading(true);
      navigator.geolocation.watchPosition(setCurrentLocation, (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setDefaultCenter({ lat: 25.04267234987771, lng: 121.56497334150076 });
          setIsLoading(false);
        }
      });
    }
    return () => {
      setIsMounted(false);
    };
  }, [isMounted]);

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

  return (
    <div style={{ height: '80vh', width: '100%', position: 'relative' }}>
      {isLoading ? (
        <Loading />
      ) : (
        <GoogleMapReact
          bootstrapURLKeys={{ key: myAPIKey }}
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin: auto;
  padding: 10px;
  color: #fff;
  background: #52b788;
  border-radius: 50%;
  animation: scaling 2s infinite ease-out;

  @keyframes scaling {
    0% {
      transform: scale(1);
      opacity: 1;
    }

    100% {
      transform: scale(2);
      opacity: 0;
    }
  }
`;

export default RestaurantMap;
