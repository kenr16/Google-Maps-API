(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1]);
