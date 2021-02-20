mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 15,
  center: store.geometry.coordinates,
});

const marker = new mapboxgl.Marker()
  .setLngLat(store.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 })
      .setHTML(
        `<h3>${store.name}</h3>`,
      ),
  )
  .addTo(map);
