/*

var slideExample = {
  slideNumber: 1,
  title: "My first slide",
  filter: function(geojsonFeature) { return true }
};
*/

/*
var slideDeck = [slideExample1, slideExample2, slideExample3]


var slideModel = {
  name: "art1",
  description: "whatArt",
  location: [lat, lng]
};

var slide1 = {
  name: "art1",
  description: "whatArt",
  location: [lat, lng]
};

*/

var slides = [
  { title: "title1", description: "the first description", color: "#DEDEE3" },
  { title: "title2", description: "the second description", color: "#86B9CE" },
  { title: "title3", description: "the third description", color: "#7772E2" },
  { title: "title4", description: "the fourth description", color: "#4274FD" },
  { title: "title5", description: "the fifth description", color: "#FDD149" },
];
var currentSlide = 0;

var loadSlide = function(slide){
  $('#title').text(slide.text);
  $('#description').text(slide.description);
  $('#sidebar').css("background-color",slide.color)
};

var next = function(){
  if (currentSlide == slides.length - 1){
  } else {
    $('#nextbutton').show();
    currentSlide = currentSlide + 1;
    loadSlide(slides[currentSlide]);
  }
  if (currentSlide == slides.length - 1){
    $('#nextbutton').hide()
  }
};

$('#nextbutton').click(function(e){
  next()
});
