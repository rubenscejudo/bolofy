angular.module('bandControllers', ['bandServices'])
	.controller('searchController', function($scope, $rootScope, spotifyService,$location) {

		$scope.findArtist = function() {
			var artist = $scope.artistQuery;
			spotifyService.getArtists(artist)
				.then( function(response) {
					//console.log(response)
					//console.log(response.data.artists.items)
					$rootScope.dataArtists = response.data.artists.items;
					$location.path('/results')
				})
		}

	})
	.controller('resultsController', function($scope, $rootScope, spotifyService, $location) {	
		//$scope.artists= $rootScope.dataArtists;

		$scope.getArtistInfo = function(artist) {
			var id = artist.id
				console.log("ID" + id)
			spotifyService.getAlbums( id ) 
				.then (function(response) {	
					//console.log(response)
				$rootScope.album = response.data.items;
				$location.path('/details')
					//console.log($rootScope.album)
				})			

		}

		
	})
	.controller('detailsController', function($scope, $rootScope, spotifyService, $location){
		$scope.albums = $rootScope.album;

		$scope.findTracks = function(albums) {
			console.log(albums)
			var idAlbum = albums.id
			console.log(idAlbum)
			spotifyService.getTracks(idAlbum)
			.then (function(response) {
				//console.log(response)
			$scope.tracks = response.data.items;
			})
		}


	})
/*
	$scope.findAlbums = function() {
				spotifyService.getAlbums($scope.idArtist)
					.then( function(response) {
						$rootScope.albums = response.data.items;
					} )
			}*/



	/*.controller('albumsController', function($scope, $rootScope, spotifyService) {

		$scope.findTracks = function() {
			console.log ("looking for tracks...")
				var idAlbum = $scope.dataAlbum.split("|")[0];
				$rootScope.coverAlbum = $scope.dataAlbum.split("|")[1];
				spotifyService.getTracks(idAlbum)
					.then( function(response) {
						$rootScope.tracks = response.data.items;
					} )
			}
	})*/
