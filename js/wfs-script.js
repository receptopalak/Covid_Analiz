var a = [];
var iller = [];
var asisayisi = [];
var features_covid = [];

var map3 = L.map('map3').setView([38.9477, 34.5547], 5);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map3);

$.getJSON("http://netigmademo.netcad.com.tr/geoserver/turkey/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=turkey%3Aillere_gore_asi_sayisi_table&outputFormat=application%2Fjson", function (data) {

    var b = data;    

    


  



    var info = L.control();

    info.onAdd = function (map3) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    info.update = function (props) {
        this._div.innerHTML = '<h4>İl Bazında Aşılanma Sayısı</h4>' + (props ?
            '<b><h3 class="asilama_il">' + props.il + '</h3></b><br /><b>' + props.asi_sayisi.toLocaleString('tr', 'TR') + '</b> Adet Aşı Yapılmıştır.<br>1. Doz Uygulanan Kişi Sayısı <b>'
            + props.birinci_doz.toLocaleString('tr', 'TR') + ' </b>Kişidir.<br>2. Doz Uygulanan Kişi Sayısı <b>'
            + props.ikinci_doz.toLocaleString('tr', 'TR') + '</b> Kişidir.'
            : 'Lütfen Aşılanma Sayısını Öğrenmek İstediğiniz Şehrin Üzerine Geliniz.');
    };

    info.addTo(map3);

    info.deletePercent = function (param) {
        param.unbindTooltip();
    }

    /*
    info.addPercent = function(param,props){
    param.unbindTooltip();
    param.bindTooltip((props ?
        '<p>' + props.il + '</p>1. Doz %'
        + props.birinci_doz_yuzde.toLocaleString('tr','TR') + ' </b>.<br>2. Doz <b>%'  
        + props.ikinci_doz_yuzde.toLocaleString('tr','TR') + '</b>.'
        : 'Lütfen Aşılanma Sayısını Öğrenmek İstediğiniz Şehrin Üzerine Geliniz.'),
        {permanent: false, direction:"center"}
       ).openTooltip()
       param.bindTooltip((props ?
        '<p>' + props.il + '</p>1. Doz %'
        + props.birinci_doz_yuzde.toLocaleString('tr','TR') + ' </b>.<br>2. Doz <b>%'  
        + props.ikinci_doz_yuzde.toLocaleString('tr','TR') + '</b>.'
        : 'Lütfen Aşılanma Sayısını Öğrenmek İstediğiniz Şehrin Üzerine Geliniz.'),
        {permanent: true, direction:"center"}
       ).openTooltip()
       
    }
    */
    info.addPercent = function (param, props) {
        param.unbindTooltip();
        param.bindTooltip(`<div class="popupmap"><h4>${props.il}</h4><div>1. Doz Aşılanan (%${props.birinci_doz_yuzde})</div><div class="progress"><div class="progress-bar progress-bar-striped bg-success" style="width: ${props.birinci_doz_yuzde}%"></div></div><div>2. Doz Aşılanan (%${props.ikinci_doz_yuzde})</div><div class="progress"><div class="progress-bar progress-bar-striped bg-success" style="width: ${props.ikinci_doz_yuzde}%;height:auto;"></div></div></div>`,
            {
                permanent: false,
                direction: "center",
                opacity: 0.50,
                backgroundColor: 'black'
            }
        ).openTooltip()
        param.bindTooltip(`<div class="popupmap"><h4>${props.il}</h4><div>1. Doz Aşılanan (%${props.birinci_doz_yuzde})</div><div class="progress"><div class="progress-bar progress-bar-striped bg-success" style="width: ${props.birinci_doz_yuzde}%"></div></div><div>2. Doz Aşılanan (%${props.ikinci_doz_yuzde})</div><div class="progress"><div class="progress-bar progress-bar-striped bg-success" style="width: ${props.ikinci_doz_yuzde}%; height:auto;"></div></div></div>`,
            {
                permanent: true,
                direction: "center",
                opacity: 0.70,
                backgroundColor: 'black'
            }
        ).openTooltip()

    }



    /*
    info.addPercent = function(param,props){
   
       param.bindLabel((props ?
           '<p>' + props.il + '</p>1. Doz %'
           + props.birinci_doz_yuzde.toLocaleString('tr','TR') + ' </b>.<br>2. Doz <b>%'  
           + props.ikinci_doz_yuzde.toLocaleString('tr','TR') + '</b>.'
           : 'Lütfen Aşılanma Sayısını Öğrenmek İstediğiniz Şehrin Üzerine Geliniz.')
          ).addTo(map3)
          
          param.bindTooltip((props ?
           '<p>' + props.il + '</p>1. Doz %'
           + props.birinci_doz_yuzde.toLocaleString('tr','TR') + ' </b>.<br>2. Doz <b>%'  
           + props.ikinci_doz_yuzde.toLocaleString('tr','TR') + '</b>.'
           : 'Lütfen Aşılanma Sayısını Öğrenmek İstediğiniz Şehrin Üzerine Geliniz.'),
           {permanent: true, direction:"center"}
          ).openTooltip()
       
    }
    */
    // get color depending on population density value
    function getColor(d) {
        return d > 1000000 ? '#800026' :
            d > 500000 ? '#BD0026' :
                d > 200000 ? '#E31A1C' :
                    d > 100000 ? '#FC4E2A' :
                        d > 50000 ? '#FD8D3C' :
                            d > 20000 ? '#FEB24C' :
                                d > 10000 ? '#FED976' :
                                    '#FFEDA0';
    }

    function style(feature) {
        return {
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7,
            fillColor: getColor(feature.properties.asi_sayisi)
        };
    }

    function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }

        info.update(layer.feature.properties);
        info.deletePercent(layer);
        /*info.addPercent(layer,layer.feature.properties)  ;*/
    }

    var geojson;

    function resetHighlight(e) {

        geojson.resetStyle(e.target);
        info.update();
        /*info.deletePercent(e.target);*/
    }

    function zoomToFeature(e) {
        map3.fitBounds(e.target.getBounds());
        var layer = e.target;
        info.addPercent(layer, layer.feature.properties);

    }


    function onEachFeature(feature, layer) {

        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }

    geojson = L.geoJson(data, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map3);

    map3.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');


    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map3) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 10000, 20000, 50000, 100000, 200000, 500000, 1000000],
            labels = [],
            from, to;

        for (var i = 0; i < grades.length; i++) {
            from = grades[i];
            to = grades[i + 1];

            labels.push(
                '<i style="background:' + getColor(from + 1) + '"></i> ' +
                from + (to ? '&ndash;' + to : '+'));
        }

        div.innerHTML = labels.join('<br>');
        return div;
    };

    legend.addTo(map3);

    









});



var chart_birinci_doz_en_az = [];
var chart_birinci_doz_en_fazla = [];
var chart_ikinci_doz_en_az = [];
var chart_ikinci_doz_en_fazla = [];


$.getJSON("http://netigmademo.netcad.com.tr/geoserver/turkey/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=turkey%3Anufusa_oranla_en_az_asi&outputFormat=application%2Fjson", function (data) {

    var b = data;

    a.push(data)

    for (i = 0; i < b.features.length; i++) {



        var obj = new Object();
        obj.il = b.features[i].properties.il;
        obj.asi_oran = b.features[i].properties.birinci_doz_yuzde;
        var jsonString = JSON.stringify(obj);
        chart_birinci_doz_en_az.push(obj);
    }


    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_dataviz);
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart5 = am4core.create("chartdiv5", am4charts.XYChart3D);

        // Add data
        chart5.data = chart_birinci_doz_en_az;

        // Create axes
        let categoryAxis1 = chart5.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis1.dataFields.category = "il";
        categoryAxis1.renderer.labels.template.rotation = 270;
        categoryAxis1.renderer.labels.template.hideOversized = false;
        categoryAxis1.renderer.minGridDistance = 20;
        categoryAxis1.renderer.labels.template.horizontalCenter = "right";
        categoryAxis1.renderer.labels.template.verticalCenter = "middle";
        categoryAxis1.tooltip.label.rotation = 270;
        categoryAxis1.tooltip.label.horizontalCenter = "right";
        categoryAxis1.tooltip.label.verticalCenter = "middle";

        let valueAxis1 = chart5.yAxes.push(new am4charts.ValueAxis());
        valueAxis1.title.text = "Aşılama Oranı";
        valueAxis1.title.fontWeight = "bold";

        // Create series
        var series1 = chart5.series.push(new am4charts.ColumnSeries3D());
        series1.dataFields.valueY = "asi_oran";
        series1.dataFields.categoryX = "il";
        series1.name = "Visits";
        series1.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series1.columns.template.fillOpacity = .8;
        chart5.colors.list = [
            am4core.color("#1C0000"),
			am4core.color("#540000"),
			am4core.color("#920000"),
			am4core.color("#c70000"),
			am4core.color("#ff0000")
          ];

        var columnTemplate1 = series1.columns.template;
        columnTemplate1.strokeWidth = 2;
        columnTemplate1.strokeOpacity = 1;
        columnTemplate1.stroke = am4core.color("#FFFFFF");

        columnTemplate1.adapter.add("fill", function (fill, target) {
            return chart5.colors.getIndex(target.dataItem.index);
        })

        columnTemplate1.adapter.add("stroke", function (stroke, target) {
            return chart5.colors.getIndex(target.dataItem.index);
        })

        chart5.cursor = new am4charts.XYCursor();
        chart5.cursor.lineX.strokeOpacity = 0;
        chart5.cursor.lineY.strokeOpacity = 0;

    });


});

//// 2 

$.getJSON("http://netigmademo.netcad.com.tr/geoserver/turkey/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=turkey%3Anufusa_oranla_en_cok_asi&outputFormat=application%2Fjson", function (data) {

    var b = data;

    a.push(data)

    for (i = 0; i < b.features.length; i++) {



        var obj = new Object();
        obj.il = b.features[i].properties.il_adi;
        obj.asi_oran = b.features[i].properties.birinci_doz_yuzde;
        var jsonString = JSON.stringify(obj);
        chart_birinci_doz_en_fazla.push(obj);
    }


    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_kelly);
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart6 = am4core.create("chartdiv6", am4charts.XYChart3D);

        // Add data
        chart6.data = chart_birinci_doz_en_fazla;
        chart6.colors.list = [	  
		    am4core.color("#8cc54a"),	
			am4core.color("#5eab2e"),	
			am4core.color("#3f962c"),	
			am4core.color("#168523"),	
			am4core.color("#13761f")
			 ];
        // Create axes
        let categoryAxis2 = chart6.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis2.dataFields.category = "il";
        categoryAxis2.renderer.labels.template.rotation = 270;
        categoryAxis2.renderer.labels.template.hideOversized = false;
        categoryAxis2.renderer.minGridDistance = 20;
        categoryAxis2.renderer.labels.template.horizontalCenter = "right";
        categoryAxis2.renderer.labels.template.verticalCenter = "middle";
        categoryAxis2.tooltip.label.rotation = 270;
        categoryAxis2.tooltip.label.horizontalCenter = "right";
        categoryAxis2.tooltip.label.verticalCenter = "middle";

        let valueAxis2 = chart6.yAxes.push(new am4charts.ValueAxis());
        valueAxis2.title.text = "Aşılama Oranı";
        valueAxis2.title.fontWeight = "bold";

        // Create series
        var series2 = chart6.series.push(new am4charts.ColumnSeries3D());
        series2.dataFields.valueY = "asi_oran";
        series2.dataFields.categoryX = "il";
        series2.name = "Visits";
        series2.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series2.columns.template.fillOpacity = .8;

        var columnTemplate2 = series2.columns.template;
        columnTemplate2.strokeWidth = 2;
        columnTemplate2.strokeOpacity = 1;
        columnTemplate2.stroke = am4core.color("#FFFFFF");

        columnTemplate2.adapter.add("fill", function (fill, target) {
            return chart6.colors.getIndex(target.dataItem.index + 3);
        })

        columnTemplate2.adapter.add("stroke", function (stroke, target) {
            return chart6.colors.getIndex(target.dataItem.index);
        })

        chart6.cursor = new am4charts.XYCursor();
        chart6.cursor.lineX.strokeOpacity = 0;
        chart6.cursor.lineY.strokeOpacity = 0;

    });


});
//// 3


$.getJSON("http://netigmademo.netcad.com.tr/geoserver/turkey/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=turkey%3Anufusa_oranla_en_az_asi_iki&outputFormat=application%2Fjson", function (data) {

    var b = data;

    a.push(data)

    for (i = 0; i < b.features.length; i++) {



        var obj = new Object();
        obj.il = b.features[i].properties.il;
        obj.asi_oran = b.features[i].properties.ikinci_doz_yuzde;
        var jsonString = JSON.stringify(obj);
        chart_ikinci_doz_en_az.push(obj);
    }


    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_dataviz);
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart7 = am4core.create("chartdiv7", am4charts.XYChart3D);

        // Add data
        chart7.data = chart_ikinci_doz_en_az;
        chart7.colors.list = [
            am4core.color("#1C0000"),
			am4core.color("#540000"),
			am4core.color("#920000"),
			am4core.color("#c70000"),
			am4core.color("#ff0000")
          ];
        // Create axes
        let categoryAxis3 = chart7.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis3.dataFields.category = "il";
        categoryAxis3.renderer.labels.template.rotation = 270;
        categoryAxis3.renderer.labels.template.hideOversized = false;
        categoryAxis3.renderer.minGridDistance = 20;
        categoryAxis3.renderer.labels.template.horizontalCenter = "right";
        categoryAxis3.renderer.labels.template.verticalCenter = "middle";
        categoryAxis3.tooltip.label.rotation = 270;
        categoryAxis3.tooltip.label.horizontalCenter = "right";
        categoryAxis3.tooltip.label.verticalCenter = "middle";

        let valueAxis3 = chart7.yAxes.push(new am4charts.ValueAxis());
        valueAxis3.title.text = "Aşılama Oranı";
        valueAxis3.title.fontWeight = "bold";

        // Create series
        var series3 = chart7.series.push(new am4charts.ColumnSeries3D());
        series3.dataFields.valueY = "asi_oran";
        series3.dataFields.categoryX = "il";
        series3.name = "Visits";
        series3.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series3.columns.template.fillOpacity = .8;

        var columnTemplate3 = series3.columns.template;
        columnTemplate3.strokeWidth = 2;
        columnTemplate3.strokeOpacity = 1;
        columnTemplate3.stroke = am4core.color("#FFFFFF");

        columnTemplate3.adapter.add("fill", function (fill, target) {
            return chart7.colors.getIndex(target.dataItem.index);
        })

        columnTemplate3.adapter.add("stroke", function (stroke, target) {
            return chart7.colors.getIndex(target.dataItem.index);
        })

        chart7.cursor = new am4charts.XYCursor();
        chart7.cursor.lineX.strokeOpacity = 0;
        chart7.cursor.lineY.strokeOpacity = 0;

    });


});
///4 

$.getJSON("http://netigmademo.netcad.com.tr/geoserver/turkey/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=turkey%3Anufusa_oranla_en_cok_asi_iki&outputFormat=application%2Fjson", function (data) {

    var b = data;

    a.push(data)

    for (i = 0; i < b.features.length; i++) {



        var obj = new Object();
        obj.il = b.features[i].properties.il_adi;
        obj.asi_oran = b.features[i].properties.ikinci_doz_yuzde;
        var jsonString = JSON.stringify(obj);
        chart_ikinci_doz_en_fazla.push(obj);
    }


    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_kelly);
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart8 = am4core.create("chartdiv8", am4charts.XYChart3D);

        // Add data
        chart8.data = chart_ikinci_doz_en_fazla;

        // Create axes
        let categoryAxis4 = chart8.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis4.dataFields.category = "il";
        categoryAxis4.renderer.labels.template.rotation = 270;
        categoryAxis4.renderer.labels.template.hideOversized = false;
        categoryAxis4.renderer.minGridDistance = 20;
        categoryAxis4.renderer.labels.template.horizontalCenter = "right";
        categoryAxis4.renderer.labels.template.verticalCenter = "middle";
        categoryAxis4.tooltip.label.rotation = 270;
        categoryAxis4.tooltip.label.horizontalCenter = "right";
        categoryAxis4.tooltip.label.verticalCenter = "middle";

        let valueAxis4 = chart8.yAxes.push(new am4charts.ValueAxis());
        valueAxis4.title.text = "Aşılama Oranı";
        valueAxis4.title.fontWeight = "bold";

        // Create series
        var series4 = chart8.series.push(new am4charts.ColumnSeries3D());
        series4.dataFields.valueY = "asi_oran";
        series4.dataFields.categoryX = "il";
        series4.name = "Visits";
        series4.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series4.columns.template.fillOpacity = .8;

        var columnTemplate4 = series4.columns.template;
        columnTemplate4.strokeWidth = 2;
        columnTemplate4.strokeOpacity = 1;
        columnTemplate4.stroke = am4core.color("#FFFFFF");

        columnTemplate4.adapter.add("fill", function (fill, target) {
            return chart8.colors.getIndex(target.dataItem.index);
        })

        columnTemplate4.adapter.add("stroke", function (stroke, target) {
            return chart8.colors.getIndex(target.dataItem.index);
        })

        chart8.cursor = new am4charts.XYCursor();
        chart8.cursor.lineX.strokeOpacity = 0;
        chart8.cursor.lineY.strokeOpacity = 0;
        chart8.colors.list = [	  
		    am4core.color("#8cc54a"),	
			am4core.color("#5eab2e"),	
			am4core.color("#3f962c"),	
			am4core.color("#168523"),	
			am4core.color("#13761f")
			 ];
    });


});

////5 

var chart_gunluk_asi = [];
var chart_gunluk_asi_en_fazla = [];
var chart_gunluk_asi_en_az = [];


$.getJSON("http://netigmademo.netcad.com.tr/geoserver/turkey/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=turkey%3Aturkiye_gunluk_asi&outputFormat=application%2Fjson", function (data) {

    var b = data;

    for (i = 0; i < b.features.length; i++) {
        var obj = new Object();
        $(".genel")[0].innerHTML = b.features[i].properties.asi_genel
    }

});

///6


$.getJSON("http://netigmademo.netcad.com.tr/geoserver/turkey/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=turkey%3Aturkiye_gunluk_asi_en_az_10&outputFormat=application%2Fjson", function (data) {

    var b = data;

    a.push(data)

    for (i = 0; i < b.features.length; i++) {



        var obj = new Object();
        obj.asi = b.features[i].properties.asi;
        obj.il = b.features[i].properties.il;
        var jsonString = JSON.stringify(obj);
        chart_gunluk_asi_en_az.push(obj);
    }



    am4core.useTheme(am4themes_animated);


    var chart9 = am4core.create("chartdiv9", am4charts.XYChart);





    chart9.data = chart_gunluk_asi_en_az;
    chart9.colors.list = [	 	
        am4core.color("#BC7F15")
         ];
    var categoryAxis9 = chart9.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis9.renderer.grid.template.location = 0;
    categoryAxis9.dataFields.category = "il";
    categoryAxis9.renderer.minGridDistance = 15;
    categoryAxis9.renderer.grid.template.location = 0.5;
    categoryAxis9.renderer.grid.template.strokeDasharray = "1,3";
    categoryAxis9.renderer.labels.template.rotation = -90;
    categoryAxis9.renderer.labels.template.horizontalCenter = "left";
    categoryAxis9.renderer.labels.template.location = 0.5;

    categoryAxis9.renderer.labels.template.adapter.add("dx", function (dx, target) {
        return -target.maxRight / 2;
    })

    var valueAxis9 = chart9.yAxes.push(new am4charts.ValueAxis());
    valueAxis9.tooltip.disabled = true;
    valueAxis9.renderer.ticks.template.disabled = true;
    valueAxis9.renderer.axisFills.template.disabled = true;

    var series9 = chart9.series.push(new am4charts.ColumnSeries());
    series9.dataFields.categoryX = "il";
    series9.dataFields.valueY = "asi";
    series9.tooltipText = "{valueY.value}";
    series9.sequencedInterpolation = true;
    series9.fillOpacity = 0;
    series9.strokeOpacity = 1;
    series9.strokeDashArray = "1,3";
    series9.columns.template.width = 0.01;
    series9.tooltip.pointerOrientation = "horizontal";

    var bullet = series9.bullets.create(am4charts.CircleBullet);

    chart9.cursor = new am4charts.XYCursor();

    chart9.scrollbarX = new am4core.Scrollbar();
    chart9.scrollbarY = new am4core.Scrollbar();



});


$.getJSON("http://netigmademo.netcad.com.tr/geoserver/turkey/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=turkey%3Aturkiye_gunluk_asi_en_cok_10&outputFormat=application%2Fjson", function (data) {

    var b = data;

    a.push(data)

    for (i = 0; i < b.features.length; i++) {



        var obj = new Object();
        obj.asi = b.features[i].properties.asi;
        obj.il = b.features[i].properties.il;
        var jsonString = JSON.stringify(obj);
        chart_gunluk_asi_en_fazla.push(obj);
    }



    am4core.useTheme(am4themes_animated);


    var chart10 = am4core.create("chartdiv10", am4charts.XYChart);





    chart10.data = chart_gunluk_asi_en_fazla;
    chart10.colors.list = [	 	
        am4core.color("#F3DD00")
         ];
    var categoryAxis10 = chart10.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis10.renderer.grid.template.location = 0;
    categoryAxis10.dataFields.category = "il";
    categoryAxis10.renderer.minGridDistance = 15;
    categoryAxis10.renderer.grid.template.location = 0.5;
    categoryAxis10.renderer.grid.template.strokeDasharray = "1,3";
    categoryAxis10.renderer.labels.template.rotation = -90;
    categoryAxis10.renderer.labels.template.horizontalCenter = "left";
    categoryAxis10.renderer.labels.template.location = 0.5;

    categoryAxis10.renderer.labels.template.adapter.add("dx", function (dx, target) {
        return -target.maxRight / 2;
    })

    var valueAxis10 = chart10.yAxes.push(new am4charts.ValueAxis());
    valueAxis10.tooltip.disabled = true;
    valueAxis10.renderer.ticks.template.disabled = true;
    valueAxis10.renderer.axisFills.template.disabled = true;

    var series10 = chart10.series.push(new am4charts.ColumnSeries());
    series10.dataFields.categoryX = "il";
    series10.dataFields.valueY = "asi";
    series10.tooltipText = "{valueY.value}";
    series10.sequencedInterpolation = true;
    series10.fillOpacity = 0;
    series10.strokeOpacity = 1;
    series10.strokeDashArray = "1,3";
    series10.columns.template.width = 0.01;
    series10.tooltip.pointerOrientation = "horizontal";

    var bullet = series10.bullets.create(am4charts.CircleBullet);

    chart10.cursor = new am4charts.XYCursor();

    chart10.scrollbarX = new am4core.Scrollbar();
    chart10.scrollbarY = new am4core.Scrollbar();



});

var chart_birinci_doz = [];
var chart_ikinci_doz = [];


//// 11

$.getJSON("http://netigmademo.netcad.com.tr/geoserver/turkey/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=turkey%3Aturkiye_birinci_doz_oranı&outputFormat=application%2Fjson", function (data) {

    var b = data;

    a.push(data)

    for (i = 0; i < b.features.length; i++) {



        var obj = new Object();
        obj.asi_yuzde = b.features[i].properties.asi_yuzde;
        obj.durum = b.features[i].properties.durum;
        var jsonString = JSON.stringify(obj);
        chart_birinci_doz.push(obj);
    }



    am4core.ready(function() {

        // Themes begin
        am4core.useTheme(am4themes_frozen);
        // Themes end
        
        var iconPath = "M53.5,476c0,14,6.833,21,20.5,21s20.5-7,20.5-21V287h21v189c0,14,6.834,21,20.5,21 c13.667,0,20.5-7,20.5-21V154h10v116c0,7.334,2.5,12.667,7.5,16s10.167,3.333,15.5,0s8-8.667,8-16V145c0-13.334-4.5-23.667-13.5-31 s-21.5-11-37.5-11h-82c-15.333,0-27.833,3.333-37.5,10s-14.5,17-14.5,31v133c0,6,2.667,10.333,8,13s10.5,2.667,15.5,0s7.5-7,7.5-13 V154h10V476 M61.5,42.5c0,11.667,4.167,21.667,12.5,30S92.333,85,104,85s21.667-4.167,30-12.5S146.5,54,146.5,42 c0-11.335-4.167-21.168-12.5-29.5C125.667,4.167,115.667,0,104,0S82.333,4.167,74,12.5S61.5,30.833,61.5,42.5z"
        
        
        
        var chart11 = am4core.create("chartdiv11", am4charts.SlicedChart);
        chart11.hiddenState.properties.opacity = 0; // this makes initial fade in effect
        
        chart11.data = chart_birinci_doz;
        
        var series11 = chart11.series.push(new am4charts.PictorialStackedSeries());
        series11.dataFields.value = "asi_yuzde";
        series11.dataFields.category = "durum";
        series11.alignLabels = true;
        
        series11.maskSprite.path = iconPath;
        series11.ticks.template.locationX = 1;
        series11.ticks.template.locationY = 0.5;
        series11.colors.list = [
            am4core.color("#845EC2"),
            am4core.color("#D65DB1"),
            am4core.color("#FF6F91"),
            am4core.color("#FF9671"),
            am4core.color("#FFC75F"),
            am4core.color("#F9F871"),
          ];
        series11.labelsContainer.width = 200;
        
        chart11.legend = new am4charts.Legend();   
        chart11.responsive.enabled = true;
        chart11.responsive.rules.push({
          relevant: function(target) {
            if (target.pixelWidth <= 600) {
                series11.labelsContainer.disabled=true
                series11.alignLabels = false;
              return true;
            }
            return false;
          },
          state: function(target, stateId) {
            if (target instanceof am4charts.PieSeries) {
              var state = target.states.create(stateId);
        
              var labelState = target.labels.template.states.create(stateId);
              labelState.properties.disabled = true;
        
              var tickState = target.ticks.template.states.create(stateId);
              tickState.properties.disabled = true;
              return state;
            }
        
            return null;
          }
        });

        
        
        });

});

$.getJSON("http://netigmademo.netcad.com.tr/geoserver/turkey/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=turkey%3Aturkiye_ikinci_doz_oranı&outputFormat=application%2Fjson", function (data) {

    var b = data;

    a.push(data)

    for (i = 0; i < b.features.length; i++) {



        var obj = new Object();
        obj.asi_yuzde = b.features[i].properties.asi_yuzde;
        obj.durum = b.features[i].properties.durum;
        var jsonString = JSON.stringify(obj);
        chart_ikinci_doz.push(obj);
    }



    am4core.ready(function() {

        // Themes begin
        am4core.useTheme(am4themes_frozen);
        // Themes end
        
        var iconPath = "M53.5,476c0,14,6.833,21,20.5,21s20.5-7,20.5-21V287h21v189c0,14,6.834,21,20.5,21 c13.667,0,20.5-7,20.5-21V154h10v116c0,7.334,2.5,12.667,7.5,16s10.167,3.333,15.5,0s8-8.667,8-16V145c0-13.334-4.5-23.667-13.5-31 s-21.5-11-37.5-11h-82c-15.333,0-27.833,3.333-37.5,10s-14.5,17-14.5,31v133c0,6,2.667,10.333,8,13s10.5,2.667,15.5,0s7.5-7,7.5-13 V154h10V476 M61.5,42.5c0,11.667,4.167,21.667,12.5,30S92.333,85,104,85s21.667-4.167,30-12.5S146.5,54,146.5,42 c0-11.335-4.167-21.168-12.5-29.5C125.667,4.167,115.667,0,104,0S82.333,4.167,74,12.5S61.5,30.833,61.5,42.5z"
        
        
        
        var chart12 = am4core.create("chartdiv12", am4charts.SlicedChart);
        chart12.hiddenState.properties.opacity = 0; // this makes initial fade in effect
        
        chart12.data = chart_ikinci_doz;
        
        var series12 = chart12.series.push(new am4charts.PictorialStackedSeries());
        series12.dataFields.value = "asi_yuzde";
        series12.dataFields.category = "durum";
        series12.alignLabels = true;
        
        series12.maskSprite.path = iconPath;
        series12.ticks.template.locationX = 1;
        series12.ticks.template.locationY = 0.5;
        
        series12.labelsContainer.width = 200;
        series12.colors.list = [
            am4core.color("#845EC2"),
            am4core.color("#D65DB1"),
            am4core.color("#FF6F91"),
            am4core.color("#FF9671"),
            am4core.color("#FFC75F"),
            am4core.color("#F9F871"),
          ];
        chart12.legend = new am4charts.Legend();
        chart12.responsive.enabled = true;
        chart12.responsive.rules.push({
          relevant: function(target) {
            if (target.pixelWidth <= 600) {
                series12.labelsContainer.disabled=true
                series12.alignLabels = false;
         
              return true;
            }
            return false;
          },
          state: function(target, stateId) {
            if (target instanceof am4charts.PieSeries) {
              var state = target.states.create(stateId);
        
              var labelState = target.labels.template.states.create(stateId);
              labelState.properties.disabled = true;
        
              var tickState = target.ticks.template.states.create(stateId);
              tickState.properties.disabled = true;
              return state;
            }
        
            return null;
          }
        });

        });

});

////1

var turkiye_asi_orani = [];
$.getJSON("http://netigmademo.netcad.com.tr/geoserver/turkey/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=turkey%3Aturkiye_asi_oranlari_tum&outputFormat=application%2Fjson", function (data) {

    var b = data;

    a.push(data)

 
    for (i = 0; i < b.features.length; i++) {


        asisayisi.push(b.features[i].properties.asisayisi);

        var obj = new Object();
        obj.il = b.features[i].properties.il;
        obj.asi_bir = b.features[i].properties.asi_yuzde_bir;
        obj.asi_iki = b.features[i].properties.asi_yuzde_iki;
        var jsonString = JSON.stringify(obj);
        features_covid.push(obj);
    }




    am4core.ready(function () {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.XYChart);

    // Add data
    chart.data = features_covid;

    // Create axes
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "il";
    categoryAxis.numberFormatter.numberFormat = "#";
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.cellStartLocation = 0.1;
    categoryAxis.renderer.cellEndLocation = 0.9;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.opposite = true;

    // Create series
    function createSeries(field, name) {
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueX = field;
        series.dataFields.categoryY = "il";
        series.name = name;
        series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
        series.columns.template.height = am4core.percent(80);
        series.sequencedInterpolation = true;

        var valueLabel = series.bullets.push(new am4charts.LabelBullet());
        valueLabel.label.text = "{valueX}";
        valueLabel.label.horizontalCenter = "left";
        valueLabel.label.dx = 10;
        valueLabel.label.hideOversized = false;
        valueLabel.label.truncate = false;

        var categoryLabel = series.bullets.push(new am4charts.LabelBullet());
        categoryLabel.label.text = "{name}";
        categoryLabel.label.horizontalCenter = "right";
        categoryLabel.label.dx = -10;
        categoryLabel.label.fill = am4core.color("#fff");
        categoryLabel.label.hideOversized = false;
        categoryLabel.label.truncate = false;
    }

    createSeries("asi_bir", "1. Doz");
    createSeries("asi_iki", "2. Doz");


    });


});