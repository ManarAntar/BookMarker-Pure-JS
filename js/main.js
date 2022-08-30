var siteNameInput = document.getElementById("siteNameInput");
var siteUrlInput = document.getElementById("siteUrlInput");
var addBtn = document.getElementById("addBtn");
var main;
var siteList = [];

if (localStorage.getItem("mySites") != null) {
    siteList = JSON.parse(localStorage.getItem('mySites'));
    display(siteList);

} else {
    var siteList = [];
}

addBtn.onclick = function () {
    if(nameValid() == true){
        if (addBtn.innerHTML == "Update") {
            var site1 = {
                name: siteNameInput.value,
                url: siteUrlInput.value
            }
            siteList.splice(main, 1, site1);
        } else {
            var site = {
                name: siteNameInput.value,
                url: siteUrlInput.value
            };
            siteList.push(site);
        }
    
        localStorage.setItem('mySites', JSON.stringify(siteList));
        display(siteList);
        clearForm();
    }else {
        alert("Book Name is invalid");
    }
   
}

function clearForm() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
}

function display(list) {
    var contain = "";
    for (i = 0; i < list.length; i++) {
        contain += `
        <tr>
    <td>${list[i].name}</td>
    <td><button class="btn btn-warning"><a href="https://www.${list[i].url}.com" target="_blank"class="text-decoration-none text-white" >Visit</a></button></td>
    <td><button onclick="deleteSite(${i})" class="btn btn-danger">Delete</button></td>
    <td><button onclick="updateBook(${i})" class="btn btn-primary">Update</button></td>
</tr>`
    }
    document.getElementById("tableBody").innerHTML = contain;
}

function deleteSite(index) {
    siteList.splice(index, 1);
    localStorage.setItem('mySites', JSON.stringify(siteList));
    display(siteList);

}

function nameValid() {
    var regex = /^[A-Z][a-z]{3,9}$/;
    if (regex.test(siteNameInput.value) == true) {
        siteNameInput.classList.replace("is-invalid", "is-valid");
        return true;
    } else {
        siteNameInput.classList.add("is-invalid");
        return false;
    }
}
// function urlValid(){
//     var regex= /^[https://www.][a-z]{3,9}[.com]$/;
//     if(regex.test(siteUrlInput.value)==true){
//         siteUrlInput.classList.replace("is-invalid","is-valid")
//     }else{
//         siteUrlInput.classList.add("is-invalid");
//     }
// }
function search(searchItem) {
    var searchResult = [];
    for (i = 0; i < siteList.length; i++) {
        if (siteList[i].name.toLowerCase().includes(searchItem.toLowerCase())) {
            searchResult.push(siteList[i]);
        }
    }
    display(searchResult);
}

function updateBook(index) {
    siteNameInput.value = siteList[index].name;
    siteUrlInput.value = siteList[index].url;
    addBtn.innerHTML = "Update";
    main = index;
}