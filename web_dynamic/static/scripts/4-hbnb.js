window.addEventListener('load', function() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(function(checkbox) {
      checkbox.checked = false;
  });
});

$(document).ready(function () {
  const url = "http://0.0.0.0:5001/api/v1/status/";

  $.get(url, function(data) {
    if (Object.values(data)[0] === "OK") {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  let selectedAmenities = '';
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
    selectedAmenities = Object.values(amenities).join(', ');
    $('.amenities h4').text(selectedAmenities);

  });

  let targetAmenityIds = []
  $('button').click(function(){
    $.ajax({
      url: "http://0.0.0.0:5001/api/v1/amenities",
      type: "GET",
      data: JSON.stringify({}),
      contentType: 'application/json',
      dataType: 'json',
      success: function(response1) {
        $('section.places').empty();
        if (selectedAmenities === '') {

          $.ajax({
            url: "http://0.0.0.0:5001/api/v1/places_search/",
            type: "POST",
            data: JSON.stringify({}),
            contentType: 'application/json',
            dataType: 'json',
            success: function(response) {
          
              const $placesSection = $('section.places');
          
              response.forEach(function(placeData) {
                const $article = $('<article>');
          
                const $titleBox = $('<div class="title_box">');
                $titleBox.append('<h2>' + placeData.name + '</h2>');
                $titleBox.append('<div class="price_by_night">$' + placeData.price_by_night + '</div>');
                $article.append($titleBox);
          
                const $infoBox = $('<div class="information">');
                $infoBox.append('<div class="max_guest">' + placeData.max_guest + ' Guest' + (placeData.max_guest !== 1 ? 's' : '') + '</div>');
                $infoBox.append('<div class="number_rooms">' + placeData.number_rooms + ' Bedroom' + (placeData.number_rooms !== 1 ? 's' : '') + '</div>');
                $infoBox.append('<div class="number_bathrooms">' + placeData.number_bathrooms + ' Bathroom' + (placeData.number_bathrooms !== 1 ? 's' : '') + '</div>');
                $article.append($infoBox);
          
                if (placeData.user) {
                  $article.append('<div class="user"><b>Owner:</b> ' + placeData.user.first_name + ' ' + placeData.user.last_name + '</div>');
                }
          
                if (placeData.description) {
                  $article.append('<div class="description">' + placeData.description + '</div>');
                }
          
                $placesSection.append($article);
              });
            },
          });

        } else {
          let arrayAmenities = selectedAmenities.split(', ')
          let selectedAmenitiesArray = selectedAmenities.split(', ');
          
          selectedAmenitiesArray.forEach(function (name) {
            const matchingAmenity = response1.find((amenity) => amenity.name === name);
            if (matchingAmenity) {
              targetAmenityIds.push(matchingAmenity.id);
            }
          });

          $.ajax({
            url: "http://0.0.0.0:5001/api/v1/places_search/",
            type: "POST",
            data: JSON.stringify({"amenities": targetAmenityIds}),
            contentType: 'application/json',
            dataType: 'json',
            success: function(response) {
          
              const $placesSection = $('section.places');
          
              response.forEach(function(placeData) {
                const $article = $('<article>');
          
                const $titleBox = $('<div class="title_box">');
                $titleBox.append('<h2>' + placeData.name + '</h2>');
                $titleBox.append('<div class="price_by_night">$' + placeData.price_by_night + '</div>');
                $article.append($titleBox);
          
                const $infoBox = $('<div class="information">');
                $infoBox.append('<div class="max_guest">' + placeData.max_guest + ' Guest' + (placeData.max_guest !== 1 ? 's' : '') + '</div>');
                $infoBox.append('<div class="number_rooms">' + placeData.number_rooms + ' Bedroom' + (placeData.number_rooms !== 1 ? 's' : '') + '</div>');
                $infoBox.append('<div class="number_bathrooms">' + placeData.number_bathrooms + ' Bathroom' + (placeData.number_bathrooms !== 1 ? 's' : '') + '</div>');
                $article.append($infoBox);
          
                if (placeData.user) {
                  $article.append('<div class="user"><b>Owner:</b> ' + placeData.user.first_name + ' ' + placeData.user.last_name + '</div>');
                }
          
                if (placeData.description) {
                  $article.append('<div class="description">' + placeData.description + '</div>');
                }
          
                $placesSection.append($article);
              });
            },
          });

        }
      }
    });
  })

  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/places_search/",
    type: "POST",
    data: JSON.stringify({}),
    contentType: 'application/json',
    dataType: 'json',
    success: function(response) {
  
      const $placesSection = $('section.places');
  
      response.forEach(function(placeData) {
        const $article = $('<article>');
  
        const $titleBox = $('<div class="title_box">');
        $titleBox.append('<h2>' + placeData.name + '</h2>');
        $titleBox.append('<div class="price_by_night">$' + placeData.price_by_night + '</div>');
        $article.append($titleBox);
  
        const $infoBox = $('<div class="information">');
        $infoBox.append('<div class="max_guest">' + placeData.max_guest + ' Guest' + (placeData.max_guest !== 1 ? 's' : '') + '</div>');
        $infoBox.append('<div class="number_rooms">' + placeData.number_rooms + ' Bedroom' + (placeData.number_rooms !== 1 ? 's' : '') + '</div>');
        $infoBox.append('<div class="number_bathrooms">' + placeData.number_bathrooms + ' Bathroom' + (placeData.number_bathrooms !== 1 ? 's' : '') + '</div>');
        $article.append($infoBox);
  
        if (placeData.user) {
          $article.append('<div class="user"><b>Owner:</b> ' + placeData.user.first_name + ' ' + placeData.user.last_name + '</div>');
        }
  
        if (placeData.description) {
          $article.append('<div class="description">' + placeData.description + '</div>');
        }
  
        $placesSection.append($article);
      });
    },
  });

});