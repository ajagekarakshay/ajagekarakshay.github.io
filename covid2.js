var start_date = new Date(2020, 2, 20); // March 22
var today = new Date()

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");


// Set range
slider.max = Math.floor((today.getTime() - start_date.getTime())/86400000);

am4core.useTheme(am4themes_animated);
    // Create map instance
    var chart = am4core.create("chartdiv", am4maps.MapChart);
    
    // Set map definition
    chart.geodata = am4geodata_region_usa_nyLow;
    
    // Set projection
    chart.projection = new am4maps.projections.Miller();
    
    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    
    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;
    
    // Configure series
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#999");
    
    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#EC7063");
    
      
    //Set min/max fill color for each area
    polygonSeries.heatRules.push({
        "property": "fill",
        "target": polygonSeries.mapPolygons.template,
        "min": am4core.color("#F1948A"),
        "max": am4core.color("#78281F")
      });

      Papa.parse("https://cors-anywhere.herokuapp.com/http://akshayajagekar.com/covid_data.csv", {
        header: true,
        download:true,
        complete: function(results) {
    
    
    
    
    var current_date = new Date(start_date.getTime() + slider.value*86400000);
    var current_index = current_date.getMonth()+1 + "/" + current_date.getDate() + "/" + current_date.getFullYear();
    output.innerHTML = current_date.toDateString().substring(4);
    
    // Set data from CSV file
    var data = [];
    for (var i=0; i<62;i++){
        data.push({id:results.data[i]["id"], value: results.data[i][current_index]})
    }
    
    polygonSeries.data = data
    
    // legend
    var heatLegend = chart.createChild(am4maps.HeatLegend);
    heatLegend.series = polygonSeries;
    heatLegend.width = am4core.percent(100);
        
    polygonSeries.mapPolygons.template.events.on("over", function(ev) {
        if (!isNaN(ev.target.dataItem.value)) {
          heatLegend.valueAxis.showTooltipAt(ev.target.dataItem.value)
        }
        else {
          heatLegend.valueAxis.hideTooltip();
        }
      });
      
      polygonSeries.mapPolygons.template.events.on("out", function(ev) {
        heatLegend.valueAxis.hideTooltip();
      });
    }
  });

      
slider.oninput = function() {
    output.innerHTML = this.value;

    Papa.parse("https://cors-anywhere.herokuapp.com/http://akshayajagekar.com/covid_data.csv", {
        header: true,
        download:true,
        complete: function(results) {
    
    
    
    
    var current_date = new Date(start_date.getTime() + slider.value*86400000);
    var current_index = current_date.getMonth()+1 + "/" + current_date.getDate() + "/" + current_date.getFullYear();
    output.innerHTML = current_date.toDateString().substring(4);
    
    // Set data from CSV file
    var data = [];
    for (var i=0; i<62;i++){
        data.push({id:results.data[i]["id"], value: results.data[i][current_index]})
    }
    
    polygonSeries.data = data
    
    // legend
    var heatLegend = chart.createChild(am4maps.HeatLegend);
    heatLegend.series = polygonSeries;
    heatLegend.width = am4core.percent(100);
        
    polygonSeries.mapPolygons.template.events.on("over", function(ev) {
        if (!isNaN(ev.target.dataItem.value)) {
          heatLegend.valueAxis.showTooltipAt(ev.target.dataItem.value)
        }
        else {
          heatLegend.valueAxis.hideTooltip();
        }
      });
      
      polygonSeries.mapPolygons.template.events.on("out", function(ev) {
        heatLegend.valueAxis.hideTooltip();
      });
    
    
        
    }
    });
}


function printDate(){
  var print_current = current_date.toDateString().substring(4);
  document.getElementById("currentDate").innerHTML = print_current;
}