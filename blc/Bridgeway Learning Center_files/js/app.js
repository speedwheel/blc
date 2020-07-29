$( document ).ready(function() {
    console.log( "ready!" );
});

var blc = function() {
    var googleColorIDs = [
        '', 'lavender', 'sage', 'grape', 'flamingo', 'banana', 'tangerine', 'peacock', 'graphite', 'blueberry', 'basil', 'tomato'
    ];

   var _getCalendar = function() {
        var $calendar = $('.js-calendar');
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
                    date = new Date(dateString);

                    const month = date.toLocaleString('default', { month: 'short' });
                    const weekday = date.toLocaleString('default', { weekday: 'short' });
                    var time = '';
                    if (hasTime) {
                        console.log(date.getHours())
                        time = ' at ' + date.getHours() + ':' + date.getMinutes();
                    }
                    var $li = $('<li/>').addClass('event-item ' + googleColorIDs[event.colorId]).html(weekday + ', ' + month + ' ' + date.getDay() + time + ' ' + event.summary);
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

blc.init();
