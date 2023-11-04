$(document).ready(function () {
  const url = "http://0.0.0.0:5001/api/v1/status/";

  $.get(url, function(data) {
    if (Object.values(data)[0] === "OK") {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

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