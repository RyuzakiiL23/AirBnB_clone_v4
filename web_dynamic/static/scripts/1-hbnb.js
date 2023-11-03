$(document).ready(function () {
  let amenities = {};
  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
			let id = $(this).data('id');
			let name = $(this).data('name');
      amenities[id] = name;
    } else {
			let id = $(this).data('id');
      delete amenities[id];
    }
    let selectedAmenities = Object.values(amenities).join(', ');
    $('.amenities h4').text(selectedAmenities);
  });
});
