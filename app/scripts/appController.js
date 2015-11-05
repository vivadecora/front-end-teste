var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.contact;
	$scope.success = false;
	$scope.condition = true;

	$scope.projetos = [
		{ url: 'images/bitmap.png' },
		{ url: 'images/bitmap.png' },
		{ url: 'images/bitmap.png' },
		{ url: 'images/bitmap.png' }
	];

	$scope.submitForm = function() {
		$scope.contact = "";
		$scope.condition = false;
		$scope.success = true;
	}

}]);