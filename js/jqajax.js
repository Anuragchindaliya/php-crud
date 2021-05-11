$(document).ready(function () {

    // ajax request for retrieving data from database
    function showdata() {
        output = "";
        $.ajax({
            url: "retrieve.php",
            method: "get",
            dataType: "json",
            success: function (data) {
                if (data) {
                    x = data;
                } else {
                    x = "";
                }
                for (i = 0; i < x.length; i++) {
                    output += `<tr><td>${x[i].id}</td><td>${x[i].name}</td><td>${x[i].email}</td><td>${x[i].password}</td>
                    <td><button type="button" class="btn btn-warning btn-edit" data-sid="${x[i].id}">Edit</button><button type="button" class="btn btn-danger btn-del ms-2" data-sid="${x[i].id}">Delete</button>
                    </td></tr>`;

                }
                $("#tbody").html(output);
            }

        })
    };
    showdata();

    // Ajax Request for insert data
    $("#addbtn").click(function (e) {
        e.preventDefault();
        let stid = $("#stuid").val();
        let nm = $("#stuname").val();
        let em = $("#stuemail").val();
        let pw = $("#stupass").val();

        // creating a object
        mydata = {
            id: stid,
            name: nm,
            email: em,
            password: pw
        };

        $.ajax({
            url: "insert.php",
            method: "POST",
            data: JSON.stringify(mydata),
            success: function (data) {
                console.log(data);
                msg = `<div class="alert alert-dark mt-3">${data}</div>`;
                $("#msg").html(msg);
                $("#myform")[0].reset();
                showdata();
                // $("#stuid").val("");
                // setTimeout(function(){$("#msg").slideUp();});
                // setInterval(() => {
                //     $("#msg").slideUp();
                // }, 3000);
                $("#stuid").removeAttr("value");

            }
        });
    });

    // ajax Request for Deleting data
    $("#tbody").on("click", ".btn-del", function () {
        console.log("button clicked");
        let id = $(this).attr("data-sid");
        // console.log(id);
        mydata = {
            sid: id
        };
        mythis = this;
        $.ajax({
            url: "delete.php",
            method: "post",
            data: JSON.stringify(mydata),
            success: function (data) {
                console.log(data);

                //    or you can use 0 and 1
                if (data == true) {
                    msg = `<div class="alert alert-dark mt-3">Student Delete successfully</div>`;
                    $(mythis).closest("tr").fadeOut();
                } else if (data == false) {
                    msg = `<div class="alert alert-dark mt-3">Unable to delte</div>`;
                } else {
                    msg = `<div class="alert alert-dark mt-3">${data}</div>`;
                }
                $("#msg").html(msg);
                // showdata();
            }
        })
    });



    // ajax Request for editing data
    $("#tbody").on("click", ".btn-edit", function () {
        console.log("eit button clicked")
        let id = $(this).attr("data-sid");
        mydata = {
            sid: id
        }
        $.ajax({
            url: "edit.php",
            method: "post",
            dataType: "json",
            data: JSON.stringify(mydata),
            success: function (data) {
                console.log(data);
                $("#stuid").val(data.id);
                $("#stuname").val(data.name);
                $("#stuemail").val(data.email);
                $("#stupass").val(data.password);
            }
        })
    });



});