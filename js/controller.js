(function() {
  
  'use strict';

  angular
    .module( 'formApp' )
    .controller( 'FormController', FormController );

  FormController.$inject = [ '$scope' ];

  function FormController( $scope ) {

    var vm = this;

    ///////////// Properties
    vm.customer = {};

    ///////////// Public Methods
    vm.save = save;

    ///////////// Private Methods

    /////////////
    function save( data ) {

      console.log( 'Data were successfully sent to the server!' );
      console.log( JSON.stringify( data, null, 2 ));
      
      vm.customer = {};

      // we need $scope to use this method
      $scope.customerForm.$setPristine();

    }

  }

}());