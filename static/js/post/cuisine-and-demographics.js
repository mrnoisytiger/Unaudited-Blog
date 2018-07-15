var yelp_data;
var pop_data;
var zips_list = [];
var chart_one;

// Pull the data files and call to initialize graphs
$(document).ready(function() {
    $.get( "/files/post/cuisine-and-demographics/yelp_data.json", function( data ) {
        yelp_data = data;
        
        $.get( "/files/post/cuisine-and-demographics/pop_data.json", function( data ) {
            pop_data = data;
            for ( var single_zip in pop_data ) {
                zips_list.push(single_zip);
            }
            initialize_per_zip_data(zips_list[0]);
        });
    });

    $("#right-arrow-zip-code").click(function() {
        per_buttons_change('right')
    });
    $("#left-arrow-zip-code").click(function() {
        per_buttons_change('left')
    });
});

// Initialize the graphs. Here's where the actual code begins.
function initialize_per_zip_data(zip) {
    $('#current-zip-code').attr('data-current-zip', zip);
    $('#current-zip-code').html(zip);
    var per_zip_yelp_data = [];
    var per_zip_pop_data = [];
    get_per_zip_data(zip,per_zip_yelp_data,per_zip_pop_data);

    Chart.defaults.global.responsive = true;
    Chart.defaults.global.maintainAspectRatio = false;

    // Per-ZIP Data
    var ctx_one = document.getElementById('per-zip-comparison').getContext('2d');
    chart_one = new Chart(ctx_one, {
        type: 'radar',
        data: {
            labels: ['White','Asian','Black','Pac. Isl.','Hispanic'],
            datasets: [{
            data: per_zip_yelp_data,
            label: "% of Rest.",
            backgroundColor: 'rgba(7,180,231, 0.4)',
            borderWidth: 3,
            borderColor: 'rgba(7,180,231, 0.7)',
            pointBackgroundColor: 'rgba(7,180,231, 1)',
            pointRadius: 4,
        },{
            data: per_zip_pop_data,
            label: "% of Pop.",
            backgroundColor: 'rgba(255,147,147, 0.4)',
            borderWidth: 3,
            borderColor: 'rgba(255,147,147, 0.7)',
            pointBackgroundColor: 'rgba(255,147,147, 1)',
            pointRadius: 4,
            }],
        },
        options:{
            title: {
                display: true,
                text: "Percentage Data",
                fontFamily: "'Lato','Helvetica Neue',Helvetica,sans-serif",
                fontStyle: "bold",
                fontSize: "20",
                fontColor: "#000",
                padding: 10,
            },        
            scale: {
                ticks: {
                    suggestedMax: Math.max(Math.max.apply(null, per_zip_yelp_data),Math.max.apply(null, per_zip_pop_data)) + 5,
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false
    });
}

function change_per_zip_data(zip, chart) {
    $('#current-zip-code').attr('data-current-zip', zip);
    $('#current-zip-code').html(zip);
    var per_zip_yelp_data = [];
    var per_zip_pop_data = [];
    get_per_zip_data(zip,per_zip_yelp_data,per_zip_pop_data);

    chart.data.datasets[0].data = per_zip_yelp_data;
    chart.data.datasets[1].data = per_zip_pop_data;
    chart.update();
}

function get_per_zip_data(zip, yelp_var, pop_var) {
    var zip_yelp_total = yelp_data[zip]['restaurants']['total'];
    var zip_pop_total = pop_data[zip]['population']['total'];

    for ( race in yelp_data[zip]['restaurants'] ) {
        if ( race !== 'total' ) {
        var race_yelp_count = yelp_data[zip]['restaurants'][race];
        var race_yelp_percent = race_yelp_count/zip_yelp_total * 100;
        race_yelp_percent = +race_yelp_percent.toFixed(2);
        yelp_var.push(race_yelp_percent);
        }
    }

    for ( race in pop_data[zip]['population'] ) {
        if ( race !== 'total' ) {
            var race_pop_count = pop_data[zip]['population'][race];
            var race_pop_percent = race_pop_count/zip_pop_total * 100;
            race_pop_percent = +race_pop_percent.toFixed(2);
            pop_var.push(race_pop_percent);
        }
    }
}

function per_buttons_change(direction) {
    current_zip = $('#current-zip-code').attr('data-current-zip');
    current_zip_index = zips_list.indexOf(current_zip);

    if ( direction == "left" ) {
        if ( current_zip_index <= 1 ) {
            change_per_zip_data(zips_list[0], chart_one);
            $("#left-arrow-zip-code").css("color", "lightgrey");
        } else {
            change_per_zip_data(zips_list[current_zip_index-1], chart_one);
            $("#left-arrow-zip-code").css("color", "black");
            $("#right-arrow-zip-code").css("color", "black");
        }
    } else {
        if ( current_zip_index >= zips_list.length - 2) {
            change_per_zip_data(zips_list[zips_list.length - 1], chart_one);
            $("#right-arrow-zip-code").css("color", "lightgrey");
        } else {
            change_per_zip_data(zips_list[current_zip_index + 1], chart_one);
            $("#left-arrow-zip-code").css("color", "black");
            $("#right-arrow-zip-code").css("color", "black");
        }
    }
}