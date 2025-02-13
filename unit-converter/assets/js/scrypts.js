function calculate() {
    "use strict";

    // Get a reference to the form - Use the ID of the form
    let form = $( "#myform" );
    
    // If all of the form elements are valid, the get the form values
    if (form.valid()) {
        
        // Operand 1
        let operand1 = document.getElementById("Operand1").value;

        // Operator
        // Get the value associated with the operator that was checked (+, -, *, or /)
        let operator;
        if (document.getElementById("Centi").checked) {
            operator = document.getElementById("Centi").value;
        }
        if (document.getElementById("Base").checked) {
            operator = document.getElementById("Base").value;
        }
        if (document.getElementById("Kilo").checked) {
            operator = document.getElementById("Kilo").value;
        }
        if (document.getElementById("Inch").checked) {
            operator = document.getElementById("Inch").value;
        }
        if (document.getElementById("Feet").checked) {
            operator = document.getElementById("Feet").value;
        }
        if (document.getElementById("Yard").checked) {
            operator = document.getElementById("Yard").value;
        }
        if (document.getElementById("Mile").checked) {
            operator = document.getElementById("Mile").value;
        }
        

        let operator2;
        if (document.getElementById("toCenti").checked) {
            operator2 = document.getElementById("toCenti").value;
        }
        if (document.getElementById("toBase").checked) {
            operator2 = document.getElementById("toBase").value;
        }
        if (document.getElementById("toKilo").checked) {
            operator2 = document.getElementById("toKilo").value;
        }
        if (document.getElementById("toInch").checked) {
            operator2 = document.getElementById("toInch").value;
        }
        if (document.getElementById("toFeet").checked) {
            operator2 = document.getElementById("toFeet").value;
        }
        if (document.getElementById("toYard").checked) {
            operator2 = document.getElementById("toYard").value;
        }
        if (document.getElementById("toMile").checked) {
            operator2 = document.getElementById("toMile").value;
        }
        CalculateResult(operand1, operator, operator2);
    }
}

async function CalculateResult(operand1, operator, operator2) {
    "use strict;"
        
        // URL and method used with AJAX Call
        let myURL = "https://brucebauer.info/assets/ITEC3650/unitsconversion.php";

        /* AJAX calculator requires Operand1, Operator, and Operand2 */
        myURL = myURL + "?FromValue=" + encodeURIComponent(operand1) + "&FromUnit=" + encodeURIComponent(operator) + "&ToUnit=" + encodeURIComponent(operator2);


        
        /* fetch the results */
        let myCalcObject = await fetch(myURL);
        let myResult = await myCalcObject.text();
        
        
        document.getElementById("Result").innerHTML = myResult+" "+operator2;


}

function clearform() {
    "use strict";
    
    /* Set all of the form values to blank or false */
    document.getElementById("Operand1").value = "";
    document.getElementById("Operand1Msg").innerHTML = "";
    document.getElementById("AddOperator").checked = false;
    document.getElementById("SubtractOperator").checked = false;
    document.getElementById("MultiplyOperator").checked = false;
    document.getElementById("DivideOperator").checked = false;
    document.getElementById("OperatorMsg").innerHTML = "";
    document.getElementById("Operand2").value = "";
    document.getElementById("Operand2Msg").innerHTML = "";
    document.getElementById("Result").innerHTML = "";
}

$( "#myform" ).validate({

});