// Selections
var datasetsSelection = document.querySelector("#datasets");
var ctx = document.getElementById('myChart');
var industryForm = document.querySelector("#industry-form");
var industrySelection = document.querySelector("#industry");
var chartTitle = document.querySelector("#chart-title");
var chartDates = document.querySelector("#chart-dates");

// Global vars.
var directory;
var myChart;
var state = {
    dataset: "New Postings Trend",
    category: null
};
var directoryIdMap = {
    AU: "Australia",
    CA: "Canada",
    DE: "Germany",
    FR: "France",
    GB: "Great Britain",
    IE: "Ireland",
    US: "United States"
};
var colors = [
    "#2164F3"
];

function shortDate(date) {
    var months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return months[date.getMonth()] + " " + date.getDate();
}


/**
 * Init Chart stuff.
 */
function initChartJS() {
    // Extend chart.
    Chart.defaults.LineWithLine = Chart.defaults.line;
    Chart.defaults.global.animation.duration = 0;
    Chart.controllers.LineWithLine = Chart.controllers.line.extend({
        draw: function(ease) {
            Chart.controllers.line.prototype.draw.call(this, ease);

            if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
                var activePoint = this.chart.tooltip._active[0],
                    ctx = this.chart.ctx,
                    x = activePoint.tooltipPosition().x,
                    topY = this.chart.scales['y-axis-0'].top,
                    bottomY = this.chart.scales['y-axis-0'].bottom;

                // draw line
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, topY);
                ctx.lineTo(x, bottomY);
                ctx.lineWidth = .5;
                ctx.strokeStyle = '#808080';
                ctx.stroke();
                ctx.restore();
            }
        }
    });

    // Init a chart.
    myChart = new Chart(ctx, {
        type: 'LineWithLine',
        data: {
            labels: [],
            datasets: [],
        },
        options: {
            tooltips : {
                mode: 'index',
                intersect: false,
                backgroundColor: "	rgb(153,204,255, 0.9)",
                titleFontSize: 14,
                titleSpacing: 4,
                bodyFontSize: 14,
                bodySpacing: 4,
                bodyFontColor: "#000000",
                titleFontColor: "#000000",
                borderColor: "#000000",
                borderWidth: 0.5,
                itemSort: function (item1, item2) { return item2.yLabel - item1.yLabel },
                callbacks: {
                title: function(tooltipItems) {
                    return shortDate(new Date(tooltipItems[0].xLabel));
                },
                label: function (tooltipItem, data) {
                    return "(" + tooltipItem.yLabel.toFixed(1) + "%)";
                }
            }
          },
          hover: {
                animationDuration: 0,
                mode: 'index',
                intersect: false
          },
          legend: {
                display: false
          },
          scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false,
                        autoSkip: false,

                        callback: function(value, index, values) {
                            console.log(value + 100);
                            return value + 100                          
                        }

                    },
                    gridLines: {
                        display: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: false,
                        autoSkip: false,
                        maxTicksLimit: 200,
                        callback: function(value, index, values) {
                            console.log(["1", "15"].includes(value.split(" ")[1]) ? value : "");
                            return ["1", "15"].includes(value.split(" ")[1]) ? value : undefined;
                        
                        }
                    },
                    type: 'time',
                    time: {
                        unit: 'day',
                        stepSize: 1
                    },
                    gridLines: {
                        display: true,
                        callback: function(value, index, values) {
                            console.log(["1", "15"].includes(value.split(" ")[1]) ? value : "");
                            return ["1", "15"].includes(value.split(" ")[1]) ? true : false;
                        
                        }
                    }
                }]
            }
        }
    });
};


// Adds data to the chart.
function updateApp ({ dataset, category }) {
    // Update UI.
    if (category) {
        // Chart data.
        var data = dataset.data.filter(function(d) {
            return d.category === category;
        }).map(function (d,i) {
            return { x: new Date(d.date), y: d[dataset.yLabel] }
        });

        // UI
        industryForm.style.visibility = "visible";
        chartTitle.innerHTML =
            dataset.title + " in " + category + ", " + directoryIdMap[directory];
    } else {
        // Chart data.
        var data = dataset.data.map(function (d,i) {
            return { x: new Date(d.date), y: d[dataset.yLabel] }
        });

        // UI
        industryForm.style.visibility = "hidden";
        chartTitle.innerHTML =
            dataset.title + ", " + directoryIdMap[directory];
        chartDates.innerHTML = 
            "7 day moving avg through "
            + shortDate(new Date(dataset.data[dataset.data.length - 1].date))
            + ", indexed to "
            + shortDate(new Date(dataset.data[0].date))
    };

    // Remove old datasets.
    myChart.data.labels.pop();
    while (myChart.data.datasets.length) {
        myChart.data.datasets.pop();
    }
    myChart.update();

    // Init the new dataset.    
    const newDataset = {
      label: dataset.name,
      data: data,
      fill: false,
      borderColor: colors[0],
      borderWidth: 3.0,
      pointRadius: 0,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: colors[0],
      pointHoverBorderColor: "#000000"
    };

    // Update chart.
    myChart.data.datasets.push(newDataset);
    myChart.update();
};


/**
 * Returns array of 
 * @param {*} directory 
 */
function getPossibleDatasets(directory) {
    return [
        {
            name: "New Postings Trend",
            title: "New Job Postings on Indeed",
            filepath:  "./" + directory + "/" + "new_postings_trend_" + directory + ".csv",
            data: null,
            yLabel: "YoY_pct_change_in_new_postings_trend_from_feb1"
        },
        {
            name: "Postings Trend",
            title: "Job Postings on Indeed",
            filepath: "./" + directory + "/" + "postings_trend_" + directory + ".csv",
            data: null,
            yLabel: "YoY_pct_change_in_postings_trend_from_feb1"
        },
        {
            name: "Postings Category Trend",
            title: "Job Postings",
            filepath: "./" + directory + "/" + "postings_category_trend_" + directory + ".csv",
            data: null,
            yLabel: "YoY_pct_change_in_postings_trend_from_feb1"
        }
    ];
};


/**
 * Populate UI.
 */
function populateUI(datasets) {
    // Delete existing options.
    datasetsSelection.innerHTML = "";

    // Populate dataset selector.
    datasets.forEach(function(dataset) {
        if (dataset.data !== null) {
            var option = document.createElement("option");
            option.value = dataset.name;
            option.innerHTML = dataset.name;
            datasetsSelection.appendChild(option);
            if (dataset.name === "Postings Category Trend") {
                populateIndustryForm(dataset.data);
            };
        };
    });

    // Add event listener to data selector.
    datasetsSelection.addEventListener("change", function() {
        for (var i = 0; i < datasets.length; i++) {
            if (datasets[i].name === this.value) {
                if (datasets[i].name === "Postings Category Trend") {
                    state = {
                        dataset: datasets[i],
                        category: "Accounting"
                    }
                    updateApp(state);
                } else {
                    state = {
                        dataset: datasets[i],
                        category: null
                    }
                    updateApp(state);
                }
                break;
            };
        };
    });
};


function populateIndustryForm(data) {
    // Populate dataset selector.
    var categoriesSet = new Set(data.map(function(d) {
        return d.category 
    }));

    var rtn;

    Array(...categoriesSet).sort().forEach(function(category, i) {
        if (i === 0) { rtn = i }
        var option = document.createElement("option");
        option.value = category;
        option.innerHTML = category;
        industrySelection.appendChild(option);
    });

    // Add event listener to data selector.
    industrySelection.addEventListener("change", function() {
        state = {
            ...state,
            category: this.value
        }
        updateApp(state);
    });

    return rtn;
}


/**
 * Main
 */
function main () {
    // Get the hash.
    var hash = window.location.hash;

    // Convert to directory.
    directory = hash.replace("#", "");

    // Init datasets.
    var datasets = getPossibleDatasets(directory);

    // Try reading all possible files from the directory.
    Promise.all(
        datasets.map(function(d) {
            return d3.csv(d.filepath).catch(function(err) { return null });
        })
    ).then(
        function(data) {
            data.forEach(function(d, i) { datasets[i].data = d });
            datasets = datasets.map(function(dataset) {
                return {
                    ...dataset,
                    data: dataset.data === null ? null : dataset.data.map(function(data) {
                        var newDate = new Date(data.date);
                        return {
                            ...data,
                            date: new Date(
                                newDate.getTime()
                                + Math.abs(newDate.getTimezoneOffset()*60000)
                            )
                        }
                    })
                }
            })
            console.log(datasets);
            populateUI(datasets);
            state = {
                dataset: datasets[0],
                category: null
            };
            updateApp(state);
        }
    );
};

initChartJS();
main();

window.addEventListener("hashchange", function () {
    main();
});
