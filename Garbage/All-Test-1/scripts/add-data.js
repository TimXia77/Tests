
//Event Listeners

function addData(){
    let newValue = document.getElementById('newData').value.trim();

    if (newValue != ""){
        fetch(`/add-data/?new=${newValue}`, {
            method: 'POST',
        })
        .then(response => {
            if (response.ok) {
                console.log("Added successfully");
            } else {
                console.error("Failed to add value");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
        document.getElementById('newData').value = "";
    }
}


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addData').addEventListener('click', addData);
})