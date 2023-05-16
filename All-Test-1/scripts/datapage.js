let dataArr = [];

fetch("/view-data", {
    method: 'POST'
})
.then(res => (res).json())
.then(data => {
    console.log("This is the data: " + data);

    //process the data to arr:
    dataArr = (data.trim()).split(" ");

    let dataTable = document.getElementById("dataTable");

    //Set table values
    for (let i = 0; i < dataArr.length; ++i){
        let row = dataTable.insertRow(i);

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = i+1;
        cell2.innerHTML = dataArr[i];
    }

    let row = dataTable.insertRow(0);

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = "<h4>ID:</h4>";
    cell2.innerHTML = "<h4>Data:</h4>";

})
.catch(error => {
    console.log("ERROR: " + error);
})


console.log(dataArr[3-1]);