$(document).ready(function() {
  let amenity_check = [];
  $('input:checkbox').on('change', function(){
    const id = $(this).data('id');
    const name = $(this).data('name');
    if($(this).is(':checked')){
      amenity_check.push(id) = name;
    } else {
      const index = amenity_check.indexOf(id);
      if (index > -1) {
        amenity_check.splice(index, 1);
      }
    }

    $('h4').text('Amenities: ' + amenity_check.join(', '));
  });
  });
