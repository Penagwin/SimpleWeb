// Docs at http://simpleweatherjs.com

$(document).ready(function() {

    var place = "Jenison, Michigan";
    function getWeather() {

      $.simpleWeather({
        location: place,
        woeid: '',
        unit: 'f',
        success: function(weather) {
          html = '<h2 id="toppiece"><i class="icon-'+weather.code+'"></i> '+ (weather.temp)+'&deg;'+weather.units.temp+'</h2>';
          html += '<div id="place">'+weather.city+', '+weather.region+'</div>';
          html += '    <input id="place_entry" style="display:none;"></input>';

      
          $("#weather").html(html);
          $('#place').click(function() {
              $('#place').css('display', 'none');
              $('#place_entry').css('width', $('#place').width() );
              $('#place_entry').css('font-size', $('#place').css('font-size') );

              $('#place_entry').val($('#place').text()).css('display', '').focus();
          });

          $('#place_entry').blur(function() {
            $('#place_entry').css('display', 'none');
            $('#place_entry_padding').css('padding', "20px");

            $('#place').text($('#place_entry').val()).css('display', '');
          
          });
          $('#place_entry').change(function() {
            place = $('#place_entry').val();
            getWeather();
          });
        },
        error: function(error) {
          $("#weather").html('<p>'+error+'</p>');
        }
      });
    }
    getWeather();

    
    
});
