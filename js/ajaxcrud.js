// Ajax Request for Retrieving data from database
let tbody = document.getElementById("tbody");
showdata();

function showdata() {
    //after insertion it will prevent to append data to previous saved data(html) it will empty the table
    tbody.innerHTML = "";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "retrieve.php", true);
    xhr.responseType = "json";
    xhr.setRequestHeader("Conten-Type", "application/json");
    xhr.onload = () => {
        if (xhr.status === 200) {
            // console.log(xhr.response);
            if (xhr.response) {
                x = xhr.response;
            } else {
                x = "";
            }
            if (x.length > 0) {
                for (i = 0; i < x.length; i++) {
                    tbody.innerHTML += `<tr><td>${x[i].id}</td><td>${x[i].name}</td><td>${x[i].email}</td><td>${x[i].password}</td>
                <td><button type="button" class="btn btn-warning btn-edit" data-sid="${x[i].id}">Edit</button><button type="button" class="btn btn-danger btn-del ms-2" data-sid="${x[i].id}">Delete</button>
                </td></tr>`;
                }
            }

        } else {
            console.log("problem to show");
        }
        // execute this function for fetching the length of total btn
        stu_delete();
        stu_edit();
    }
    xhr.send();
}




// AJAX Request FOR INSERT data or UPDATE DATA id there is not id
document.getElementById("addbtn").addEventListener("click", add_student);

function add_student(e) {
    e.preventDefault();
    console.log("add button clicked");
    let sid = document.getElementById('stuid').value;
    let namep = document.getElementById('stuname').value;
    let emailp = document.getElementById('stuemail').value;
    let passwordp = document.getElementById('stupass').value;
    // console.log(name);
    // console.log(email);
    // console.log(password);

    // CREATING XHR Object
    const xhr = new XMLHttpRequest();
    //intialize 
    xhr.open("POST", "insert.php", true);

    // set request Headers
    xhr.setRequestHeader("content-Type", "application/json");

    //handle response
    xhr.onload = () => {
        if (xhr.status == 200) {
            // response handling code
            console.log(xhr.responseText);
            document.getElementById("msg").innerHTML = `<div class="alert alert-dark mt-2" role="alert">${xhr.responseText}</div>`;
            document.getElementById("myform").reset();
            //after inserting data to show in student detail table
            showdata();

        } else {
            console.log("not okay");
        }

    }
    // JAVASCRIPT Object
    const mydata = {
        id:sid,
        name: namep,
        email: emailp,
        password: passwordp
    };

    // convert JSON Object to JSON string
    const data = JSON.stringify(mydata);
    console.log(data);

    // send request with data
    xhr.send(data);
}



// Ajax call for Edit Records
function stu_edit() {
    var btn = document.getElementsByClassName("btn-edit");
    let sid = document.getElementById('stuid');
    let namep = document.getElementById('stuname');
    let emailp = document.getElementById('stuemail');
    let passwordp = document.getElementById('stupass');
    // console.log(btn);
    // console.log(lbtn.length);

    for (let i = 0; i < btn.length; i++) {
        // console.log(btn[i].getAttribute("data-sid"));
        btn[i].addEventListener("click", function (e) {

            let id = btn[i].getAttribute("data-sid");

            const xhr = new XMLHttpRequest();
            xhr.open("POST", "edit.php", true);
            xhr.responseType = "json";
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = () => {
                if (xhr.status === 200) {
                    console.log(xhr.response);
                    Svalue = xhr.response;

                    sid.value=Svalue.id;
                    namep.value=Svalue.name;
                    emailp.value=Svalue.email;
                    passwordp.value=Svalue.password;
                } else {
                    console.log("problem in Edit");
                }

            };

            // JAVASCRIPT Object
            const mydata = {
                sid: id
            };

            // convert JSON Object to JSON string
            const data = JSON.stringify(mydata);
            // send request with data
            xhr.send(data);
            e.preventDefault();
            return false;
        });
    }
}





// Ajax call for Delete Records
function stu_delete() {
    var btn = document.getElementsByClassName("btn-del");
    // console.log(btn);
    // console.log(btn.length);

    if (btn.length > 0) {
        for (let i = 0; i < btn.length; i++) {
            // console.log(btn[i].getAttribute("data-sid"));
            btn[i].addEventListener("click", function (e) {

                let id = btn[i].getAttribute("data-sid");

                const xhr = new XMLHttpRequest();
                xhr.open("POST", "delete.php", true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        console.log(xhr.response);
                        // document.getElementById();
                        document.getElementById("msg").innerHTML = `<div class="alert alert-dark mt-2" role="alert">${xhr.responseText}</div>`;
                        showdata();
                    } else {
                        console.log("problem in delete");
                    }

                };

                // JAVASCRIPT Object
                const mydata = {
                    sid: id
                };

                // convert JSON Object to JSON string
                const data = JSON.stringify(mydata);
                // send request with data
                xhr.send(data);
                e.preventDefault();
                return false;
            });
        }
    }
}

