// Ajout du fond de carte

var map = new mapboxgl.Map({
    container: 'map',
    style: 'https://geoserveis.icgc.cat/contextmaps/positron.json',
    center: [-2.8816178480265826, 48.27287617786766],
    zoom: 8
});


// Ajout des données

var villes = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -2.008842439465414,
            48.647180906035736
          ]
        },
        "properties": {
          "nom": "Saint-Malo",
          "gml_id": "ville_historique_bretagne.35288",
          "geo_point_2d": [
            48.647180906,
            -2.00884243947
          ],
          "code_insee": "35288"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -2.517805162916483,
            48.468622717655386
          ]
        },
        "properties": {
          "nom": "Lamballe",
          "gml_id": "ville_historique_bretagne.22093",
          "geo_point_2d": [
            48.4686227177,
            -2.51780516292
          ],
          "code_insee": "22093"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -3.455408865730571,
            48.73251999815552
          ]
        },
        "properties": {
          "nom": "Lannion",
          "gml_id": "ville_historique_bretagne.22113",
          "geo_point_2d": [
            48.7325199982,
            -3.45540886573
          ],
          "code_insee": "22113"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -2.962789850854463,
            48.06860980855308
          ]
        },
        "properties": {
          "nom": "Pontivy",
          "gml_id": "ville_historique_bretagne.56178",
          "geo_point_2d": [
            48.0686098086,
            -2.96278985085
          ],
          "code_insee": "56178"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -2.982617502462571,
            47.66777731495971
          ]
        },
        "properties": {
          "nom": "Auray",
          "gml_id": "ville_historique_bretagne.56007",
          "geo_point_2d": [
            47.667777315,
            -2.98261750246
          ],
          "code_insee": "56007"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -2.084816244674139,
            47.65139721897674
          ]
        },
        "properties": {
          "nom": "Redon",
          "gml_id": "ville_historique_bretagne.35236",
          "geo_point_2d": [
            47.651397219,
            -2.08481624467
          ],
          "code_insee": "35236"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -4.249313677175435,
            48.450933057088555
          ]
        },
        "properties": {
          "nom": "Landerneau",
          "gml_id": "ville_historique_bretagne.29103",
          "geo_point_2d": [
            48.4509330571,
            -4.24931367718
          ],
          "code_insee": "29103"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -3.278841583358974,
            47.80411861995075
          ]
        },
        "properties": {
          "nom": "Hennebont",
          "gml_id": "ville_historique_bretagne.56083",
          "geo_point_2d": [
            47.80411862,
            -3.27884158336
          ],
          "code_insee": "56083"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -3.353286887494919,
            47.70653666385369
          ]
        },
        "properties": {
          "nom": "Port-Louis",
          "gml_id": "ville_historique_bretagne.56181",
          "geo_point_2d": [
            47.7065366639,
            -3.35328688749
          ],
          "code_insee": "56181"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -3.986337036781666,
            48.68521952705509
          ]
        },
        "properties": {
          "nom": "Saint-Pol-de-Léon",
          "gml_id": "ville_historique_bretagne.29259",
          "geo_point_2d": [
            48.6852195271,
            -3.98633703678
          ],
          "code_insee": "29259"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -4.223090295022716,
            47.86716152287374
          ]
        },
        "properties": {
          "nom": "Pont-l'Abbé",
          "gml_id": "ville_historique_bretagne.29220",
          "geo_point_2d": [
            47.8671615229,
            -4.22309029502
          ],
          "code_insee": "29220"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -3.54974640281232,
            47.872690689401594
          ]
        },
        "properties": {
          "nom": "Quimperlé",
          "gml_id": "ville_historique_bretagne.29233",
          "geo_point_2d": [
            47.8726906894,
            -3.54974640281
          ],
          "code_insee": "29233"
        }
      }
    ]
  }


/* Assign a unique ID to each store */
villes.features.forEach(function(ville, i){
    ville.properties.id = i;
});

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
      var details = listing.appendChild(document.createElement('div'));
      details.innerHTML = prop.code_insee;
      /*if (prop.phone) {
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

    buildLocationList(villes);
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



function flyToStore(currentFeature) {
    map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 15
    });
}