navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true
})//this file make do you want to know location you can get the success location and the error location and enable high accuracy 

function successLocation(location) {
    console.log(location)
    setupMap([location.coords.longitude, location.coords])
}

function errorLocation(location) {
    console.log(location)
}

function setupMap(center) {
    mapboxgl.accessToken = 'pk.eyJ1IjoibW9uazQwNCIsImEiOiJjbG52NHF0amIwaDliMmtzYW1xN2ZuN3U1In0.UKjl4M79UvKOVOEK9eANAg';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 15
    });
}

