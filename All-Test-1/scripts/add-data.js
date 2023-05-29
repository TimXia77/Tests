
//Event Listeners

function addData(){
    let newValue = document.getElementById('newData').value.trim()
    let reqObj = {addedValue: newValue};

    if (newValue != ""){
        fetch(`/add-data`, { //use body here instead
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqObj)
        })
        .then(response => {
            if (response.ok) {
                console.log("Added successfully");
                document.getElementById('addStatus').innerHTML = "Added: " + newValue;
            } else {
                console.error("Failed to add value");
                document.getElementById('addStatus').innerHTML = "Could not add value";
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
        document.getElementById('newData').value = "";
    } else {
        document.getElementById('addStatus').innerHTML = "Please enter a value";
    }
}


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addData').addEventListener('click', addData);
})