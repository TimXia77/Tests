$(document).ready(function () {
    $('#dataTable').DataTable({
        ajax: 'data/arrays.txt',
    });
});


// let dataTable = document.getElementById("dataTable");
// let row = dataTable.insertRow(1);

// let cell1 = row.insertCell(0);
// let cell2 = row.insertCell(1);
// cell1.innerHTML = 'abc';
// cell2.innerHTML = '123';