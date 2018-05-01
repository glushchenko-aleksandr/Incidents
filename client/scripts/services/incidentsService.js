app.factory('incidentsService', ['$http', function ($http) {

    function query(state, urgency) {
        return $http.get('api/incidents/query', {
            params: {
                'state': state,
                'urgency': urgency
            }
        });
    }

    function groupByState() {
        return $http.get('api/incidents/groupByState', {});
    }

    function groupByOpenedAt() {
        return $http.get('api/incidents/groupByOpenedAt', {});
    }    

    function get(sys_id) {
        return $http.get('api/incidents/get/' + sys_id, {});
    }

    function resolve(sys_id) {
        return $http.post('api/incidents/resolve/' + sys_id, {});
    }

    return {
        query: query,
        get: get,
        groupByState: groupByState,
        groupByOpenedAt: groupByOpenedAt,
        resolve: resolve,
    };
}]);