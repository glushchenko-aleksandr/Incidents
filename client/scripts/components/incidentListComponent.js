app.component('incidentListComponent', {
    templateUrl: 'templates/incidentList.html',
    controller: ['incidentsService', function (incidentsService) {
        var vm = this;
        
        vm.states = [
            {value: 0, name: 'All'},
            {value: 1, name: 'New'},
            {value: 2, name: 'In Progress'}, 
            {value: 3, name: 'On Hold'},
            {value: 7, name: 'Closed'}
        ];
        vm.selectedState = vm.states[0];

        vm.urgencys = [
            {value: 0, name: 'All'}, 
            {value: 1, name: '1 - High'}, 
            {value: 2, name: '2 - Medium'}, 
            {value: 3, name: '3 - Low'}
        ];
        vm.selectedUrgency = vm.urgencys[0];

        var refreshIncidents = function() {
            incidentsService
            .query(
                vm.selectedState && vm.selectedState.value ? vm.selectedState.value : undefined, 
                vm.selectedUrgency && vm.selectedUrgency.value ? vm.selectedUrgency.value : undefined)
            .then(function (response) {
                vm.incidents = response.data.result;
            });
        };

        vm.onChangeState = function() {
            refreshIncidents();
        };

        vm.onChangeUrgency = function() {
            refreshIncidents();
        };

        vm.$onInit = function() {
            refreshIncidents();
        };
    }],
});