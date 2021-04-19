// pour que la fonction .remove() fonctionne avec les anciens navigateurs
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    };
}

// Fonction pour réinitialiser la checkbox à chaque rechargement (F5)
function init(){
    document.getElementById("immeubles").checked = true;
    document.getElementById("musees").checked = true;
    document.getElementById("office").checked = true;
    document.getElementById("toilette").checked = false;
    document.getElementById("restaurants").checked = false;
    document.getElementById("hotels").checked = false;
}

init()


// Ajout du fond de carte

var map = new mapboxgl.Map({
    container: 'map',
    style: 'https://geoserveis.icgc.cat/contextmaps/positron.json',
    center: [-2.8816178480265826, 48.27287617786766],
    zoom: 7.2,
	minZoom: 6.5
});


// Ajout des données

// Set the global configs to synchronous 
//(les actions sont executees dans l'ordre, les unes après les autres)
$.ajaxSetup({
    async: false
});

// villes historiques
$.getJSON("https://raw.githubusercontent.com/Judthg/projet_webmapping/main/villes.json",
    function(data) {
        villes = data
    }
);

// immeubles historiques
$.getJSON("https://raw.githubusercontent.com/Judthg/projet_webmapping/main/immeubles_historiques_10km_villes.geojson",
    function(data) {
        immeubles = data
    }
);

// musees
$.getJSON("https://raw.githubusercontent.com/Judthg/projet_webmapping/main/musees_10km.geojson",
    function(data) {
        musees = data
    }
);

// offices du tourisme
$.getJSON("https://raw.githubusercontent.com/Judthg/projet_webmapping/main/offices_tourisme.geojson",
    function(data) {
        office = data
    }
);

// toilettes
$.getJSON("https://raw.githubusercontent.com/Judthg/projet_webmapping/main/toilettes.geojson",
    function(data) {
        toilette = data
    }
);

// Restaurants
$.getJSON("https://raw.githubusercontent.com/Judthg/projet_webmapping/main/restaurants.geojson",
    function(data) {
        restaurants = data
    }
);

// Hotels
$.getJSON("https://raw.githubusercontent.com/Judthg/projet_webmapping/main/hotels.geojson",
    function(data) {
        hotels = data
    }
);


/* Assign a unique ID to each store */
villes.features.forEach(function(ville, i){
    ville.properties.id = i;
});

/* Assign a unique ID to each monument */
immeubles.features.forEach(function(immeuble, i){
    immeuble.properties.id = i;
});

//Sidebar 1 (liste des villes)
// Fonction qui construit la liste des villes
function buildLocationList(data) {
    data.features.forEach(function(ville, i){
        /**
         * Create a shortcut for `store.properties`,
         * which will be used several times below.
         **/
        var prop = ville.properties;

        /* Add a new listing section to the sidebar. */
        var listings = document.getElementById('listings');
        var listing = listings.appendChild(document.createElement('div'));
        /* Assign a unique `id` to the listing. */
        listing.id = "listing-" + data.features[i].properties.id;
        /* Assign the `item` class to each listing for styling. */
        listing.className = 'item';

        /* Add the link to the individual listing created above. */
        var link = listing.appendChild(document.createElement('a'));
        link.href = '#';
        link.className = 'title';
        link.id = "link-" + prop.id;
        link.innerHTML = prop.nom;

        /* Add details to the individual listing. */
		var info = listing.appendChild(document.createElement('div'));
		info.className = 'info';
		var blason = info.appendChild(document.createElement('div'));
		var logo = '<img src="'+prop.logoLocation+'"width = 50/>';
		blason.innerHTML = logo;
		blason.className = 'blason';
        var details = info.appendChild(document.createElement('div'));
        details.innerHTML = "Office de tourisme : "+prop.office;
		details.className = 'contenu';

        // EventListener (réponse au clic)
        link.addEventListener('click', function(e){
        for (var i = 0; i < data.features.length; i++) {
            if (this.id === "link-" + data.features[i].properties.id) {
                var clickedListing = data.features[i];
                flyToVille(clickedListing);
                //createPopUp(clickedListing);
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

//Sidebar2
function construireLocationList(data) {
  data.features.forEach(function(immeuble, i){
    /**
     * Create a shortcut for `store.properties`,
     * which will be used several times below.
    **/
    var propri = immeuble.properties;

    /* Add a new listing section to the sidebar. */
    var listingsim = document.getElementById('listingsim');
    var listingim = listingsim.appendChild(document.createElement('div'));
    /* Assign a unique `id` to the listing. */
    listingim.id = "listingim-" + data.features[i].properties.id;
    /* Assign the `item` class to each listing for styling. */
    listingim.className = 'item';

    /* Add the link to the individual listing created above. */
    var link = listingim.appendChild(document.createElement('a'));
    link.href = '#';
    link.className = 'title';
    link.id = "link-" + propri.id;
    link.innerHTML = propri.tico;

    /* Add details to the individual listing. */
    /*var details = listing.appendChild(document.createElement('div'));
    details.innerHTML = prop.city;
    if (prop.phone) {
      details.innerHTML += ' · ' + prop.phoneFormatted;
    }
    if (prop.distance) {
      var roundedDistance = Math.round(prop.distance * 100) / 100;
      details.innerHTML +=
        '<p><strong>' + roundedDistance + ' miles away</strong></p>';
    }*/
  });
}

map.on('load', function () {

    // Ajout des images des couches
    
	// chargement image villes
    map.loadImage('https://raw.githubusercontent.com/Judthg/projet_webmapping/main/pictos_carte/tour2.png', function(error, image) {
        if (error) throw error;
        // Add the loaded image to the style's sprite with the ID 'kitten'.
        map.addImage('villes', image);
    });


    // chargement image immeubles historiques
    map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Logo_monument_historique_-_rouge_sans_texte.svg/558px-Logo_monument_historique_-_rouge_sans_texte.svg.png', function(error, image) {
        if (error) throw error;
        // Add the loaded image to the style's sprite with the ID 'kitten'.
        map.addImage('immeuble_hist', image);
    });


    // chargement image musées
    map.loadImage('https://raw.githubusercontent.com/Judthg/projet_webmapping/main/pictos_carte/musees.png', function(error, image) {
        if (error) throw error;
        // Add the loaded image to the style's sprite with the ID 'kitten'.
        map.addImage('musee', image);
    });
    
    
	// chargement image offices
    map.loadImage('https://raw.githubusercontent.com/Judthg/projet_webmapping/main/pictos_carte/office.png', function(error, image) {
        if (error) throw error;
        // Add the loaded image to the style's sprite with the ID 'kitten'.
        map.addImage('office', image);
    });
    
	
	// chargement image toilettes
    map.loadImage('https://raw.githubusercontent.com/Judthg/projet_webmapping/main/pictos_carte/toilettes3.png', function(error, image) {
        if (error) throw error;
        // Add the loaded image to the style's sprite with the ID 'kitten'.
        map.addImage('toilette', image);
    });


    // chargement image restaurants
    map.loadImage('https://raw.githubusercontent.com/Judthg/projet_webmapping/main/pictos_carte/restaurants.png', function(error, image) {
        if (error) throw error;
        // Add the loaded image to the style's sprite with the ID 'kitten'.
        map.addImage('restaurants', image);
    });

    // chargement image restaurants
    map.loadImage('https://raw.githubusercontent.com/Judthg/projet_webmapping/main/pictos_carte/hotels.png', function(error, image) {
        if (error) throw error;
        // Add the loaded image to the style's sprite with the ID 'kitten'.
        map.addImage('hotels', image);
    });
    


    // Ajout des couches

	//immeubles historiques
	map.addSource('immeubles', {
            type: 'geojson',
            data: immeubles
		 }
    );
    
    map.addLayer({
        'id': 'immeubles',
        'type': 'symbol',
        'source': 'immeubles',
        'layout': { "icon-image": "immeuble_hist", "icon-size": 0.09, 'visibility': 'visible'},
		'minzoom': 11
    });
	construireLocationList(immeubles);
	
	// musees
	map.addSource('musees', {
            type: 'geojson',
            data: musees
		 }
	);
	
	map.addLayer({
        'id': 'musees',
        'type': 'symbol',
        'source': 'musees',
        'layout': { "icon-image": "musee", "icon-size": 0.2, 'visibility': 'visible'},
		'minzoom': 11
    });
    
    
	//offices de tourisme
	map.addSource('office', {
            type: 'geojson',
            data: office
		 }
	);
	
	map.addLayer({
        'id': 'office',
        'type': 'symbol',
        'source': 'office',
        'layout': {"icon-image": "office", "icon-size": 0.04, 'visibility': 'visible'},
		'minzoom': 11
    });
    
    
	//toilettes
	map.addSource('toilette', {
            type: 'geojson',
            data: toilette
		 }
	);
	
	map.addLayer({
        'id': 'toilette',
        'type': 'symbol',
        'source': 'toilette',
        'layout': {"icon-image": "toilette", "icon-size": 0.06,'visibility': 'none'},
		'minzoom': 11
    });


    //restaurants
	map.addSource('restaurants', {
        type: 'geojson',
        data: restaurants
        }
    );

    map.addLayer({
        'id': 'restaurants',
        'type': 'symbol',
        'source': 'restaurants',
        'layout': {"icon-image": "restaurants", "icon-size": 0.03,'visibility': 'none'},
        'minzoom': 11
    });


    //hotels
	map.addSource('hotels', {
        type: 'geojson',
        data: hotels
        }
    );

    map.addLayer({
        'id': 'hotels',
        'type': 'symbol',
        'source': 'hotels',
        'layout': {"icon-image": "hotels", "icon-size": 0.05,'visibility': 'none'},
        'minzoom': 11
    });
	
	
    //villes historiques de bretagne

    map.addSource(
        'villes',
        {
            type: 'geojson',
            data: villes
            
        }
    );

    map.addLayer({
        'id': 'villes',
        'type': 'symbol',
        'source': 'villes',
        'layout': {"icon-image": "villes", "icon-size": 0.05, 'visibility': 'visible'},
		'maxzoom': 11
    });

    buildLocationList(villes);
});


//Menu de gestion des couches
switchlayer = function (lname) {
            if (document.getElementById(lname ).checked) {
                map.setLayoutProperty(lname, 'visibility', 'visible');
            } else {
                map.setLayoutProperty(lname, 'visibility', 'none');
           }
        };

//Interactivité HOVER
// Hover villes
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
	var logo = '<img src="'+feature.properties.logoLocation+'"width = 50/>';
        popup.setLngLat(feature.geometry.coordinates)
          .setHTML('<b>'+ feature.properties.nom + '</b>' + '<hr>'+ logo + '</hr>')
        .addTo(map);
})

// Hover immeubles historiques
var popupim = new mapboxgl.Popup({
    className: "Mypopup",
    closeButton: false,
    closeOnClick: false 
});

map.on('mousemove', function(e) {
    var features2 = map.queryRenderedFeatures(e.point, { layers: ['immeubles'] });
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = (features2.length) ? 'pointer' : '';

    if (!features2.length) {
        popupim.remove();
        return; 
    }
 
    var feature2 = features2[0];
        popup.setLngLat(feature2.geometry.coordinates)
          .setHTML('<b>'+ feature2.properties.tico + '</b>' + '<hr>'+ feature2.properties.classé_inscrit + ' MH </hr>')
        .addTo(map);

})

// Hover musees
var popupmus = new mapboxgl.Popup({
    className: "Mypopup",
    closeButton: false,
    closeOnClick: false 
});

map.on('mousemove', function(e) {
    var features3 = map.queryRenderedFeatures(e.point, { layers: ['musees'] });
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = (features3.length) ? 'pointer' : '';

    if (!features3.length) {
        popupmus.remove();
        return; 
    }
 
    var feature3 = features3[0];
        popup.setLngLat(feature3.geometry.coordinates)
          .setHTML('<b>'+ feature3.properties.name + '</b>')
        .addTo(map);

})

// Hover offices tourisme
var popupof = new mapboxgl.Popup({
    className: "Mypopup",
    closeButton: false,
    closeOnClick: false 
});

map.on('mousemove', function(e) {
    var features4 = map.queryRenderedFeatures(e.point, { layers: ['office'] });
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = (features4.length) ? 'pointer' : '';

    if (!features4.length) {
        popupof.remove();
        return; 
    }
 
    var feature4 = features4[0];
        popup.setLngLat(feature4.geometry.coordinates)
          .setHTML('<b>'+ 'Adresse : ' + feature4.properties.Adresse + '</b>')
        .addTo(map);

})

// Sidebar 2 (apparait au clic)
function openNav() {
  document.getElementById("mySidebar2").style.width = "25%";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidebar2").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}
	

// Fonction pour zoomer sur les villes via la sidebar
function flyToVille(currentFeature) {
    map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 12
    });
	openNav();
}

// zoom au clic sur la carte
map.on('click', function(e) {
  /* Determine if a feature in the "locations" layer exists at that point. */
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['villes']
  });
  /* If yes, then: */
  if (features.length) {
    var clickedPoint = features[0];
    
    /* Fly to the point */
    flyToVille(clickedPoint);
}});


//Boutons navigation
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');
		
//Echelle cartographique
map.addControl(new mapboxgl.ScaleControl({
		maxWidth: 120,
		unit: 'metric'}));
		
        
        
//Retour au zoom initial
document.getElementById('fly').addEventListener('click', function () {
	map.flyTo({
	center: [-2.8816178480265826, 48.27287617786766],
	zoom: 7.2,
	essential: true // this animation is considered essential with respect to prefers-reduced-motion
	});
	closeNav();
});