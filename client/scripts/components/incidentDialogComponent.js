app.component('incidentDialogComponent', {
    templateUrl: 'templates/incidentDialog.html',
    controller: ['$state', '$stateParams', 'incidentsService', function ($state, $stateParams, incidentsService) {
        var vm = this;

        vm.close = function () {
            $state.go('main.incidents');
        };

        vm.$onInit = function () {
            incidentsService.get($stateParams.sys_id)
                .then(function (response) {
                    vm.incident = response.data.result;
                    vm.show = 'show';
                });
        };
    }],
});