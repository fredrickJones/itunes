'use strict';
var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your method you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in. 
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here

	this.getArtist = function(artist) {
		var deferred = $q.defer();
		$http ({
			method: 'JSONP',
			url: 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
		}).then(function(info) {
			// debugger;
			var result = info.data.results;
			var tempArr = [];

			for (var i = 0; i < result.length; i++) {
				var tempData = {};
				tempData.AlbumArt = result[i].artworkUrl100;
				tempData.Artist = result[i].artistName;
				tempData.Collection = result[i].collectionName;
				tempData.CollectionPrice = result[i].collectionPrice;
				tempData.Play = result[i].previewUrl;
				tempData.Type = result[i].kind;
				tempData.SongName = result[i].trackName;
				tempArr.push(tempData);
				// console.log(tempData.Artist);
			}
			console.log(result);
			deferred.resolve(tempArr);
		});
		return deferred.promise;  //this is returning the promise that I built.
	};

	// this.getArtist = function(artist, type) {
	// 	var deferred = $q.defer();
	// 	$http ({
	// 		method: 'JSONP',
	// 		url: 'https://itunes.apple.com/search?term=' + artist + '&media=' + type + '&callback=JSON_CALLBACK'
	// 	}).then(function(info) {
	// 		var data = info.data.results;
	// 		var songArr = [];
	// 		for(var i = 0; i < data.length; i++) {
	// 			var songObj = {
	// 				AlbumArt: data[i].artworkUrl100,
	// 				Artist: data[i].artistName,
	// 				Collection: data[i].collectionName,
	// 				CollectionPrice: data[i].collectionPrice,
	// 				Play: data[i].previewUrl,
	// 				Type: data[i].kind,
	// 				SongName: data[i].trackName,
	// 			};
	// 			songArr.push(songObj);
	// 		}
	// 		deferred.resolve(songArr);
	// 	}, function(error) {
	// 		deferred.reject(error);
	// 	});
	// 	return deferred.promise;
	// };



	
});

