document.addEventListener('DOMContentLoaded', function () {

    var map = L.map('map');

    L.tileLayer('https://api.mapbox.com/styles/v1/numbereddays/cizqd3cu2000m2rmipce14uds/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibnVtYmVyZWRkYXlzIiwiYSI6ImNpeTI0NmFuaDAwMTcycXBnZGZyaDJ1dGIifQ.fAD0O4m-jkeVUz_xZwNfpg', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    }).addTo(map);

    var arcgisOnline = L.esri.Geocoding.arcgisOnlineProvider();

    var searchControl = L.esri.Geocoding.geosearch({
        providers: [
      arcgisOnline,
      L.esri.Geocoding.featureLayerProvider({
                url: 'https://services.arcgis.com/jIL9msH9OI208GCb/arcgis/rest/services/USA_Offbeat_Tourist_Attractions/FeatureServer/0',
                searchFields: ['Name'],
                bufferRadius: 5000,
                formatSuggestion: function (feature) {
                    return feature.properties.Name + ' - ' + feature.properties.Organization;
                }
            })
    ]
    }).addTo(map);


    var offBeat = L.esri.featureLayer({
        url: 'https://services.arcgis.com/jIL9msH9OI208GCb/arcgis/rest/services/USA_Offbeat_Tourist_Attractions/FeatureServer/0'
    }).addTo(map);

    var outline = L.esri.featureLayer({
        url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_States_Generalized/FeatureServer/0'
    }).addTo(map);

    outline.query().bounds(function (error, latlngbounds) {
        map.fitBounds(latlngbounds);
    });


    function showLatLng(e) {
        document.getElementById("whereIsThis").innerText = e.latlng.lat + " | " + e.latlng.lng;
    }
    map.on('mousemove', showLatLng);

    function onMapClick(e) {
//        var popup2 = L.popup()
//                    .setLatLng(e.latlng)
//                    .setContent("<h4>" + e.latlng.lat + " | " + e.latlng.lng + "</h4><center><img src='https://d30y9cdsu7xlg0.cloudfront.net/png/174395-200.png'></center>")
//        var url = "https://www.google.com/search?q=" + e.latlng.lat + "%2C+" + e.latlng.lng
        var popup = L.popup()
            .setLatLng(e.latlng)
            .setContent("<h4>" + e.latlng.lat + " | " + e.latlng.lng + "</h4><center><a href='https://www.google.com/search?q=" + e.latlng.lat + "%2C+" + e.latlng.lng + "'>Let me Google that for you<a><p><img src='https://d30y9cdsu7xlg0.cloudfront.net/png/174395-200.png' height='42' width='42'></p></center>")
            .openOn(map);
//                var popup = L.popup()
//            .setLatLng(e.latlng)
//            .setContent("<h4>" + e.latlng.lat + " | " + e.latlng.lng + "</h4><center><a href='https://www.google.com/search?q=" + e.latlng.lat + "%2C+" + e.latlng.lng + "'>Let me Google that for you<a></center>")
//            .openOn(map);
        // '<a href="'+desiredLink+'">'+desiredText+'</a>' +
    }

    map.on('click', onMapClick);

});