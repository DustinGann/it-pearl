async function GetTemp() {
    "use strict";

    let form = $("#myform");


    let abc = 123;
    let xyz = 111+ abc;
    if (form.valid()) {
        let Placel = document.getElementById("Placel").value;


        let stringWithPlus = Placel.split(' ').join('+');



     //     https://geocoding-api.open-meteo.com/v1/search?name=Daisy+State+park&count=10&language=en&format=json

        let myURL1 = "https://geocoding-api.open-meteo.com/v1/search?name="+ stringWithPlus +"&count=10&language=en&format=json";
       
        let msg2Object = await fetch(myURL1);

        if (msg2Object.status >= 200 && msg2Object.status <= 299) {            
            let msg2JSONText = await msg2Object.text();
            // Parse the JSON string into an object
            let msg2 = JSON.parse(msg2JSONText);


            let latitude  = msg2.results[0].latitude;
            let longitude = msg2.results[0].longitude;


            let myURL2 = "https://api.open-meteo.com/v1/forecast?latitude="+ latitude+"&longitude="+longitude +"&current=temperature_2m&hourly=temperature_2m&temperature_unit=fahrenheit";
            //  https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m&hourly=temperature_2m&temperature_unit=fahrenheit
            //  https://api.open-meteo.com/v1/forecast?latitude=34.23&longitude=-93.73&current=temperature_2m&hourly=temperature_2m&temperature_unit=fahrenheit

           
            alert(myURL2);

        }
        else{
            alert("try again");
        }
        
      
    }




}