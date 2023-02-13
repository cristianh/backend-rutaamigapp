window.addEventListener('DOMContentLoaded', () => {

    let dataPointsBus = {
        type: 'FeatureCollection',
        features: []
    }

    let opcionesRuta = []

    let tiempoGeo;

    let point = 0;
    let pointBus;
    let popup;

    document.getElementById('selectRutas').addEventListener('change', (event) => {
        
        point = 0
        loadPointTest(event.target.value)
        //LoadInfo(event.target.value)
    });

    fetch('https://amigaapp-f2f93-default-rtdb.firebaseio.com/dbrutas.json')
        .then(response => response.json())
        .then(json => {


            Object.keys(json).forEach(element => {
                opcionesRuta.push(element)

            });

        })
        .catch(err => console.log(err))
        .finally(() => {
            let selectRutas = document.getElementById('selectRutas');
            
            opcionesRuta.forEach(opcion => {
                
                let Op = document.createElement('option')
                Op.value = opcion
                Op.text = opcion
                selectRutas.add(Op)
            });

        })




    const appDiv = document.getElementById('app');
    /*  appDiv.innerHTML = `<h1>Obtener Geolocalización</h1>`; */

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            /*  appDiv.innerHTML += `<p>Latitud: ${pos.coords.latitude}</p>`;
             appDiv.innerHTML += `<p>Longitud: ${pos.coords.longitude}</p>`; */
            loadMap(parseFloat(pos.coords.latitude), parseFloat(pos.coords.longitude))
        }, (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    console.log("User denied the request for Geolocation.")
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.log("Location information is unavailable.")
                    break;
                case error.TIMEOUT:
                    console.log("The request to get user location timed out.")
                    break;
            }
        }, options);
    } else {
        console.log("Your browser doesn't support geolocation.")
    }

    // Usando watchPosition()
    let watchID = navigator.geolocation.watchPosition((pos) => {
        appDiv.innerHTML += `<h2>WatchPosition( )</h2>`;
        appDiv.innerHTML += `<p>Latitud: ${pos.coords.latitude}</p>`;
        appDiv.innerHTML += `<p>Longitud: ${pos.coords.longitude}</p>`;


    });

    navigator.geolocation.clearWatch(watchID);

    const loadMap = (lat, lng) => {


        mapboxgl.accessToken = 'pk.eyJ1IjoiY3J1c3RvMjAyMiIsImEiOiJjbDg3c3lmaTExNmg4M3BubGhyMThvMmhsIn0.AhcG868gRKbP-zDiccuMdA';
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [lng, lat], // starting position [lng, lat]
            zoom: 14, // starting zoom
            projection: 'globe' // display the map as a 3D globe
        });
        map.on('style.load', () => {
            map.setFog({}); // Set the default atmosphere style
        });

        map.on('load', async () => {

            const response = await loadPointTest()



            //Posicion actual usuario.
            //createMarket(lat, lng,this.map)
            const marker = new mapboxgl.Marker()
                .setLngLat([lng, lat])
                .addTo(map);


            /*  // add markers de los buses al mapa
             for (const feature of dataPointsBus.features) {
                 // create a HTML element for each feature
                 const el = document.createElement('div');
                 el.className = 'marker';
 
                 // make a marker for each feature and add to the map
                 new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates)
                     .setPopup(
                         new mapboxgl.Popup({ offset: 25 }) // add popups
                             .setHTML(
                                 `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
                             )
                     ).addTo(map);
             } */



            const el = document.createElement('div');
            el.className = 'marker';

            pointBus = new mapboxgl.Marker(el).setLngLat(dataPointsBus.features[0].geometry.coordinates)
                .addTo(map);

            pointBus.setPopup(
                new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML(
                        `<h3>${dataPointsBus.features[0].properties.title}</h3><p>${dataPointsBus.features[0].properties.description}</p><p id="velocidadRuta">${dataPointsBus.features[0].properties.velocidad}</p>`
                    )
            )



            map.flyTo({
                center: [dataPointsBus.features[0].geometry.coordinates[0], dataPointsBus.features[0].geometry.coordinates[1]],
                speed: 0.5
            });


            animation(map, point, pointBus)

        })



        // Add zoom and rotation controls to the map.
        map.addControl(new mapboxgl.NavigationControl());

        /* const el = document.createElement('div');
        el.className = 'marker'; */
    }


    function animation(map, point, pointMarket) {
        tiempoGeo = setInterval(() => {
           
            //caramos el popup del bus.
            popup = document.querySelector('#velocidadRuta')

            if (popup == null ) {
                
            }else{
                if(dataPointsBus.features[point].properties.velocidad !== null || dataPointsBus.features[point].properties.velocidad !== undefined){
                    popup.innerHTML = Math.round(dataPointsBus.features[point].properties.velocidad * 3.6) + 'km/h'
                }
            }

            // make a marker for each feature and add to the map
            pointMarket.setLngLat(dataPointsBus.features[point].geometry.coordinates)
                .addTo(map);
            map.flyTo({
                center: [dataPointsBus.features[point].geometry.coordinates[0], dataPointsBus.features[point].geometry.coordinates[1]],
                speed: 0.5
            });
            point = point + 1
            if ((dataPointsBus.features.length - 1) == point) {
                dataPointsBus.features.reverse()
                point = 0
            }
        }, 500)
    }

    /*   const createMarket = (lat, lng, map) => {
          // Create a new marker.
          const marker = new mapboxgl.Marker()
              .setLngLat([lat, lng])
              .addTo(map);
      } */

    async function loadPointTest(ruta = 'Rutatrabajo') {

        if (tiempoGeo) {
            //clearInterval(tiempoGeo)
            dataPointsBus = {
                type: 'FeatureCollection',
                features: []
            }
            point = 0

        }

        // Make a GET request to the API and return the location of the ISS.
        try {
            await fetch(`https://amigaapp-f2f93-default-rtdb.firebaseio.com/dbrutas/${ruta}.json`)
                .then((resp) => resp.json())
                .then((data) => {

                    let dataPoints = Object.values(data)

                    

                    dataPoints.forEach(points => {

                        const { Latitude, Longitude, Speed } = points




                        dataPointsBus.features.push(
                            {
                                type: 'Feature',
                                geometry: {
                                    type: 'Point',
                                    coordinates: [Longitude, Latitude]
                                },
                                properties: {
                                    title: 'Ruta 18',
                                    description: 'Norte/Sur',
                                    velocidad: Speed == undefined ? '0' : Speed
                                }
                            }
                        )
                    });

                })
        } catch (err) {
            // If the updateSource interval is defined, clear the interval to stop updating the source.
            //if (updateSource) clearInterval(updateSource);
            throw new Error(err);
        }
    }
})


