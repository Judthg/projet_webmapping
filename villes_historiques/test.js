// Ajout du fond de carte

var map = new mapboxgl.Map({
    container: 'map',
    style: 'https://geoserveis.icgc.cat/contextmaps/positron.json',
    center: [-2.8816178480265826, 48.27287617786766],
    zoom: 8
});


// Ajout des données
var villes = 'https://raw.githubusercontent.com/Judthg/projet_webmapping/main/villes-historiques-de-bretagne.geojson'

// On donne un id unique à chaque ville
villes.features.forEach(function (villes, i) {
    villes.properties.code_insee = i;
});

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
        /*'paint': {
            'circle-color': 'blue',
            'circle-opacity': 0.9
        }*/
    });
buildLocationList(villes);
});


// Configuration de la sidebar
function buildLocationList(data) {
data.features.forEach(function (villes, i) {

    // variable : raccourci de villes.properties
    var prop = villes.properties;

    /* Add a new listing section to the sidebar. */
    var listings = document.getElementById('listings');
    var listing = listings.appendChild(document.createElement('div'));
    /* Assign a unique `id` to the listing. */
    listing.id = 'listing-' + prop.code_insee;
    /* Assign the `item` class to each listing for styling. */
    listing.className = 'item';

    /* Add the link to the individual listing created above. */
    var link = listing.appendChild(document.createElement('a'));
    link.href = '#';
    link.className = 'title';
    link.id = 'link-' + prop.code_insee;
    link.innerHTML = prop.nom;

    /* Add details to the individual listing. */
    var details = listing.appendChild(document.createElement('div'));
    details.innerHTML = prop.code_insee;
    /*if (prop.phone) {
        details.innerHTML += ' &middot; ' + prop.phoneFormatted;
    }
    if (prop.distance) {
    var roundedDistance = Math.round(prop.distance * 100) / 100;
    details.innerHTML +=
        '<p><strong>' + roundedDistance + ' miles away</strong></p>';
    }*/ 

    /**
     * Listen to the element and when it is clicked, do four things:
     * 1. Update the `currentFeature` to the store associated with the clicked link
     * 2. Fly to the point
     * 3. Close all other popups and display popup for clicked store
     * 4. Highlight listing in sidebar (and remove highlight for all other listings)
     **/
    link.addEventListener('click', function (e) {
    for (var i = 0; i < data.features.length; i++) {
        if (this.code_insee === 'link-' + data.features[i].properties.code_insee) {
        var clickedListing = data.features[i];
        flyToStore(clickedListing);
        createPopUp(clickedListing);
        }
    }
    var activeItem = document.getElementsByClassName('active');
    if (activeItem[0]) {
        activeItem[0].classList.remove('active');
    }
    this.parentNode.classList.add('active');
    });
});
}

/**
 * Use Mapbox GL JS's `flyTo` to move the camera smoothly
 * a given center point.
 **/
function flyToStore(currentFeature) {
map.flyTo({
    center: currentFeature.geometry.coordinates,
    zoom: 15
});
}

/**
 * Create a Mapbox GL JS `Popup`.
 **/
function createPopUp(currentFeature) {
var popUps = document.getElementsByClassName('mapboxgl-popup');
if (popUps[0]) popUps[0].remove();

var popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML(
    '<h3>'+ currentFeature.properties.nom + '</h3>' +
        '<h4>' +
        currentFeature.properties.code_insee +
        '</h4>'
    )
    .addTo(map);
}




/*//Interactivité HOVER

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

})*/