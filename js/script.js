$(document).ready(function() {
    
    // display select brands
    $("#search").keyup(function() {
        var search = $(this).val();
        
        $.ajax({
            url: "search.php",
            data: {search: search},
            type: "POST",
            success: function(resultData) {
                $("#result").html(resultData);
            }
        });
    });

    // display all cars
    function updateCars() {
        $.ajax({
            url: "displayCars.php",
            type: "POST",
            success: function(resultCars) {
                $("#show-cars").html(resultCars);
            }
        });
    }

    setInterval(
        function() {
            updateCars();
    }, 1000);

    // add new cars
    $("#add-car-form").on("submit", function(evt) {
        evt.preventDefault();
        
        var postData = $(this).serialize();
        var myUrl = $(this).attr("action");

        // $.post is a short hand for sending AJAX request of method POST
        $.post(myUrl, postData, function(phpTableData) {
            $("#car-result").html(phpTableData);
            $("#add-car-form")[0].reset();
        })
    });
});