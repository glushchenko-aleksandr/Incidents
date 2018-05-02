app.filter('shortDate', function () {
    return function (date) {
        if (date != null) {
            return moment(date).format('L');
        }
        return null;
    };
});