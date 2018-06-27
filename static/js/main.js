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

  if (document.querySelector('.oxford:nth-last-child(1)')) {
    document.querySelector('.oxford:last-of-type').remove()
    if (document.querySelector('.oxford:nth-last-child(1)')) {
      document.querySelector('.oxford:nth-last-child(1)').innerHTML = " , and"
    }
  }

  if (document.querySelector('.weather_card-summary')) {
    document.querySelectorAll('.weather_card-summary').forEach(function (el) {
      el.style.backgroundImage = 'url("' + el.getAttribute('data-img') + '")';
    })
  };

})();