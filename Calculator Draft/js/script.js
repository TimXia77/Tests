
/*
TODO:
- inelegant implementaion - change after rest api is confirmed and WET works
- divide code into 1-2 other files
*/


let history = []

function add() {

    let operand1 = Number(document.getElementById("operandField1").value)
    let operand2 = Number(document.getElementById("operandField2").value)
    let answer = Math.round((operand1 + operand2) * 100) / 100

    updateHtml(answer)
}

function subtract() {

    let operand1 = Number(document.getElementById("operandField1").value)
    let operand2 = Number(document.getElementById("operandField2").value)
    let answer = Math.round((operand1 - operand2) * 100) / 100

    updateHtml(answer)
}

function multiply() {

    let operand1 = Number(document.getElementById("operandField1").value)
    let operand2 = Number(document.getElementById("operandField2").value)
    let answer = Math.round((operand1 * operand2) * 100) / 100
    
    updateHtml(answer)
}

function divide() {
    let operand1 = Number(document.getElementById("operandField1").value)
    let operand2 = Number(document.getElementById("operandField2").value)
    let answer = Math.round((operand1 / operand2) * 100) / 100

    updateHtml(answer)
}

function updateHtml(answer) {
    document.getElementById("answer-area").innerHTML = "Answer: " + answer
    document.getElementById("operandField1").value = answer
    document.getElementById("operandField2").value = ""

    history.push(answer)
    if (history.length > 10) history.shift() //The history can only hold max. 10 elements
    document.getElementById("history-area").innerHTML = "History: " + history;
}

document.addEventListener('DOMContentLoaded', function() {
    //operations
    document.getElementById('add_button').addEventListener('click', add)    
    document.getElementById('subtract_button').addEventListener('click', subtract)    
    document.getElementById('multiply_button').addEventListener('click', multiply)    
    document.getElementById('divide_button').addEventListener('click', divide)    
})
