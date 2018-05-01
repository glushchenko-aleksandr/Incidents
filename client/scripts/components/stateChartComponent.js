app.component('stateChartComponent', {
    templateUrl: 'templates/stateChart.html',
    controller: ['incidentsService', function (incidentsService) {
        var vm = this;

        vm.$onInit = function () {
            incidentsService
                .groupByState()
                .then(function (response) {
                    var values = response.data.result
                        .map(function (item) { return item.stats.count });
                    var labels = response.data.result
                        .map(function (item) { return item.groupby_fields[0].value });

                    var data = {
                        datasets: [{
                            data: values,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }],
                        labels: labels
                    };
                    var ctx = document.getElementById('statechart').getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'doughnut',
                        data: data,
                        options: {
                            layout: {
                                padding: {
                                    left: 20,
                                    right: 20,
                                    top: 50,
                                    bottom: 50
                                }
                            }
                        }
                    });
                });
        };
    }],
});