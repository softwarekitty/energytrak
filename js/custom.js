window.onload = function () {
    months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
    seed = [9,5,12,4,8,2,1,5,6,7,11,10];
    ordered_months = order_months(Date.today().getMonth());
    data_hb1 = [[9,5,12,4,8,2,1,5,6,7,11,10],[7,4,6,5,10,3,4,4,8,9,10,11],[9,5,9,4,8,2,1,5,6,7,11,10]];
    data_cb1 = [[9,5,12,4,8,2,1,5,6,7,11,10],[9,5,12,4,8,2,1,5,6,7,11,10],[9,5,10,4,8,2,1,5,6,7,11,10]];
    data_eb1 = [[9,5,12,4,8,2,1,5,6,7,11,10],[9,5,12,4,8,2,1,5,6,7,11,10],[9,5,12,4,8,2,1,5,6,7,11,10]];
    
    data_hb2 = [[9,5,8,4,8,2,1,5,6,7,11,10],[9,5,12,4,8,2,1,5,6,7,11,10],[9,5,12,4,8,2,1,5,6,7,11,10]];
    data_cb2 = [[9,5,12,4,8,9,1,5,6,7,11,10],[9,5,12,4,8,2,1,5,6,3,11,10],[9,5,12,4,8,2,1,5,6,7,11,10]];
    data_eb2 = [[9,5,12,4,8,2,9,5,6,7,11,10],[9,5,12,4,8,2,1,5,6,7,11,10],[9,5,12,4,8,2,1,5,6,7,11,10]];
    
    var r_hb1 = Raphael("heating_chart_b1");
    var r_cb1 = Raphael("cooling_chart_b1");
    var r_eb1 = Raphael("electricity_chart_b1");
    
    var r_hb2 = Raphael("heating_chart_b2");
    var r_cb2 = Raphael("cooling_chart_b2");
    var r_eb2 = Raphael("electricity_chart_b2");
    
    //here is a hack to get the labels to actually display
    //only the active tab gets labels written to it...so let's activate them
    //and then make their charts.
    
    //notice we had a make_bar_chart function, but while debugging, we got here and now
    //because this is a prototype, I'm not going to clean it up.
    var barChart_hb1 = r_hb1.barchart(10,10, 700,300, data_hb1).label(ordered_months);
    $("#heating_b1").toggleClass("active");
    $("#heating_b1_tab").toggleClass("active");
    $("#cooling_b1").toggleClass("active");
    $("#cooling_b1_tab").toggleClass("active");
     var barChart_cb1 = r_cb1.barchart(10,10, 700,300, data_cb1).label(ordered_months);
    $("#cooling_b1").toggleClass("active");
    $("#cooling_b1_tab").toggleClass("active");
    $("#electricity_b1").toggleClass("active");
    $("#electricity_b1_tab").toggleClass("active");
    var barChart_eb1 = r_eb1.barchart(10,10, 700,300, data_eb1).label(ordered_months);
    $("#electricity_b1").toggleClass("active");
    $("#electricity_b1_tab").toggleClass("active");
    $("#heating_b1").toggleClass("active");
    $("#heating_b1_tab").toggleClass("active");
    
    //change main tab to b2
    $("#control_tab1").toggleClass("active");
    $("#b1").toggleClass("active");
    $("#control_tab2").toggleClass("active");
    $("#b2").toggleClass("active");
    
    
    var barChart_hb2 = r_hb2.barchart(10,10, 700,300, data_hb2).label(ordered_months);
    $("#heating_b2").toggleClass("active");
    $("#heating_b2_tab").toggleClass("active");
    $("#cooling_b2").toggleClass("active");
    $("#cooling_b2_tab").toggleClass("active");
    var barChart_cb2 = r_cb2.barchart(10,10, 700,300, data_cb2).label(ordered_months);
    $("#cooling_b2").toggleClass("active");
    $("#cooling_b2_tab").toggleClass("active");
    $("#electricity_b2").toggleClass("active");
    $("#electricity_b2_tab").toggleClass("active");
    var barChart_eb2 = r_eb2.barchart(10,10, 700,300, data_eb2).label(ordered_months);
    $("#electricity_b2").toggleClass("active");
    $("#electricity_b2_tab").toggleClass("active");
    $("#heating_b2").toggleClass("active");
    $("#heating_b2_tab").toggleClass("active");
    
    //change back
    $("#control_tab1").toggleClass("active");
    $("#b1").toggleClass("active");
    $("#control_tab2").toggleClass("active");
    $("#b2").toggleClass("active");

    $("svg").attr('width',700);
    $("svg").attr('height',400);
};

// function make_bar_chart(chart_id,data,labels){
//   var r = Raphael(chart_id);
//   var barChart = r.barchart(10,10, 700,300, data, 1, {stacked: true, type: "soft"}).label(labels);	  
// }

function order_months(now_index){
    var from_now = [12];
    for(var i=now_index;i<now_index+12;i++){
        from_now[i-now_index]=months[i%12];
    }
    return from_now;
}

function tweak(arr){
    tweaked = [12];
    for(var x =0;x<12;x++){
        tweaked = arr[x]+Math.floor(Math.random() * 6);
    }
    return tweaked;
}

$('#select_building_div .btn-group .dropdown-menu li a').click(function() {
    //change all button texts
    var bldg = $(this).text();
    $('#select_building_div .btn-group button').text(bldg);
    $('#select_floor_div .btn-group button').text("Select Floor");
    $('#select_room_div .btn-group button').text("Select Room");

    //set disabled status
    $('#select_floor_div .btn-group button').removeClass("disabled");
    $('#select_room_div .btn-group button').addClass("disabled");
    $('#exemption_pdf_div .btn-group button').addClass("disabled");
    
    //change floors available
    if(bldg==="Building 1"){
        $("#select_floor_menu").empty();
        $("#select_floor_menu").append('<li><a href="#">floor 1</a></li>');
        $("#select_floor_menu").append('<li><a href="#">floor 2</a></li>');
    }else{
        $("#select_floor_menu").empty();
        $("#select_floor_menu").append('<li><a href="#">floor 0</a></li>');
        $("#select_floor_menu").append('<li><a href="#">floor 1</a></li>');
        $("#select_floor_menu").append('<li><a href="#">floor 2</a></li>');
        $("#select_floor_menu").append('<li><a href="#">floor 3</a></li>');
    }
    
    //reset colors
    $('#select_floor_div').removeClass("grey1");
    $('#select_room_div').removeClass("grey2").addClass("grey1");
    $('#exemption_pdf_div').removeClass("grey3 grey1").addClass("grey2");
});

$('#select_floor_div .btn-group .dropdown-menu').on('click','li a',function(){

    //change all button texts
    var floor = $(this).text();
    $('#select_floor_div .btn-group button').text(floor);
    $('#select_room_div .btn-group button').text("Select Room");
    
    //set disabled status
    $('#select_room_div .btn-group button').removeClass("disabled");
    $('#exemption_pdf_div .btn-group button').addClass("disabled");
    
    var bldg = $('#select_building_div .btn-group button').text();
    
    //change rooms available
    if(bldg==="Building 1"){
        if(floor === "floor 1"){
        $("#select_room_menu").empty();
        $("#select_room_menu").append('<li><a href="#">room 1034</a></li>');
        $("#select_room_menu").append('<li><a href="#">room 1035</a></li>');
        }else{
        $("#select_room_menu").empty();
        $("#select_room_menu").append('<li><a href="#">room 2001</a></li>');
        $("#select_room_menu").append('<li><a href="#">room 2203</a></li>');
        $("#select_room_menu").append('<li><a href="#">room 2005</a></li>');
        }
    }else{
        if(floor === "floor 0"){
        $("#select_room_menu").empty();
        $("#select_room_menu").append('<li><a href="#">room 0012</a></li>');
        $("#select_room_menu").append('<li><a href="#">room 0094</a></li>');
        $("#select_room_menu").append('<li><a href="#">room 0078</a></li>');
        }else if(floor === "floor 1"){
        $("#select_room_menu").empty();
        $("#select_room_menu").append('<li><a href="#">room 1002</a></li>');
        $("#select_room_menu").append('<li><a href="#">room 1010</a></li>');
        $("#select_room_menu").append('<li><a href="#">room 1015</a></li>');
        $("#select_room_menu").append('<li><a href="#">room 1052</a></li>');
        $("#select_room_menu").append('<li><a href="#">room 1090</a></li>');
        $("#select_room_menu").append('<li><a href="#">room 1111</a></li>');
        }else if(floor === "floor 2"){
        $("#select_room_menu").empty();
        $("#select_room_menu").append('<li><a href="#">room 2853</a></li>');
        $("#select_room_menu").append('<li><a href="#">room 2311</a></li>');
        $("#select_room_menu").append('<li><a href="#">room 2008</a></li>');
        $("#select_room_menu").append('<li><a href="#">room 2777</a></li>');
        }else{
        $("#select_room_menu").empty();
        $("#select_room_menu").append('<li><a href="#">room 3214</a></li>');
        $("#select_room_menu").append('<li><a href="#">room 3990</a></li>');
        $("#select_room_menu").append('<li><a href="#">room 3461</a></li>');
        $("#select_room_menu").append('<li><a href="#">room 3001</a></li>');
        }
    }
    
    //reset colors    
    $('#select_floor_div').removeClass("grey1");
    $('#select_room_div').removeClass("grey1 grey2");
    $('#exemption_pdf_div').removeClass("grey2 grey3").addClass("grey1");
});

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
