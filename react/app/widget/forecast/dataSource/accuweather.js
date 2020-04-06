export function getWeather(location) {
    return fetch('http://dataservice.accuweather.com/locations/v1/cities/search?apikey=TdWaMfjPIuyD2Wt96UGtpJLZiAPDjc6w&q='+location)  
    .then(response => response.json())
    .then(
        function(output)
        {
            console.log(output[0].Key);
            return fetch('http://dataservice.accuweather.com/forecasts/v1/daily/5day/'+output[0].Key+'?apikey=TdWaMfjPIuyD2Wt96UGtpJLZiAPDjc6w&language=cs-cz')
            .then(response => response.json())
            .then(
                function(output)
                {
                    var val = [];
                    var i;
                    for (i = 0; i < 4; i++) 
                    {
                        val.push({
                            temp: Math.floor(convertToCelsius(output.DailyForecasts[i].Temperature.Minimum.Value)), 
                            weather: output.DailyForecasts[i].Day.IconPhrase, 
                            icon: 'https://developer.accuweather.com/sites/default/files/'+String(output.DailyForecasts[i].Day.Icon).padStart(2, '0')+'-s.png' 
                            });
                    }
                    return val;
                }
                )
        }
    )
  }

  function convertToCelsius(value)
  {
      return (5/9) * (value - 32);
  }