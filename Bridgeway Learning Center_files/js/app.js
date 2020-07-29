$( document ).ready(function() {
    blc.init();
});

var blc = function() {
    var googleColorIDs = [
        '', 'lavender', 'sage', 'grape', 'flamingo', 'banana', 'tangerine', 'peacock', 'graphite', 'blueberry', 'basil', 'tomato'
    ];

   var _getCalendar = function() {
        var $calendar = $('.js-calendar');
        $calendar.html('<div class="d-flex justify-content-center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></div>');
        $.ajax({
            url: "https://calendar.homeschoolacademy.com/api/events", 
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Basic " + btoa('edovate' + ":" + 'c#F}ZAp32e36f7ES'));
            },
            success: function( data ) {
                var $ul = $('<ul/>').addClass('event-list');
                $.each(data, function (index, event) {
                    if (!event.hasOwnProperty('colorId')) {
                        event.colorId = 7;
                    }
                    
                    var date;
                    var dateString = '';
                    if (event.start.hasOwnProperty('dateTime')) {
                        dateString = event.start.dateTime;
                    } else if (event.start.hasOwnProperty('date')) {
                        dateString = event.start.date;
                    }

                    var hasTime = false;
                    if (dateString.length > 10) {
                        hasTime = true;
                    }
                    date = moment.tz(dateString,"America/New_York");
                    console.log(date)
                    
                    var time = '';
                    if (hasTime) {
                        time = ' at ' + date.format('hh') + ':' + date.format('mm');
                    }
                    var $li = $('<li/>').addClass('event-item ' + googleColorIDs[event.colorId]).html(date.format('ddd') + ', ' + date.format('MMM') + ' ' + time + ' EST - ' + event.summary);
                    $ul.append($li);
                    $calendar.html($ul);
                });   
            }
        });
    }
    return {
        init: function() {
            _getCalendar();
        }
      }
}();
