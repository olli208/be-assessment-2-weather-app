(function() {
  "use strict";

  // Map autocomplete function
  var placesAutocomplete = places({
    container: document.querySelector('#searchTextField')
  });

  placesAutocomplete.on('change', function(e) {
    document.querySelector('#location_Lng').value = e.suggestion.latlng.lng;
    document.querySelector('#location_Lat').value = e.suggestion.latlng.lat;
  });

  if (document.querySelector('.oxford')) {
    document.querySelector('.oxford:last-of-type').remove()
    document.querySelector('.oxford:nth-last-child(1)').innerHTML = " , and"
  }

})();