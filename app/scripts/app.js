// Example Album
var albumPicasso = {
  name: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: '/images/album-placeholder.png',
  songs: [
  { name: 'Blue', length: '4:26' },
  { name: 'Green', length: '3:14' },
  { name: 'Red', length: '5:01' },
  { name: 'Pink', length: '3:21'},
  { name: 'Magenta', length: '2:15'}
  ]
};

blocJams = angular.module('BlocJams', ['ui.router']);

blocJams.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
 $locationProvider.html5Mode(true);

 $stateProvider.state('landing', {
   url: '/',
   controller: 'Landing.controller',
   templateUrl: '/templates/landing.html'
 });
 
 $stateProvider.state('collection', {
   url: '/collection',
   controller: 'Collection.controller',
   templateUrl: '/templates/collection.html'
 });

 $stateProvider.state('album', {
   url: '/album',
   controller: 'Album.controller',
   templateUrl: '/templates/album.html'
 });

}]);

blocJams.controller('Landing.controller', ['$scope', 'ConsoleLogger', function($scope, ConsoleLogger){
  $scope.subText = "Turn down for what?";
  $scope.consoleLogger = ConsoleLogger;
  $scope.subTextClicked = function() {
    $scope.subText += "?";
  };

  var randoAlbums = [
  '/images/album-placeholders/album-1.jpg',
  '/images/album-placeholders/album-2.jpg',
  '/images/album-placeholders/album-3.jpg',
  '/images/album-placeholders/album-4.jpg',
  '/images/album-placeholders/album-5.jpg',
  '/images/album-placeholders/album-6.jpg',
  '/images/album-placeholders/album-7.jpg',
  '/images/album-placeholders/album-8.jpg',
  '/images/album-placeholders/album-9.jpg',
  ];

  $scope.randoAlbm = function() {
    $scope.albumURLs = shuffle(randoAlbums);
  };

  $scope.albumURLs = shuffle(randoAlbums);

  function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
  }

}]);
blocJams.controller('Collection.controller', ['$scope', 'ConsoleLogger', function($scope, ConsoleLogger){
  $scope.albums = [];
  for (var i = 0; i < 33; i++) {
    $scope.albums.push(angular.copy(albumPicasso));
  };
}]);

blocJams.controller('Album.controller',  ['$scope', 'ConsoleLogger', 'SongPlayer',function($scope, ConsoleLogger, SongPlayer){
  $scope.album = angular.copy(albumPicasso);

  var hoveredSong = null;


  $scope.onHoverSong = function(song) {
   hoveredSong = song;
 };
 
 $scope.offHoverSong = function(song) {
   hoveredSong = null;
 };

 $scope.getSongState = function(song) {
   if (song === SongPlayer.currentSong && SongPlayer.playing ) {
     return 'playing';
   }
   else if (song === hoveredSong) {
     return 'hovered';
   }
   return 'default';
 };
 
 $scope.playSong = function(song) {
  SongPlayer.setSong( $scope.album, song );
  SongPlayer.play();
};

$scope.pauseSong = function(song) {
  SongPlayer.pause();
};
}]);

blocJams.controller('PlayerBar.controller', ['$scope', 'ConsoleLogger', 'SongPlayer', function( $scope, ConsoleLogger, SongPlayer ){
  $scope.songPlayer = SongPlayer;
}])


blocJams.service('SongPlayer', function() {
   return {
     currentSong: null,
     currentAlbum: null,
     playing: false,
 
     play: function() {
       this.playing = true;
     },
     pause: function() {
       this.playing = false;
     },
     setSong: function(album, song) {
       this.currentAlbum = album;
       this.currentSong = song;
     }
   };
 });