function initializeContactsMap() {
  var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(55.700907, 37.615545),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    scrollwheel: false
  }
  
  var map = new google.maps.Map(document.getElementById("contactsMap"),
      mapOptions);
      
  map.set('styles', [
    {
      featureType: "all",
      stylers: [
        { saturation: -50 }
      ]
    }
  ]);
      
  var image = 'images/map-pin.png';
  var myLatLng = new google.maps.LatLng(55.700907, 37.619545);
  var beachMarker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: image
  });
}
google.maps.event.addDomListener(window, 'load', initializeContactsMap);