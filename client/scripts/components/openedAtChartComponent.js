app.component('openedAtChartComponent', {
    templateUrl: 'templates/openedAtChart.html',
    controller: ['incidentsService', function (incidentsService) {
        var vm = this;

        var groupBy = function (arr, prop) {
            return arr.reduce(function (groups, obj) {
                groups[obj[prop]] = groups[obj[prop]] || 0;
                groups[obj[prop]]++;
                return groups;
            }, {});
        };

        var getFormatedDate = function(dateString) {
            var date = new Date(dateString);
            var year = date.getFullYear().toString();
            var month = (date.getMonth() + 1).toString();
            month = month.length == 1 ? '0' + month : month;
            return year + '-' + month;
        }; 

        vm.$onInit = function () {

            incidentsService
                .groupByOpenedAt()
                .then(function (response) {
                    var result = response.data.result
                        .map(function (item) { 
                            return {
                                opened_at: getFormatedDate(item.opened_at)
                            };
                        });
                    result = groupBy(result, 'opened_at');

                    var labels = Object.keys(result);
                    labels.sort();
                    var values = labels.map(function (item) { return result[item] });;

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
                    var ctx = document.getElementById('openedatchart').getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'line',
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