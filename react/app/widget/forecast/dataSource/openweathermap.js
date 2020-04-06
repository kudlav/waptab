export function getWeather(location) {
    return fetch('https://api.openweathermap.org/data/2.5/forecast?q='+location+'&units=metric&apikey=4fd4cec874c7634f89c637cec5262f4c&lang=cz')  
    .then(response => response.json())
    .then(
        function(output)
        {
            var val = [];
            var Dates = filterDates();
            output.list.forEach(function (item, index) {
                console.log(item);
                if(Dates.includes(item.dt_txt) || index == 0)
                {
                    val.push({
                        temp: Math.floor(item.main.temp), 
                        weather: item.weather[0].description, 
                        icon: 'http://openweathermap.org/img/wn/'+item.weather[0].icon+'@2x.png'});
                }
              });
            
            return val;
        }
        )
  }

function filterDates(){
    var output = []
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const after_2 = new Date(today);
    after_2.setDate(today.getDate() + 2);
    const after_3 = new Date(today);
    after_3.setDate(today.getDate() + 3);

    output.push(createDate(tomorrow));
    output.push(createDate(after_2));
    output.push(createDate(after_3));
    console.log(createDate(tomorrow));
    console.log(createDate(after_2));
    console.log(createDate(after_3));
    return output;
}

function createDate(date){
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();

    var output = yyyy + '-' + mm + '-' + dd+' 15:00:00';
    return output;
}