// Ajout du fond de carte

var map = new mapboxgl.Map({
    container: 'map',
    style: 'https://geoserveis.icgc.cat/contextmaps/positron.json',
    center: [-2.8816178480265826, 48.27287617786766],
    zoom: 8
});


// Ajout des données
var villes = 'https://raw.githubusercontent.com/Judthg/projet_webmapping/main/villes-historiques-de-bretagne.geojson'

map.on('load', function () {

    // Ajout villes historiques de bretagne

    map.addSource(
        'villes',
        {
            type: 'geojson',

            // GeoJSON hébergé sur GitHub
            data: villes
            
        }
    );

    map.addLayer({
        'id': 'villes',
        'type': 'circle',
        'source': 'villes',
        'paint': {
            'circle-color': 'blue',
            'circle-opacity': 0.9
        }
    });
});


//Interactivité HOVER

var popup = new mapboxgl.Popup({
    className: "Mypopup",
    closeButton: false,
    closeOnClick: false 
});

map.on('mousemove', function(e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['villes'] });
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

    if (!features.length) {
        popup.remove();
        return; 
    }
 
    var feature = features[0];
        popup.setLngLat(feature.geometry.coordinates)
          .setHTML('<b>'+ feature.properties.nom + '</b>' + '<hr>'+ feature.properties.code_insee + '</hr>')
        .addTo(map);

})