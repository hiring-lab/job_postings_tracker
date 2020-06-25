// Selections
var datasetsSelection = document.querySelector("#datasets");
var ctx = document.getElementById('myChart');

// Global vars.
var myChart;

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
                // title: tooltipItems => {
                //     const date = new Date(tooltipItems[0].xLabel);
                //     return monthNames[date.getMonth()] + ' ' + date.getFullYear();
                // },
                label: (tooltipItem, data) => {
                    const label = data.datasets[tooltipItem.datasetIndex].label || '';
                    return "  " + label + " " + "(" + tooltipItem.yLabel.toFixed(1) + "%)";
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
                        ticks: { fontFamily: "Helvetica Neue Light" },
                    },
                    gridLines: {
                        display: false
                    }
                }],
                xAxes: [{
                    ticks: { beginAtZero: false, fontFamily: "Helvetica Neue Light" },
                    type: 'time',
                    time: {
                        unit: 'day'
                    },
                    gridLines: {
                        display: false
                    }
                }]
            }
        }
    });
};


// Adds data to the chart.
const updateChart = (dataset) => {
    // Remove old datasets.
    myChart.data.labels.pop();
    while (myChart.data.datasets.length) {
        myChart.data.datasets.pop();
    }
    myChart.update();

    // Init the new dataset.    
    const newDataset = {
      label: dataset.name,
      data: dataset.data.map(function (d,i) {
          return { x: new Date(d.date), y: d[dataset.yLabel] }
      }),
      fill: false,
      borderColor: "#2164F3",
      borderWidth: 3.0,
      pointRadius: 0,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#2164F3",
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
            name: "newPostingsTrend",
            filepath:  "./" + directory + "/" + "new_postings_trend_" + directory + ".csv",
            data: null,
            yLabel: "YoY_pct_change_in_new_postings_trend_from_feb1"
        },
        {
            name: "postingsTrend",
            filepath: "./" + directory + "/" + "postings_trend_" + directory + ".csv",
            data: null,
            yLabel: "YoY_pct_change_in_postings_trend_from_feb1"
        },
        {
            name: "postingsCategoryTrend",
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
    // Populate dataset selector.
    datasets.forEach(function(dataset) {
        if (dataset.data !== null) {
            var option = document.createElement("option");
            option.value = dataset.name;
            option.innerHTML = dataset.name;
            datasetsSelection.appendChild(option);
        };
    });

    // Add event listener to data selector.
    datasetsSelection.addEventListener("change", function() {
        for (var i = 0; i < datasets.length; i++) {
            if (datasets[i].name === this.value) {
                updateChart(datasets[i]);
                break;
            };
        };
    });
};


/**
 * Main
 */
function main () {
    // Get the hash.
    var hash = window.location.hash;

    // Convert to directory.
    var directory = hash.replace("#", "");

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
            console.log(datasets);
            populateUI(datasets);
            updateChart(datasets[0]);
        }
    );
};

initChartJS();
main();
