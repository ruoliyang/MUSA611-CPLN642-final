$('#backButton').hide();

var map = L.map('map', {
  center: [40.000, -75.1090],
  zoom: 11
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


var dataset = "https://raw.githubusercontent.com/ruoliyang/MUSA611-CPLN642-midterm/master/PPR_Assets.geojson";
var featureGroup;

//front page
var myFilter = function(feature) {
  return feature.properties.PPR_USE !== ' '
};

/*
//slide 2
var myFilter2 = function(feature2) {
  return feature2.properties.ACREAGE >= 50;
};
*/

/*
var myStyle2 = function (feature2) {
  switch (feature2.properties.ACREAGE) {
    case feature2.properties.ACREAGE >= 50: return {color: '#FF8000'};
      break;
      default:
    return {};
  }
};
*/

/*
//slide 3
var myFilter3 = function(feature3) {
  return feature3.properties.ACREAGE <= 30;
};
*/
/*
var myStyle3 = function (feature3) {
  switch (feature.properties.ACREAGE) {
    case myFilter3: return {color: '#660000'};
  }
};
*/

//Resident Page
var myFilter4 = function(feature) {
  return (feature.properties.PPR_USE == 'RECREATION_SITE' ||
         feature.properties.PPR_USE == 'NEIGHBORHOOD_PARK' ||
         feature.properties.PPR_USE == 'COMMUNITY_PARK' ||
         feature.properties.PPR_USE == 'MINI_PARK' ||
         feature.properties.PPR_USE == 'POOL' ||
         feature.properties.PPR_USE == 'ICE_RINK' ||
         feature.properties.PPR_USE == 'GOLF' ||
         feature.properties.PPR_USE == 'ATHLETIC');
};

var myStyle = function(feature) {
  switch (feature.properties.PPR_USE) {
    case 'RECREATION_SITE': return {color: '#FF9AA2'};
    case 'NEIGHBORHOOD_PARK': return {color: '#FFB7B2'};
    case 'COMMUNITY_PARK': return {color: '#FFDAC10'};
    case 'MINI_PARK': return {color: '#E2F0CB'};
    case 'POOL': return {color: '#B5EAD7'};
    case 'ICE_RINK': return {color: '#C7CEEA'};
    case 'GOLF': return {color: '#C2C2B4'};
    case 'ATHLETIC': return {color: '#98B1B6'};
//      break;
//      default:
//  return {};
  }
};

//marker popup
featureGroup = L.geoJson(parsedData, {
      style: myStyle,
      //filter: myFilter
      pointToLayer: function (feature, latlng) {
         return L.marker(latlng, {icon: smallIcon});
      //  return L.circleMarker(latlng, geojsonMarkerOptions);
    },
      onEachFeature: function (feature, layer) {
 layer.bindPopup('Name'+feature.properties.ASSET_NAME+'Address'+feature.properties.ADDRESS);
}
    }).addTo(map);


//slide 5 ZOOM!
var myFilter5 = function(feature) {
  map.flyTo([39.95, -75.16], 14);
  return (feature.properties.ZIPCODE == 19102 ||
         feature.properties.ZIPCODE == 19103 ||
         feature.properties.ZIPCODE == 19106 ||
         feature.properties.ZIPCODE == 19107);
  };

var myStyle2 = function(feature) {
  switch (feature.properties.ZIPCODE) {
    case 19102: return {color: '#004C99'};
    case 19103: return {color: '#CC0066'};
    case 19106: return {color: '#0080FF'};
    case 19107: return {color: '#00FF00'};
  }};

//Visitors Page
  var myFilter6 = function(feature) {
    return (feature.properties.PPR_USE == 'GREENWAY_PARKWAY' ||
           feature.properties.PPR_USE == 'REGIONAL_CONSERVATION_WATERSHED' ||
           feature.properties.PPR_USE == 'ENVIRONMENTAL_EDUCATION_CENTER' ||
           feature.properties.PPR_USE == 'MUSEUM' ||
           feature.properties.PPR_USE == 'GARDEN' ||
           feature.properties.PPR_USE == 'ZOO_HABITAT' ||
           feature.properties.PPR_USE == 'RESERVOIR');
  };

  var myStyle = function(feature) {
    switch (feature.properties.PPR_USE) {
      case 'GREENWAY_PARKWAY': return {color: '#5EBD3E'};
      case 'REGIONAL_CONSERVATION_WATERSHED': return {color: '#FFB900'};
      case 'ENVIRONMENTAL_EDUCATION_CENTER': return {color: '#F78200'};
      case 'MUSEUM': return {color: '#E23838'};
      case 'GARDEN': return {color: '#973999'};
      case 'ZOO_HABITAT': return {color: '#009CDF'};
      case 'RESERVOIR': return {color: '#EE82EE'};
  //      break;
  //      default:
  //  return {};
    }
  };


var showResults = function() {
  /* =====================
  This function uses some jQuery methods that may be new. $(element).hide()
  will add the CSS "display: none" to the element, effectively removing it
  from the page. $(element).show() removes "display: none" from an element,
  returning it to the page. You don't need to change this part.
  ===================== */
  // => <div id="intro" css="display: none">
  $('#intro').hide();
  // => <div id="results">
  $('#results').show();
};

//task 4
var eachFeatureFunction = function(layer) {
  layer.on('click', function (event) {
  });
};

//load
$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup = L.geoJson(parsedData, {
      onEachFeature: function (feature, layer) {
        layer.myTag = "featureGroup"},
      style: slide.style,
      filter: slide.filter,
    }).addTo(map);

    // quite similar to _.each
    featureGroup.eachLayer(eachFeatureFunction);
  });
});

//remove layer
var removeMarkers = function() {
  map.eachLayer( function(layer) {
    if (layer.myTag && layer.myTag === "featureGroup"){
      map.removeLayer(layer);
    }
  });
};

removeMarkers();
//    <link rel="stylesheet" href="style.css">

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};
