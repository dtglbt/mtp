'use strict';

var _mainModules = [
    'Services'
    ,'Filters'
    ,'Directives'
    ,'AppConfig'
    ,'ngRoute'
    ,'ngTouch'
    ,'Home'
    // yo:ngMainModules
];


angular.module('MTP', _mainModules )
    .config( function($routeProvider){
        //redirect any invalid hash to /home
        $routeProvider.otherwise({
            redirectTo: '/home'
        });

        var routes = [];

        routes.push({
            name: '/home',
            params: {
                templateUrl: 'scripts/home/views/home.html',
                controller: 'HomeCtrl'
            }
        });
        
// yo:ngRoutes

        routes.forEach(function(route){
            $routeProvider.when(route.name, route.params);
        });
    });
