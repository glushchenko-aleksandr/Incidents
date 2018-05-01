app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('main', {
        url: '/',
        component: 'mainComponent',
        redirectTo: 'main.incidents'
    });

    $stateProvider.state('main.incidents', {
        url: 'incidents',
        component: 'incidentListComponent'
    });

    $stateProvider.state('main.incidents.dialog', {
        url: '/{sys_id}',
        component: 'incidentDialogComponent'
    });
}]);