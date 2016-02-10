$(document).on("ready", function(){
	$(".js-artist-submit").on("click", getSpotifyArtists)
})

function getSpotifyArtists(){
	var searchTerm = $('.js-artist-input')
											.val()
											.split(" ")
											.join("+");

	$.ajax({
		url: "https://api.spotify.com/v1/search?type=artist&query=" + searchTerm,
		success: onArtistFindSuccess, 
		error: onArtistFindError
	})
	// This clears the input box's term
	$('.js-artist-input').val("")
}

function onArtistFindSuccess(artistResponse){
	$(".artist-list").empty();

	artistResponse.artists.items.forEach(function(artist){
		createArtistHtml(artist);
	})
}

function createArtistHtml(artist){
	var image;

	if (artist.images.length > 0){
		image = artist.images[0].url
	} else {
		image = "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQCk2bayZHUJsWeglTeTOvjcX3PvSpnkqU3T-6YmCE6bT1nFQ56Bw"
	}

	var html = `
	<li class="artist-item">
		<h4>${artist.name}</h4>
		<img class="artist-image" src="${image}">
	</li>
	`;

	$(".artist-list").append(html);
}

function onArtistFindError(err){
	console.log("You dun goofed", err);
}
