window.onload = function () {
    months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
    seed_heating = [10,14,18,17,13,10,6,3,2,4,6,8];
    seed_cooling = [1,1,2,3,5,11,15,18,17,12,3,1];
    seed_electricity = [7,6,6,6,5,4,5,6,6,6,7,8];
    ordered_months = order_months(Date.today().getMonth());
    data_hb1 = [tweak(seed_heating,9,5000),tweak(seed_heating,4,5000),tweak(seed_heating,10,5000)];
    data_cb1 = [tweak(seed_cooling,4,1000),tweak(seed_cooling,7,1000),tweak(seed_cooling,8,1000)];
    data_eb1 = [tweak(seed_electricity,4,5000),tweak(seed_electricity,5,5000),tweak(seed_electricity,2,5000)];
    
    data_hb2 = [tweak(seed_heating,5,4000),tweak(seed_heating,7,4000),tweak(seed_heating,5000)];
    data_cb2 = [tweak(seed_cooling,1,1000),tweak(seed_cooling,3,1000),tweak(seed_cooling,7,1000)];
    data_eb2 = [tweak(seed_electricity,15,4000),tweak(seed_electricity,9,4000),tweak(seed_electricity,12,4000)];
    
    var r_hb1 = Raphael("heating_chart_b1");
    var r_cb1 = Raphael("cooling_chart_b1");
    var r_eb1 = Raphael("electricity_chart_b1");
    
    var r_hb2 = Raphael("heating_chart_b2");
    var r_cb2 = Raphael("cooling_chart_b2");
    var r_eb2 = Raphael("electricity_chart_b2");
    
    
    //for hover-flags:
    fin_hb1 = function () {
        this.flag = r_hb1.popup(this.bar.x, this.bar.y, this.bar.value+" pounds of steam" || "0").insertBefore(this);
    };
    fin_cb1 = function () {
        this.flag = r_cb1.popup(this.bar.x, this.bar.y, this.bar.value+" ton-hours of chilled water" || "0").insertBefore(this);
    };
    fin_eb1 = function () {
        this.flag = r_eb1.popup(this.bar.x, this.bar.y, this.bar.value+" kilowatt-hours" || "0").insertBefore(this);
    };
    fin_hb2 = function () {
        this.flag = r_hb2.popup(this.bar.x, this.bar.y, this.bar.value+" pounds of steam" || "0").insertBefore(this);
    };
    fin_cb2 = function () {
        this.flag = r_cb2.popup(this.bar.x, this.bar.y, this.bar.value+" ton-hours of chilled water" || "0").insertBefore(this);
    };
    fin_eb2 = function () {
        this.flag = r_eb2.popup(this.bar.x, this.bar.y, this.bar.value+" kilowatt-hours" || "0").insertBefore(this);
    };
    
    fout = function () {
        this.flag.animate({opacity: 0}, 300, function () {this.remove();});
    };
    
    //here is a hack to get the labels to actually display
    //only the active tab gets labels written to it...so let's activate them
    //and then make their charts.
    
    //notice we had a make_bar_chart function, but while debugging, we got here and now
    //because this is a prototype, I'm not going to clean it up.
    var barChart_hb1 = r_hb1.barchart(10,10, 700,300, data_hb1).label(ordered_months).hover(fin_hb1,fout);
    $("#heating_b1").toggleClass("active");
    $("#heating_b1_tab").toggleClass("active");
    $("#cooling_b1").toggleClass("active");
    $("#cooling_b1_tab").toggleClass("active");
     var barChart_cb1 = r_cb1.barchart(10,10, 700,300, data_cb1).label(ordered_months).hover(fin_cb1,fout);
    $("#cooling_b1").toggleClass("active");
    $("#cooling_b1_tab").toggleClass("active");
    $("#electricity_b1").toggleClass("active");
    $("#electricity_b1_tab").toggleClass("active");
    var barChart_eb1 = r_eb1.barchart(10,10, 700,300, data_eb1).label(ordered_months).hover(fin_eb1,fout);
    $("#electricity_b1").toggleClass("active");
    $("#electricity_b1_tab").toggleClass("active");
    $("#heating_b1").toggleClass("active");
    $("#heating_b1_tab").toggleClass("active");
    
    //change main tab to b2
    $("#control_tab1").toggleClass("active");
    $("#b1").toggleClass("active");
    $("#control_tab2").toggleClass("active");
    $("#b2").toggleClass("active");
    
    
    var barChart_hb2 = r_hb2.barchart(10,10, 700,300, data_hb2).label(ordered_months).hover(fin_hb2,fout);
    $("#heating_b2").toggleClass("active");
    $("#heating_b2_tab").toggleClass("active");
    $("#cooling_b2").toggleClass("active");
    $("#cooling_b2_tab").toggleClass("active");
    var barChart_cb2 = r_cb2.barchart(10,10, 700,300, data_cb2).label(ordered_months).hover(fin_cb2,fout);
    $("#cooling_b2").toggleClass("active");
    $("#cooling_b2_tab").toggleClass("active");
    $("#electricity_b2").toggleClass("active");
    $("#electricity_b2_tab").toggleClass("active");
    var barChart_eb2 = r_eb2.barchart(10,10, 700,300, data_eb2).label(ordered_months).hover(fin_eb2,fout);
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

function tweak(arr,amount,mult){
    var cloned = arr.slice(0)
    for(var x =0;x<12;x++){
        cloned[x]= (arr[x]+Math.floor(Math.random() * amount))*mult;
    }
    return cloned;
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
