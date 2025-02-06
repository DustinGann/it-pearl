function calculate() {
    "use strict";
    /* Make sure that the form is valid */
    if ($( "#myform" ).valid()) {
        
        /* get the operands from the form */
        let operand1 = document.getElementById("Operand1").value;
        let operand2 = document.getElementById("Operand2").value;
        
        
        /* convert the operands from string to floating point */
        let operand1fp = parseFloat (operand1);
        let operand2fp = parseFloat (operand2);
        
        
        /* figure out which operator was checked and place the value in operator */
        let operator;
        if (document.getElementById("MinOperator").checked) {
            operator = document.getElementById("MinOperator").value;
        }
        if (document.getElementById("MaxOperator").checked) {
            operator = document.getElementById("MaxOperator").value;
        }
        if (document.getElementById("AvgOperator").checked) {
            operator = document.getElementById("AvgOperator").value;
        }

        if (document.getElementById("DivOperator").checked) {
            operator = document.getElementById("DivOperator").value;
        }

        let result;
        
        /* if the operator was "Min" then set result to the minimum */
        if (operator == "Add") {
            result = (operand1fp + operand2fp ) ;
        }
 
        /* if the operator was "Max" then set result to the maximum */
        if (operator == "Sub") {
            result = (operand1fp - operand2fp ) ;
        }

        /* if operator was "Avg" the calcualute the average of 3 operands */
        if (operator == "Mult") {
            result = (operand1fp * operand2fp ) ;
        }

        /* if operator was "Avg" the calcualute the average of 3 operands */
        if (operator == "Div") {
        result = (operand1fp / operand2fp ) ;
        }


        
        /* convert the result to a string and display it */
        document.getElementById("Result").innerHTML = result.toString();
    }
}

function clearform() {
    
    /* Set all of the form values to blank or false */
    document.getElementById("Operand1").value = "";
    document.getElementById("Operand2").value = "";
    document.getElementById("Operand1Error").innerHTML = "";
    document.getElementById("Operand2Error").innerHTML = "";
    document.getElementById("MinOperator").checked = false;
    document.getElementById("MaxOperator").checked = false;
    document.getElementById("AvgOperator").checked = false;
    document.getElementById("DivOperator").checked = false;
    document.getElementById("OperatorError").innerHTML = "";
    document.getElementById("Result").innerHTML = "";
}

/* Form Validation */
$( "#myform" ).validate({
 
});