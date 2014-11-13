window.onload = function () {
    make_bar_chart("holder");
};

function make_bar_chart(chart_id){
  var r = Raphael(chart_id),
          data1 = [[55, 20, 13, 32, 5, 1, 2, 10], [10, 2, 1, 5, 32, 13, 20, 55], [12, 20, 30]],
          data2 = [[55, 20, 13, 32, 5, 1, 2, 10], [10, 2, 1, 5, 32, 13, 20, 55], [12, 20, 30]],
          data3 = [[55, 20, 13, 32, 5, 1, 2, 10], [10, 2, 1, 5, 32, 13, 20, 55], [12, 20, 30]],
          txtattr = { font: "12px 'Fontin Sans', Fontin-Sans, sans-serif" };

//  r.text(160, 10, "Single Series Chart").attr(txtattr);
//          r.text(480, 10, "Multiline Series Chart").attr(txtattr);
//          r.text(160, 250, "Multiple Series Stacked Chart").attr(txtattr);
//          r.text(480, 250, 'Multiline Series Stacked Vertical Chart. Type "round"').attr(txtattr);
//  var labels = ["Company X", "Company Y", "Company Z"]
  var barChart = r.barchart(10, 10, 300, 220, [[9,5,12]], 0, {stacked: true, type: "soft"}).label([['label1','label2']], true);	  

barChart.addlabels = function () {

this.bars

console.log(this.bars);		

};
barChart.addlabels();
// r.barchart(10, 10, 300, 220, [[55, 20, 13, 32, 5, 1, 2, 10]], 0, {type: "sharp"}).label([['C', 'D', 'E', 'G', 'L', 'M', 'P', 'S1']]);
// barChart.label(['a','b','c']);
//           r.barchart(330, 10, 300, 220, data1);
//           r.barchart(10, 250, 300, 220, data2, {stacked: true});
//           r.barchart(330, 250, 300, 220, data3, {stacked: true, type: "round"});
}