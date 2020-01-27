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
		placesVisited.places.forEach(function(visited){
			$('#places').append(`<button type="button" class="btn btn-lg btn-danger" data-toggle="popover" title="${visited.location}" data-html=true data-content="<p><strong>Landmark: </strong> ${visited.landmark} <br> <strong> Time of year: </strong>${visited.timeOfYear} <br> <strong>Notes: </strong>${visited.notes}</p>">${visited.location}</button>`)
		})
		$(function () {
			$('[data-toggle="popover"]').popover()
		})
	})
});

