

var light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    username: 'johnkamau',
    id:'mapbox/light-v10',
    accessToken: 'pk.eyJ1Ijoiam9obmthbWF1IiwiYSI6ImNsY2xmNjk4cTYzaTgzcWxrdzBtNWs2cWMifQ.FkeyGo6hi5tW9dx-GmAhHA',
    tileSize: 512,
    zoomOffset: -1,
});

var dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    username: 'johnkamau',
    id:'mapbox/dark-v10',
    accessToken: 'pk.eyJ1Ijoiam9obmthbWF1IiwiYSI6ImNsY2xmNjk4cTYzaTgzcWxrdzBtNWs2cWMifQ.FkeyGo6hi5tW9dx-GmAhHA',
    tileSize: 512,
    zoomOffset: -1,
})

var map = L.map('map',{ layers: [light] }).fitWorld();

function onLocationFound(e) {
  var radius = e.accuracy; // this defines a variable radius as the accuracy value returned by the locate method. The unit is meters.

  L.marker(e.latlng) // this adds a marker at the lat and long returned by the locate function.
    .addTo(map)
    .bindPopup(
      "You are within " +
        Math.round(radius * 3.28084) +
        " feet of this point"
    ) // this binds a popup to the marker. The text of the popup is defined here as well. Note that we multiply the radius by 3.28084 to convert the radius from meters to feet and that we use Math.round to round the conversion to the nearest whole number.
    .openPopup();

  if (radius <= 100) {
    L.circle(e.latlng, radius, { color: 'green' }).addTo(map);
  } else {
    L.circle(e.latlng, radius, { color: 'red' }).addTo(map);
  }
var times = SunCalc.getTimes(new Date(), e.latitude, e.longitude);
var sunrise = times.sunrise.getHours();
var sunset = times.sunset.getHours();

var currentTime = new Date().getHours();
        if (sunrise < currentTime && currentTime < sunset){
        map.removeLayer(dark);
        map.addLayer(light);
        }
        else {
        map.removeLayer(light);
        map.addLayer(dark);
        }
}

map.on('locationfound', onLocationFound); // this is the event listener

function onLocationError(e) {
  alert(e.message);
}

map.on('locationerror', onLocationError);

map.locate({ setView: true, maxZoom: 16 });

function showAlert() {
        // Check if the "alertShown" cookie is set
        if (!getCookie("alertShown")) {
        // If the cookie is not set, show the alert and set the cookie
        alert("This website does not collecting or store your information, we ask for location in order to optimize the map depending on the time of Day/Night.");
        setCookie("alertShown", true, 365);
        }
}
  
  // Function to set a cookie
function setCookie(name, value, days) {
var expires = "";
        if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
  
  // Function to get a cookie
function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
  
  // Call the showAlert function when the page loads
window.onload = showAlert;
  
  // Layer Control
const baseLayers = {
        'Nighttime Basemap': light,
        'Daytime Basemap': dark
        };
const layerControl = L.control.layers(baseLayers).addTo(map);