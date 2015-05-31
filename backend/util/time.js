var moment = require('moment');

var time = {};

time.lastWeekdayOfMonth = function(weekday) {
    var timeWrapper = moment();

    // Get total days in the current month
    var daysInTheMonth = timeWrapper.daysInMonth();

    // Set current day to the last day of the month
    timeWrapper.date(daysInTheMonth);

    while(timeWrapper.isoWeekday() != weekday) {
        timeWrapper.subtract(1, 'days');
    }

    return timeWrapper.toDate();
};

time.substract = function(number,variable,date) {
    return moment(date).subtract(number, variable).toDate()
};

module.exports = time;
