app.component('stateChartComponent', {
    templateUrl: 'templates/stateChart.html',
    controller: ['incidentsService', function (incidentsService) {
        var vm = this;

        vm.$onInit = function () {
            incidentsService
                .groupByState()
                .then(function (response) {
                    var values = response.data
                        .map(function (item) { return item.value });
                    var labels = response.data
                        .map(function (item) { return item.label });

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
                            title: {
                                display: true,
                                text: 'Incidents By State',
                                fontSize: 16
                            },
                            layout: {
                                padding: {
                                    left: 10,
                                    right: 10,
                                    top: 10,
                                    bottom: 10
                                }
                            },
                            legend: {
                                position: 'bottom',
                                labels: {
                                    fontSize: 14
                                }
                            }
                        }
                    });
                });
        };
    }],
});