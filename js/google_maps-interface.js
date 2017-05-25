function initMap(new_spots, zoom) {
  var last_spot = new_spots[new_spots.length-1];
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: zoom,
    center: last_spot.info
  });

  new_spots.forEach(function(spot, i) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(spot.info.lat, spot.info.lng),
      map: map
    });
  });
}

function printLocations(new_spots) {
  $('#locations ul').text('');
  new_spots.forEach(function(location, i) {
    $('#locations ul').append(`<a href="#" id="place${i}"><li>${location.query}</li></a>`);
    $(`#place${i}`).click(function() {
      // alert($(this).text());
      initMap([location], 16);
    });
  });
}

// An IP address fetch API
// $.get('http://ip-api.com/json/')
// .then(function(response) {
// });


var new_spots = [{info:{lat: 45.52, lng: -122.68}, query:"Epicodus"}];

$(document).ready(function() {

  initMap(new_spots, 8);

  $('#user-input-form').submit(function(e) {
    e.preventDefault();
    var location = $('#user-input').val();
    $.get(`http://maps.google.com/maps/api/geocode/json?address=${location}`)
    .then(function(response) {
      response.results.forEach(function(result) {
        new_spots.push({info: result.geometry.location, query: location});
        // console.log(new_spots[new_spots.length-1]);
        printLocations(new_spots);
      });

      initMap(new_spots, 6);
    });
  });

});
