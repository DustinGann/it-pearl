"use strict"
$( "#CircleForm" ).validate({

});

function CircleCalculations() {
if ($( "#CircleForm" ).valid()){
   

    

    let radius;
    let radiusfp;
    let diameter;
    let circumference;
    let area;

    radius = document.getElementById("radius").value;
    radiusfp = parseFloat(radius)
    diameter = calculateDiameter(radiusfp);
    

    circumference = calculateCircumference(radiusfp);
    area = calculateArea(radiusfp);

    document.getElementById("diameter").innerHTML= diameter;
    document.getElementById("circumference").innerHTML= circumference;
    document.getElementById("area").innerHTML= area;

    
}

function calculateDiameter(r)
{
return 2 * r;
}

function calculateCircumference(r)
{
return 2 * Math.PI * r;
}

function calculateArea(r)
{
return Math.PI *  (r*r)  ;
}
    
    



}