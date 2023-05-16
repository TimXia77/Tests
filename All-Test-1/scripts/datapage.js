// fetch('/view-data', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userRequestObj),
// })
// .then((response) => response.json())
// .then((userRequestObj) => {
//     //process the data here
//     console.log(userRequestObj);
//     console.log(JSON.stringify(userRequestObj));
//     console.log("hi");
// })
// .catch((error) => {
//     console.error('Error:', error);
// })

fetch("/view-data", {
    method: 'POST'
})
.then(res => (res).json())
.then(data => {
    console.log("This is the data: " + data);

    // Find a <table> element with id="myTable":
    var table = document.getElementById("dataTable");

    // Create an empty <tr> element and add it to the 1st position of the table:
    var row = table.insertRow(1);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    // Add some text to the new cells:
    cell1.innerHTML = "NEW CELL1";
    cell2.innerHTML = "NEW CELL2";
    console.log("hi");

})
.catch(error => {
    console.log("ERROR: " + error);
})

