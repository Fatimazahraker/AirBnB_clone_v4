$(document).ready(function() {
  setInterval(() =>{

    const url = 'http://127.0.0.1:5001/api/v1/status/';
    
    $.get(url, function (res) {
      if (res.status === 'OK') {
        $('#api_status').addClass('available');
        console.log(res)
      } else {
        $('#api_status').removeClass('available');
      }
    });
  }, 35000);

  let amenity_check = [];
  $('input:checkbox').on('change', function(){
    const id = $(this).data('id');
    const name = $(this).data('name');
    if($(this).is(':checked')){
      amenity_check[id] = name;
    } else {
      delete amenity_check[id];
    }
    $('.amenities h4').text(Object.values(amenity_check).join(', '));
  });
});
    const callout = function () {
    $.ajax({
      type: 'get',
      url: `http://${window.location.hostname}:5001/api/v1/status/`,
      timeout: 5000,
      success: function (status) {
        if (status.status === 'OK') {
          $('DIV#api_status').addClass('available');
        } else {
          $('DIV#api_status').removeClass('available');
        }
      },
      error: function () {
        $('DIV#api_status').removeClass('available');
      },
      complete: function () {
        setTimeout(callout, 10000);
      }
    });
  };
  callout();
  /*
    Retrieve all places and create a articule tag with them
  */
  const getPlaces = function () {
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: 'http://localhost:5001/api/v1/places_search/',
      data: '{}',
      dataType: 'json',
      success: function (places) {
        $.each(places, function (index, place) {
          $('.places').append(
            '<article>' +
              '<div class="title_box">' +
              '<h2>' + place.name + '</h2>' +
              '<div class="price_by_night">' + place.price_by_night +
              '</div>' +
              '</div>' +
              '<div class="information">' +
              '<div class="max_guest">' +
              '<br />' + place.max_guest + ' Guests' +
              '</div>' +
              '<div class="number_rooms">' +
              '<br />' + place.number_rooms + ' Bedrooms' +
              '</div>' +
              '<div class="number_bathrooms">' +
              '<br />' + place.number_bathrooms + ' Bathroom' +
              '</div>' +
              '</div>' +
              '<div class="description">' + place.description +
              '</div>' +
              '</article>');
        });
      }
    });
  };
  getPlaces();
});
