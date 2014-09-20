// Docs at http://simpleweatherjs.com
function createCookie(name,value) {
  var days = 120;
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return "Jenison, Michigan";
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}
$(document).ready(function() {
    var place = readCookie("place");
    if(place === "Jenison, Michigan"){
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
    }
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
          createCookie("place", place);
      
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
