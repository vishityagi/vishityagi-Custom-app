angular.module('reviewBook.controllers', ['ionic', 'reviewBook.services'])


/*
Controller for the d page
*/
.controller('ReviewsCtrl', function($scope, Document) {
  $scope.none={};
    $scope.update = function(customer) {

    $scope.master = angular.copy(customer);
    Document.add($scope.master);
      
    
  };
   $scope.reset = function() {
    
    $scope.customer = angular.copy($scope.none);

  };
  $scope.reset();
    
  })
.controller('CustomersCtrl', function($scope,Document) {

  // get the list of our customers from the Document service
    $scope.documents = [];
    $scope.document = null;
    // Get all the documents
    Document.all().then(function(documents){
        $scope.customers = documents;
    });
  $scope.remove = function(customer){ 
     $scope.master = angular.copy(customer);
   Document.removecustomer($scope.master);
 }
  $scope.search = function(name){ 
     $scope.master = angular.copy(name);
   Document.searchcustomer($scope.master).then(function(documents){
        $scope.customers = documents;
    });

}
  

})


/*
Controller for the Reviews page
*/
.controller('eviewsCtrl', ['$scope','user',function($scope,Document) {
    // Wait for Cordova to load
    // Wait for Cordova to load


    $scope.documents = [];
    $scope.document = null;
    // Get all the documents
    $scope.update = function(customer) {

    $scope.master = angular.copy(customer);
    Document.add($scope.master);
      
    
  };
 $scope.reset = function(form) {
    
    $scope.customer = angular.copy($scope.none);

  };
     

  

}])


/*
Controller for our tab bar
*/
.controller('TabsCtrl', function($scope) {

})
.controller('MianCtrl', function($scope) {

})
