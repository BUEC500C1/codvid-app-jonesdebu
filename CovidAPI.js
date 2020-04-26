global.myPlace;

fetch('https://api.covid19api.com/country/south-africa/status/confirmed/live?from=2020-04-01T00:00:00Z&to=2020-04-10T00:00:00Z', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },

})

.then((response) => response.json())
.then((response) => {
  console.log(response[0])

  myPlace = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [response[0].Lat, response[0].Lon],
        }
      }
    ]
  };
