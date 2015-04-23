(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    var title = 'My Event Title';
    var location = 'My Event Location';
    var notes = 'My interesting Event notes.';
    var startDate = new Date();
    var endDate = new Date();
    var calendarName = "MyCal";

    // clean up the dates a bit
    startDate.setMinutes(0);
    endDate.setMinutes(0);
    startDate.setSeconds(0);
    endDate.setSeconds(0);

    // add a few hours to the dates, JS will automatically update the date (+1 day) if necessary
    startDate.setHours(startDate.getHours()+2);
    endDate.setHours(endDate.getHours()+3);    

    DemoViewModel = kendo.data.ObservableObject.extend({

        createEvent: function () {
            if (!this.checkSimulator()) {
            	window.plugins.calendar.createEvent(title, location, notes, startDate, endDate,this.onSuccess, this.onError);
            }
        },

        createEventWithOptions: function () {
            if (!this.checkSimulator()) {
              var calOptions = window.plugins.calendar.getCalendarOptions(); // grab the defaults
              calOptions.firstReminderMinutes = 120; // default is 60, pass in null for no reminder/alarm
              calOptions.secondReminderMinutes = 60;
              calOptions.url = "https://www.telerik.com";
            	window.plugins.calendar.createEventWithOptions(title, location, notes, startDate, endDate, calOptions, this.onSuccess, this.onError);
            }
        },

        createEventInteractively: function () {
            if (!this.checkSimulator()) {
            	window.plugins.calendar.createEventInteractively(title, location, notes, startDate, endDate, this.onSuccess, this.onError);
            }
        },

        findEvent: function () {
            if (!this.checkSimulator()) {
            	window.plugins.calendar.findEvent(title, location, notes, startDate, endDate, this.onSuccess, this.onError);
            }
        },

        deleteEvent: function () {
            if (!this.checkSimulator()) {
            	window.plugins.calendar.deleteEvent(title, location, notes, startDate, endDate, this.onSuccess, this.onError);
            }
        },

        listEventsInRange: function () {
            if (!this.checkSimulator()) {
                var fromDate = new Date();
                var toDate = new Date();
            	toDate.setFullYear(2050);
            	window.plugins.calendar.listEventsInRange(fromDate, toDate, this.onSuccess, this.onError);
            }
        },
        
        createCalendar: function () {
            if (!this.checkSimulator()) {
                // note that calendars have a color on iOS which you can set by passing in an instance of
                // window.plugins.calendar.getCreateCalendarOptions() instead of a calendarName.
            	window.plugins.calendar.createCalendar(calendarName, this.onSuccess, this.onError);
            }
        },

        createEventInNamedCalendar: function () {
            if (!this.checkSimulator()) {
            	window.plugins.calendar.createEventInNamedCalendar(title, location, notes, startDate, endDate, calendarName, this.onSuccess, this.onError);
            }
        },

        findAllEventsInNamedCalendar: function () {
            if (!this.checkSimulator()) {
            	window.plugins.calendar.findAllEventsInNamedCalendar(calendarName, this.onSuccess, this.onError);
            }
        },
                
        deleteCalendar: function () {
            if (!this.checkSimulator()) {
            	window.plugins.calendar.deleteCalendar(calendarName, this.onSuccess, this.onError);
            }
        },
        
        checkSimulator: function() {
            if (window.navigator.simulator === true) {
                alert('This plugin is not available in the simulator.');
                return true;
            } else if (window.plugins === undefined || window.plugins.calendar === undefined) {
                alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
                return true;
            } else {
                return false;
            }
        },

        // callbacks
        onSuccess: function(msg) {
            alert('Calendar success: ' + JSON.stringify(msg));
        },

        onError: function(msg) {
            alert('Calendar error: ' + JSON.stringify(msg));
        }
    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);