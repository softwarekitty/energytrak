window.onload = function () {
    //alert("custom_admin loaded");
};

$('#select_room_div .btn-group .dropdown-menu').on('click','li a',function(){

    //change this button text
    $('#select_room_div .btn-group button').text($(this).text());
    
    //set disabled status
    $('#exemption_pdf_div button').removeClass("disabled");
    
    var bldg = $('#select_building_div .btn-group button').text();
    
    //reset colors    
    $('#select_floor_div').removeClass("grey1");
    $('#select_room_div').removeClass("grey1 grey2");
    $('#exemption_pdf_div').removeClass("grey2 grey3 grey1");
});
