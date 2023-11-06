$(document).ready(function() {
    const url = 'http://127.0.0.1:5001/api/v1/status/';
  
    $.get(url, function(res) {
      if (res.status === 'OK') {
        $('#api_status').addClass('available');
        console.log(res);
      } else {
        $('#api_status').removeClass('available');
      }
  });
  
  let amenity_check = [];
  $('input:checkbox').on('change', function() {
    const id = $(this).data('id');
    const name = $(this).data('name');
    if ($(this).is(':checked')) {
      amenity_check[id] = name;
    } else {
      delete amenity_check[id];
    }
    $('.amenities h4').text(Object.values(amenity_check).join(', '));
  });

  $('button').on('click', function() {
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({}),
      dataType: 'json',
      success: function(places) {
        const placesession = $('.places');
        placesession.empty();
        places.forEach(place => {
          const article = `<article>
                            <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">${place.price_by_night}</div>
                            </div>
                            <div class="information">
                            <div class="max_guest">${place.max_guest} Guest</div>
                            <div class="number_rooms">${place.number_rooms} Bedroom</div>
                            <div class="number_bathrooms">${place.number_bathrooms} Bathroom</div>
                            </div>
                            <div class="description">${place.description}</div>
                          </article>`;
          placesession.append(article);
        });
      },
      error: function(xhr, status, error) {
        console.log(error);
      },
    });
    });
});
