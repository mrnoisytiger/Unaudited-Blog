var yelp_data;
var pop_data;
var zips_list = [];
var race_list = ['white','asian','black','api','hispanic'];
var race_map_list = {
    'white': 'White',
    'asian': 'Asian',
    'black': 'Black',
    'api': 'Pac. Isl.',
    'hispanic': 'Hispanic'
};
var chart_one; // Category to Race Data
var chart_two; // Per Zip Data
var chart_three;

// search for the datalabels plugin
var datalabels = Chart.plugins.getAll().filter(function(p) {
    return p.id === 'datalabels';
})[0];
// globally unregister the plugin
Chart.plugins.unregister(datalabels);

// Pull the data files and call to initialize graphs
$(document).ready(function() {
    $.get( "/files/post/cuisine-and-demographics/yelp_data.json", function( data ) {
        yelp_data = data;
        
        $.get( "/files/post/cuisine-and-demographics/pop_data.json", function( data ) {
            pop_data = data;
            for ( var single_zip in pop_data ) {
                zips_list.push(single_zip);
            }

            Chart.defaults.global.responsive = true;
            Chart.defaults.global.maintainAspectRatio = false;

            initialize_cat_to_dem_data();
            initialize_per_zip_data(zips_list[0]);
            initialize_per_race_data(race_list[0]);
        });
    });

    // Initialize Event Handlers for button clicks
    $("#right-arrow-zip-code").click(function() {
        per_zip_buttons_change('right')
    });
    $("#left-arrow-zip-code").click(function() {
        per_zip_buttons_change('left')
    });
    $("#right-arrow-race").click(function() {
        per_race_buttons_change('right')
    });
    $("#left-arrow-race").click(function() {
        per_race_buttons_change('left')
    });
});

// Initialize the graphs. Here's where the actual code begins.
function initialize_cat_to_dem_data() {
    var ctx_one = document.getElementById('cats-to-dem').getContext('2d');
    chart_one = new Chart(ctx_one, {
        type: 'doughnut',
        data: {
            labels: ['White', 'Asian', 'Black', 'Pac. Isl.', 'Hispanic'],
            datasets: [{
                data: [60,33,6,7,21],
                backgroundColor: [
                    'rgba(7,180,231, 0.6)',
                    'rgba(231,7,180,0.6)',
                    'rgba(180,231,7,0.6)',
                    'rgba(94,12,232,0.6)',
                    'rgba(232,147,12,0.6)',
                ],
                datalabels: {
                    color: 'black',
                    font: {
                      weight: 'bold',
                      size: '16',
                    },
                    formatter: Math.round,
                }
            }],
        },
        options:{
            title: {
                display: true,
                text: "Categories Per Race",
                fontFamily: "'Lato','Helvetica Neue',Helvetica,sans-serif",
                fontStyle: "bold",
                fontSize: "20",
                fontColor: "#000",
                padding: 10,
            },
            tooltips: {
                enabled: false
            }
        },
        plugins: [
            datalabels
        ],
        responsive: true,
        maintainAspectRatio: false
    })
}

function initialize_per_zip_data(zip) {
    $('#current-zip-code').attr('data-current-zip', zip);
    $('#current-zip-code').html(zip);
    var per_zip_yelp_data = [];
    var per_zip_pop_data = [];
    get_per_zip_data(zip,per_zip_yelp_data,per_zip_pop_data);

    // Per-ZIP Data
    var ctx_two = document.getElementById('per-zip-comparison').getContext('2d');
    chart_two = new Chart(ctx_two, {
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

function initialize_per_race_data(race) {
    $('#current-race').attr('data-current-race', race);
    $('#current-race').html(race_map_list[race]);
    var per_race_data = [];
    get_per_race_data(race,per_race_data);

    var ctx_three = document.getElementById('per-race-comparison').getContext('2d');
    chart_three = new Chart(ctx_three, {
        type: 'scatter',
        data: {
            datasets: [{
                label: "Race",
                data: per_race_data,
                backgroundColor: 'rgba(7,180,231, 0.6)',
                pointRadius: 5,
            }],
        },
        options: {
            title: {
                display: true,
                text: "Per Race Data",
                fontFamily: "'Lato','Helvetica Neue',Helvetica,sans-serif",
                fontStyle: "bold",
                fontSize: "20",
                fontColor: "#000",
                padding: 10,
            },
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Population %',
                        fontSize: 14
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Restaurant %',
                        fontSize: 14
                    }
                }],
            }
        }
    })
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

function change_per_race_data(race, chart) {
    $('#current-race').attr('data-current-race', race);
    $('#current-race').html(race_map_list[race]);
    
    var data_var = [];
    get_per_race_data(race,data_var);

    chart.data.datasets[0].data = data_var;
    chart.update();
}

function get_per_zip_data(zip, yelp_var, pop_var) {
    var zip_yelp_total = yelp_data[zip]['restaurants']['total'];
    var zip_pop_total = pop_data[zip]['population']['total'];

    for ( race in yelp_data[zip]['restaurants'] ) {
        if ( race !== 'total' ) {
        var race_yelp_count = yelp_data[zip]['restaurants'][race];
        yelp_var.push(toPercent(race_yelp_count,zip_yelp_total));
        }
    }

    for ( race in pop_data[zip]['population'] ) {
        if ( race !== 'total' ) {
            var race_pop_count = pop_data[zip]['population'][race];
            pop_var.push(toPercent(race_pop_count,zip_pop_total));
        }
    }
}

function get_per_race_data(race, data_var) {
    for (var zip in yelp_data ) {
        var race_yelp_percent = toPercent( yelp_data[zip]['restaurants'][race],yelp_data[zip]['restaurants']['total'] );
        var race_pop_percent = toPercent( pop_data[zip]['population'][race],pop_data[zip]['population']['total'] );
        
        var data_point = {
            'x': race_yelp_percent,
            'y': race_pop_percent,
        }
        
        data_var.push(data_point);
    }
}

function toPercent(part,total) {
    var perc = part/total * 100;
    perc = +perc.toFixed(2);
    return perc;
}

function per_zip_buttons_change(direction) {
    current_zip = $('#current-zip-code').attr('data-current-zip');
    current_zip_index = zips_list.indexOf(current_zip);

    if ( direction == "left" ) {
        if ( current_zip_index <= 1 ) {
            change_per_zip_data(zips_list[0], chart_two);
            $("#left-arrow-zip-code").css("color", "lightgrey");
        } else {
            change_per_zip_data(zips_list[current_zip_index-1], chart_two);
            $("#left-arrow-zip-code").css("color", "black");
            $("#right-arrow-zip-code").css("color", "black");
        }
    } else {
        if ( current_zip_index >= zips_list.length - 2) {
            change_per_zip_data(zips_list[zips_list.length - 1], chart_two);
            $("#right-arrow-zip-code").css("color", "lightgrey");
        } else {
            change_per_zip_data(zips_list[current_zip_index + 1], chart_two);
            $("#left-arrow-zip-code").css("color", "black");
            $("#right-arrow-zip-code").css("color", "black");
        }
    }
}

function per_race_buttons_change(direction) {
    current_race = $('#current-race').attr('data-current-race');
    current_race_index = race_list.indexOf(current_race);

    if ( direction == "left" ) {
        if ( current_race_index <= 1 ) {
            change_per_race_data(race_list[0], chart_three);
            $("#left-arrow-race").css("color", "lightgrey");
        } else {
            change_per_race_data(race_list[current_race_index-1], chart_three);
            $("#left-arrow-race").css("color", "black");
            $("#right-arrow-race").css("color", "black");
        }
    } else {
        if ( current_race_index >= race_list.length - 2) {
            change_per_race_data(race_list[race_list.length - 1], chart_three);
            $("#right-arrow-race").css("color", "lightgrey");
        } else {
            change_per_race_data(race_list[current_race_index + 1], chart_three);
            $("#left-arrow-race").css("color", "black");
            $("#right-arrow-race").css("color", "black");
        }
    }
}