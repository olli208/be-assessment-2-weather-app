(function() {
  "use strict";

  // Map autocomplete function
  var placesAutocomplete = places({
    container: document.querySelector('#searchTextField')
  });
  
  placesAutocomplete.on('change', function(e) {

    document.querySelector('#location_Lng').value = e.suggestion.latlng.lng;
    document.querySelector('#location_Lat').value = e.suggestion.latlng.lat;

  })

  // function mapAutoComplete() {
  //   var input = document.getElementById('searchTextField');

  //   input.addEventListener('keydown' , function(e) {
  //     if (e.key === 'Enter') {
  //       e.preventDefault();
  //     }

  //     getLatitudeLongitude(getGeoLocation, input.value)
  //   });

  //   input.addEventListener('click' , function(e) {
  //     getLatitudeLongitude(getGeoLocation, input.value)
  //   });

  //   new google.maps.places.Autocomplete(input);
  // }
  
  // google.maps.event.addDomListener(window, 'load', mapAutoComplete);

  // function getGeoLocation(result) {
  //   console.log(result.geometry.location.lng());

  //   document.querySelector('#location_Lng').value = result.geometry.location.lng();
  //   document.querySelector('#location_Lat').value = result.geometry.location.lat();
  // }

  // function getLatitudeLongitude(callback, address) {
  //   // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
  //   address = address;
  //   // Initialize the Geocoder
  //   var geocoder = new google.maps.Geocoder();
  //   if (geocoder) {
  //     geocoder.geocode({
  //       'address': address
  //     }, function (results, status) {
  //       if (status == google.maps.GeocoderStatus.OK) {
  //           callback(results[0]);
  //       }
  //     });
  //   }
  // }

})();