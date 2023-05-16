let dataArr = [];

fetch("/view-data", {
    method: 'POST'
})
.then(res => (res).json())
.then(data => {
    console.log("This is the data: " + data);

    if (data.trim() != ""){
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

function deleteData(){
    let deletionTextbox = document.getElementById('deleteText')
    let deletionIndex = deletionTextbox.value.trim(); 

    if (deletionIndex-1 < 0 || deletionIndex-1 >= dataArr.length || isNaN(deletionIndex) || deletionIndex == ""){
        console.log("Invalid Index");
        document.getElementById('invalidIndex').innerHTML = "Invalid Index";
    } else {
        console.log("Delete this: " + dataArr[deletionIndex]);
        document.getElementById('invalidIndex').innerHTML = "";
        deletionTextbox.value = "";

        fetch(`/view-data/?target=${dataArr[deletionIndex-1]}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                console.log("Deleted successfully");
            } else {
                console.error("Failed to delete value");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
        location.reload();
    }
}


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('deleteData').addEventListener('click', deleteData);
})