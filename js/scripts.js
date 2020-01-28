function PlacesVisited() { 
	this.places = [];
	this.currentId = 0;
}
PlacesVisited.prototype.assingId = function(){
	this.currentId++;
	return this.currentId;
}
PlacesVisited.prototype.addPlace = function(place){
	place.id = this.assingId();
	this.places.push(place);
}

PlacesVisited.prototype.delete = function(id){
	for (var i=0; i< this.places.length; i++) {
    if (this.places[i]) {
      if (this.places[i].id == id) {
        delete this.places[i];
        return true;
      }
    }
  };
  return false;
}

function deletebtn(placesVisited, id){
	placesVisited.delete(id)
	id = "#" + id;
	$(id).popover('destroy');
}

function Place(location, landmark, timeOfYear, notes) {
	this.location = location;
	this.landmark =landmark;
	this.timeOfYear = timeOfYear;
	this.notes = notes
}

$(document).ready(function(){
	var placesVisited = new PlacesVisited();
	$('#placesForm').submit(function(event){
		event.preventDefault(); 
		var location = $('#locationInput').val()
		var landmark = $('#landmarkInput').val()
		var time = $('#timeInput').val()
		var notes = $('#notesInput').val()

		var place = new Place(location,landmark,time,notes)
		placesVisited.addPlace(place)
		$(".btn-danger").remove()
		placesVisited.places.forEach(function(visited,i){
			$('#places').append(`<a tabindex="${i}" id="${i}" type="button" class="btn btn-lg btn-danger" data-toggle="popover" data-trigger="focus" title="${visited.location}" data-html=true data-content="<p><strong>Landmark: </strong> ${visited.landmark} <br> <strong> Time of year: </strong>${visited.timeOfYear} <br> <strong>Notes: </strong>${visited.notes}</p>">${visited.location}</a>`)
		})
		$(function () {
			$('[data-toggle="popover"]').popover()
		})
		$('.popover-dismiss').popover({
			trigger: 'focus'
		})
	})
});

