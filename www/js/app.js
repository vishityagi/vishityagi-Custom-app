// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)

angular.module('reviewBook', ['ionic', 'ngCordova','reviewBook.controllers'])

.run(function($ionicPlatform,$cordovaSQLite,DB) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    DB.init();
  });
})



.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
    .state('page1', {
      url: '/main',
      templateUrl: 'page1.html'
    })
    
    .state('page2', {
      url: '/login',
      templateUrl: 'page2.html'
    })
    
    .state('page3', {
      url: '/signup',
      templateUrl: 'page3.html'
    })
    
    
     .state('tab', {
    url: '/tab',
    //abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'TabsCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.Reviews', {
    url: '/Reviews',
    views: {
      'tab-Reviews': {
        templateUrl: 'templates/Reviews.html',
        controller: 'ReviewsCtrl'
      }
    }
  })

  .state('tab.Customers', {
      url: '/Customers',
      views: {
        'tab-Customers': {
          templateUrl: 'templates/Customers.html',
          controller: 'CustomersCtrl'
        }
      }
    })

  .state('tab.Reminders', {
      url: '/Reminders',
      views: {
        'tab-Reviews': {
          templateUrl: 'templates/Reminders.html',
          controller: 'RemindersCtrl'
        }
      }
    })
     // if none of the above states are matched, use this as the fallback
  
  $urlRouterProvider.otherwise('/main');
  

})
.constant('DB_CONFIG', {
    name: 'DB',
    tables: [
      {
            name: 'documents',
            columns: [
               
                {name: 'name', type: 'text'},
                {name: 'email', type: 'text'},
                {name: 'phoneNum', type: 'text'},
                {name: 'release_date', type: 'date'},
                {name: 'stars', type: 'integer'}
            ]
        }
    ]
  })

//.constant('SERVER', {
  // Local server
  //url: 'http://localhost:3000'

  // Public Heroku server
 // url: 'https://ionic-songhop.herokuapp.com'
//});
