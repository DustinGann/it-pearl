async function GetStock() {
    "use strict";

    // Get a reference to the form - Use the ID of the form
    let form = $("#myform");
    
    // If all of the form elements are valid, the get the form values
    if (form.valid()) {
        
        
        let apiKey = "35eaVfKsObXpSg2O4kMLj9udr2DgVW1f"
        let baseCurrency = document.getElementById("baseCurrency").value;
        let convertCurrency = document.getElementById("convertCurrency").value;

        let FromDate = document.getElementById("FromDate").value;
        let ToDate = document.getElementById("ToDate").value;

 
        /* URL for AJAX Call */
        let myURL2 = "https://api.polygon.io/v2/aggs/ticker/C:" + baseCurrency + convertCurrency + "/range/1/day/" + FromDate + "/" + ToDate + "?adjusted=true&sort=asc&apiKey=" + apiKey;
        /* Make the AJAX call */
        let msg2Object = await fetch(myURL2);
        /* Check the status */
        if (msg2Object.status >= 200 && msg2Object.status <= 299) {            
            let msg2JSONText = await msg2Object.text();
            // Parse the JSON string into an object
            let msg2 = JSON.parse(msg2JSONText);
            /* Your code to process the result goes here - 
               display the returned message */
                /* Your code to process the result goes here  
                    display the returned message */
                let stockdate = [];
                let stockvalue = [];
                let stockvolume = [];
                let numdays = msg2.results.length;
                if (numdays > 0) {
                    for (let i = 0; i < numdays; i++) {
                        /* stock close value */
                        stockvalue[i] = msg2.results[i].c;
                        /* stock volume */
                        stockvolume[i] = msg2.results[i].v;
                        /* date is in Unix milleseconds - create a temporary date variable */
                        let tempdate = new Date(msg2.results[i].t);
                        /* extract the date string from the value */
                        stockdate[i] = tempdate.toLocaleDateString();
                    }
                }

                let stockvaluetable = "";
                if (numdays > 0) {
                    stockvaluetable = stockvaluetable + "<table><caption>Stock Price</caption><tr><th>Date</th><th>Price</th></tr>";
                    for (let i = 0; i < numdays; i++) {
                        stockvaluetable = stockvaluetable + "<tr><td>" + stockdate[i] + "</td><td>" + stockvalue[i] + "</td></tr>";
                    }
                    stockvaluetable = stockvaluetable + "</table>"
                    document.getElementById("StockValueTable").innerHTML = stockvaluetable;
                }
                
                let stockvolumetable = "";
                if (numdays > 0) {
                    stockvolumetable = stockvolumetable + "<table><caption>Stock Volume</caption><tr><th>Date</th><th>Volume</th></tr>";
                    for (let i = 0; i < numdays; i++) {
                        stockvolumetable = stockvolumetable + "<tr><td>" + stockdate[i] + "</td><td>" + stockvolume[i] + "</td></tr>";
                    }
                    stockvolumetable = stockvolumetable + "</table>"
                    document.getElementById("StockVolumeTable").innerHTML = stockvolumetable;
                }

                let ctx0 = document.getElementById("chartjs-0");
                let myChart0 = new Chart(ctx0, {
                    "type":"line",
                    "data": {
                        "labels": stockdate,
                        "datasets":[{"label":"Stock Close",
                        "data": stockvalue,
                        "fill":false,
                        "borderColor":"rgb(75, 192, 192)",
                        "lineTension":0.1}]},
                        "options":{ 
                            responsive: false,
                            maintainAspectRatio: true,
                        }
                    }
                );
                
                let ctx1 = document.getElementById("chartjs-1");
                let myChart1 = new Chart(ctx1, {
                    "type":"line",
                    "data": {
                        "labels": stockdate,
                        "datasets":[{"label":"Stock Volume",
                        "data": stockvolume,
                        "fill":false,
                        "borderColor":"rgb(75, 192, 192)",
                        "lineTension":0.1}]},
                        "options":{ 
                            responsive: false,
                            maintainAspectRatio: true,
                        }
                    }
                );
            
        }
        else {
            /* AJAX completed with error - probably invalid stock ticker symbol */
            alert("Stock Not Found - Status: " + msg2Object.status)
            return
        }
    }
}

function ClearForm() {
    "use strict;"

    document.getElementById("StockSymbol").value = "";
    document.getElementById("StockSymbolError").innerHTML = "";
    document.getElementById("FromDate").value = "";
    document.getElementById("FromDateError").innerHTML = "";
    document.getElementById("ToDate").value = "";
    document.getElementById("ToDateError").innerHTML = "";
    document.getElementById("company").innerHTML = "";
    document.getElementById("address").innerHTML = "";
    document.getElementById("description").innerHTML = "";
    document.getElementById("employees").innerHTML = "";
    document.getElementById("url").innerHTML = "";
    document.getElementById("url").href = "";
    document.getElementById("StockValueTable").innerHTML = "";
    document.getElementById("StockVolumeTable").innerHTML = "";
    
    /* Ugly Code to Erase Canvas */
    let canvas0 = document.getElementById("chartjs-0");
    let context0 = canvas0.getContext('2d');    
    context0.clearRect(0, 0, canvas0.width, canvas0.height);
    let canvas1 = document.getElementById("chartjs-1");
    let context1 = canvas1.getContext('2d');    
    context1.clearRect(0, 0, canvas1.width, canvas1.height);
}