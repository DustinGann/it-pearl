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
           
            let msg3Object = await fetch(myURL2);

            if (msg2Object.status >= 200 && msg2Object.status <= 299) { ///////////
                 let msg3JSONText = await msg3Object.text();

                 let msg3 = JSON.parse(msg3JSONText);

                 //local string
                 
            

                 let Heatdate = 0;
                let Heatvalue = 0;
                  Heatdate = [];
                 Heatvalue = [];

                
                 
                let numdays = msg3.hourly.time.length;
                if (numdays > 0) {
                    for (let i = 0; i < numdays; i++) {
                        /* stock close value */
                        Heatvalue[i] = msg3.hourly.temperature_2m[i];
                        /* stock volume */
                      
                        /* date is in Unix milleseconds - create a temporary date variable */
                        let tempdate = new Date(msg3.hourly.time[i]);
                        /* extract the date string from the value */
                        Heatdate[i] = tempdate.toLocaleString();
                        
                        //toLocaleString

                        //toLocalDateString()
                        //toLocalTimeString()
                    }
                }

                let Heatvaluetable = "";
                if (numdays > 0) {
                    Heatvaluetable = Heatvaluetable + "<table><caption>Temprature </caption><tr><th>Date</th><th>Temperature</th></tr>";
                    for (let i = 0; i < 10; i++) {
                        Heatvaluetable = Heatvaluetable + "<tr><td>" + Heatdate[i] + "</td><td>" + Heatvalue[i] + "</td></tr>";
                    }
                    Heatvaluetable = Heatvaluetable + "</table>"
                    document.getElementById("Heatvaluetable").innerHTML = Heatvaluetable;

                    
                }

                let ctx1 = document.getElementById("chartjs-1");
                let myChart1 = new Chart(ctx1, {
                    "type":"line",
                    "data": {
                        "labels": Heatdate,
                        "datasets":[{"label":"Temperature",
                        "data": Heatvalue,
                        "fill":false,
                        "borderColor":"rgb(255, 214, 48)",
                        "lineTension":0.1}]},
                        "options":{ 
                            responsive: false,
                            maintainAspectRatio: true,
                        }
                    }
                );

            }
            else{
                alert("fail");
            }











            

        }
        else{
            alert("try again");
        }
        
      
    }




}


function ClearForm() {
    "use strict;"

    let canvas0 = document.getElementById("chartjs-1");
    let context0 = canvas0.getContext('2d');    
    context0.clearRect(0, 0, canvas0.width, canvas0.height);



    document.getElementById("Heatvaluetable").innerHTML = "";
    
    
    document.getElementById("Placel").value = "Daisy State Park";
    
    
}