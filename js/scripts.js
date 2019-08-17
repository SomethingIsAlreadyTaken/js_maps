$(document).ready(function(){
	'use strict';
	
});

let geocoder    = null, 
	map         = null, 
	marker      = null,
	popup       = null,
	currAddress = null,
	currCity   = 'Mariupol';

function initMap() {

	geocoder = new google.maps.Geocoder();

	let select = document.getElementById('cities');

	geocode(select.value);

	select.addEventListener('change', function(){
		if (popup) popup.close();

		currLabel = select.querySelector('[value="' + select.value + '"]')
						  .innerText[0];

		currCity = select.querySelector('[value="' + select.value + '"]').innerText;
						
		geocode(select.value);		
	});

	let center = {
		lat: 47.212451, 
		lng: 37.578760
	};

	map = new google.maps.Map(document.getElementById('map'), {
		center : center,
		zoom   : 15
	});

	window.addEventListener('resize', function() {
		map.setCenter(center);
	});
}

function geocode(addressStr) {
	geocoder.geocode({address: addressStr}, function(res, stat) {
		if (stat == 'OK') {
			let = coords = {
				  lat : res[0].geometry.location.lat(),
				  lng : res[0].geometry.location.lng()
			};

			currAddress = res[0].formatted_address;

			map.setCenter(coords);
			showMarker(coords);

		} else {
			alert(`Oops! Request status is ${stat}. Try again later`);
		}
	});
}

function showMarker(coords) {
	if (marker) {
		marker.setPosition(coords);
		marker.setLabel(currCity.charAt(0));
		marker.setTitle(currCity);

	} else {
		marker = new google.maps.Marker({
				map 	 : map,
				position : coords,
				label	 : currCity.charAt(0),
				title	 : currCity,
				icon	 : 'favicon.ico'
 		});

 		marker.addListener('click', function() {
    		showPopup();	
		});	
	}
}


function showPopup() {
	if (popup) {
		popup.setContent(getPopupContent());
	} else {
		popup = new google.maps.InfoWindow({
    		content: getPopupContent()
  		});
	}

	popup.open(map, marker);
}

function getPopupContent() {
	return `<b>Address: </b> ${currAddress}`;
}