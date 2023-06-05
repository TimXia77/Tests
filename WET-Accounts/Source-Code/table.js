$(document).ready(function () {
    $('#dataTable').DataTable({
        ajax: 'data/arrays.txt',
    });
});

let select = document.getElementById("select");
let option = document.createElement("option");
option.text = "six";
select.add(option);


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit').addEventListener('click', submitData);
})

function submitData(){ //For testing, prints out the current selected value of the select element.
    let selectElement = document.getElementById("select").value;
    console.log(selectElement);
}