angular.module('techNodeApp').controller('RoomsCtrl', ['$scope', '$location', 'server', function($scope, $location, server) {
  $scope.searchRoom = function() {
    if ($scope.searchKey) {
      $scope.filteredRooms = $scope.rooms.filter(function(room) {
        return room.name.indexOf($scope.searchKey) > -1
      })
    } else {
      $scope.allRooms = $scope.rooms
    }

  }
  $scope.createRoom = function() {
    if(!$scope.newRoom && !$scope.searchKey) return;
    server.createRoom({
      name: $scope.searchKey || $scope.newRoom,
      master:$scope.me.name
    })
    var crenRoom = function () {
      for(reRoom in $scope.allRooms){
        var evRoom = $scope.allRooms[reRoom]
        if(evRoom.name == ($scope.searchKey || $scope.newRoom)) {
          clearInterval(crenRoom)
          window.location.href = '/rooms/' + evRoom._id
        }
      }}
    setInterval(crenRoom,100)
  }
  $scope.enterRoom = function(room) {
    $location.path('/rooms/' + room._id)
  }

  $scope.allRooms = $scope.rooms = server.getRooms()

  $scope.$watchCollection('rooms', function() {
    $scope.searchRoom()
  });
}])