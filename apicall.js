var API_KEY = 'HackPSU2017';
function getCoords() {
    var node = document.getElementById('coords');
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            node.innerHTML = 'Geolocation is not supported by this browser.';
        }
    }
    function showPosition(position) {
        node.innerHTML = 'Latitude: ' + position.coords.latitude + '<br>Longitude: ' + position.coords.longitude;
        // NOTE: pass lat and long to getWeather function
        getWeather(position.coords.latitude, position.coords.longitude);
    }
    getLocation();
}
function getWeather(lat, long) {
    // NOTE: %2C is equal to comma
    // url += '&q=40.7935057%2C-77.8688087'
    function getLocationKey() {
        var url = 'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search'
        url += '?apikey=' + API_KEY
        url += '&q=' + lat + ',' + long
        $.ajax({
            type: 'GET',
            url: url,
            success: function(data) {
                getConditions(data.Key)
            }
        });
    }
    function getConditions(locationKey) {
        // NOTE: see current conditions api
        // https://apidev.accuweather.com/developers/currentConditionsAPIGuide
        var node = document.getElementById('details');
        var nodeW = document.getElementById('weather');
        var url = 'https://dataservice.accuweather.com/currentconditions/v1/'
        url += locationKey + '.json'
        url += '?apikey=HackPSU2017'
        $.ajax({
            type: 'GET',
            url: url,
            success: function(data) {
                console.log('conditions:', data);
                console.log(data[0].Temperature.Imperial.Value);
                nodeW.innerHTML = "Conditions: " + data[0].WeatherText;
                if (data[0].Temperature.Imperial.Value <= 40) {
                    node.innerHTML = '<br/><STRONG>YES</STRONG>' + '<br/>Your face is gonna hurt'
                } else {
                    node.innerHTML = '<br/><STRONG>NO</STRONG>' + '<br/>Your face is gonna be good fam'
                }
            },
            error: function(err) {
                console.error(err)
                node.innerHTML = 'Failed to get conditions'
            }
        });
    }
    getLocationKey();
}
getCoords();