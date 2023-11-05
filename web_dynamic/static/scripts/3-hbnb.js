$(document).ready(function() {
  setInterval(() => {
    const url = 'http://127.0.0.1:5001/api/v1/status/';
    $.get(url, function (res) {
      if (res.status === 'OK') {
        $('#api_status').addClass('available');
        console.log(res);
      } else {
        $('#api_status').removeClass('available');
      }
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

    // Add a click event handler to the button with id "searchButton"
    //$('#searchButton').click(function() {
      // Create an array to store the selected amenities
      //const selectedAmenities = [];

      // Get all the checkboxes for amenities
      //$('input:checkbox').each(function() {
        //if ($(this).is(':checked')) {
          //selectedAmenities.push($(this).data('id'));
        //}
      //});

      // Call the getPlaces function with the selected amenities as data
      getPlaces({ amenities: selectedAmenities });
    });

    // Call the getPlaces function on page load without data to load all places
    getPlaces();
  });

  const getPlaces = function (data) {
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: 'http://localhost:5001/api/v1/places_search/',
      data: JSON.stringify(data || {}),
      dataType: 'json',
      success: function (places) {
        $('.places').empty(); // Clear the existing results
        $.each(places, function (index, place) {
          // Append new results to the '.places' container
          $('.places').append(
            '<article>' +
            '<div class="title_box">' +
            '<h2>' + place.name + '</h2>' +
            '<div class="price_by_night">' + place.price_by_night + '</div>' +
            '</div>' +
            '<div class "information">' +
            '<div class="max_guest"><br />' + place.max_guest + ' Guests</div>' +
            '<div class="number_rooms"><br />' + place.number_rooms + ' Bedrooms</div>' +
            '<div class="number_bathrooms"><br />' + place.number_bathrooms + ' Bathroom</div>' +
            '<div class="description">' + place.description + '</div>' +
            '</article>'
          );
        });
      }
    });
  };
});

