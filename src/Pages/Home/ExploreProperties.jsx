import React, { useState } from 'react';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 37.7749, // Default center (San Francisco)
  lng: -122.4194
};

const libraries = ['places']; // Required for Autocomplete

function ExploreProperties() {
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const onAutocompleteLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete && map) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        map.panTo(place.geometry.location);
        map.setZoom(15); // Zoom in when a place is selected
      }
    }
  };

  return (
    <div className='py-10'>
      <div className='text-center my-6'>
        <h1 className='text font-bold text-2xl'>Explore Properties on the Map</h1>
        <p className='text-gray-400'>Whether you're looking to buy or sell land, we have the right tools and features for you.</p>
      </div>
      <LoadScript
        googleMapsApiKey="AIzaSyBzV7Gcll5fLZqubPQ4ZUW9h0DZjc1JAEE"
        libraries={libraries}
      >
        <div className='relative'>
          <Autocomplete
            onLoad={onAutocompleteLoad}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              type='text'
              placeholder='Search for a location'
              className='w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              style={{ maxWidth: '400px', margin: '0 auto' }}
            />
          </Autocomplete>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
          >
            {/* Map markers or other components can be added here */}
          </GoogleMap>
        </div>
      </LoadScript>
      <div className='flex justify-center mt-10'>
        <button className='bg-blue-500 text-white py-3 px-6 rounded-xl flex justify-center cursor-pointer'>
          Open Map View
        </button>
      </div>
    </div>
  );
}

export default ExploreProperties;


