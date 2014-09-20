// Docs at http://simpleweatherjs.com

$(document).ready(function() {
    var place = "Jenison, Michigan";
    jQuery.ajax( { 
      url: '//freegeoip.net/json/', 
      type: 'POST', 
      dataType: 'jsonp',
      success: function(location) {
       setPlace(location.city+", " +location.region_name);
       getWeather();
       setWeather();
    }
      
    });
    console.log(place);
    function setPlace(nplace){
      place = nplace;
    }
    var weathercode, weathertemp, weatherunitstemp, weathercity, weatherregion;
    function setWeather(){
      if($(window).width() > $(window).height()){
            html = '<h2 id="toppiece"><i id="weathericon" class="icon-'+weathercode+'"></i> '+ (weathertemp)+'&deg;'+weatherunitstemp+'</h2>';
          

      }else{
            html = '<h2 id="toppiece"><i class="icon-'+weathercode+'"></i> </h2><h2 id="tempnum">'+ (weathertemp)+'&deg;'+weatherunitstemp+'</h2>';
                  
          }
          html += '<div id="place">'+weathercity+', '+weatherregion+'</div>';
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
    }
    function getWeather() {

      $.simpleWeather({
        location: place,
        woeid: '',
        unit: 'f',
        success: function(weather) {
        weathercode = weather.code, weathertemp = weather.temp, weatherunitstemp = weather.units.temp;
        weathercity =  weather.city, weatherregion = weather.region;
        setWeather();
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
    $(window).resize(function() {
      setWeather();
    });
    
    
});
