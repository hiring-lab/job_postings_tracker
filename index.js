// Selections
var datasetsSelection = document.querySelector("#datasets");
var datasetsForm = document.querySelector("#datasets-form");
var selectionsContainer = document.querySelector("#selections-container");
var ctx = document.getElementById('myChart');
var industryForm = document.querySelector("#industry-form");
var industrySelection = document.querySelector("#industry");
var metrosSelection = document.querySelector("#metros");
var metrosForm = document.querySelector("#metros-form");
var chartTitle = document.querySelector("#chart-title");
var chartTitleDataset = document.querySelector("#chart-title-dataset");
var chartTitleLocale = document.querySelector("#chart-title-locale");
var chartDates = document.querySelector("#chart-dates");
var chartDatesP1 = document.querySelector("#chart-dates-p1");
var chartDatesP2 = document.querySelector("#chart-dates-p2");
var key = document.querySelector("#key");

// Global vars.
var directory;
var myChart;
var state = {
    dataset: "postingstrend",
    category: null,
    metro: null,
};
var directoryIdMap = {
    AU: "Australia",
    CA: "Canada",
    DE: "Germany",
    FR: "France",
    GB: "UK",
    IE: "Ireland",
    US: "United States"
};
var colors = [
    "#2164F3",
    "#ff670b",
    "#ffb20d"
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

            if (
                this.chart.tooltip._active
                && this.chart.tooltip._active.length
            ) {
                var activePoint = this.chart.tooltip._active[0];
                var ctx = this.chart.ctx;
                var x = activePoint.tooltipPosition().x;

                const chartWidth = this.chart.scales['x-axis-0'].width;
                const minXValue = this.chart.scales['x-axis-0'].min;
                const maxXValue = this.chart.scales['x-axis-0'].max;
                const chartX = (
                    ((x - this.chart.chartArea.left) / chartWidth)
                    * (maxXValue - minXValue)
                ) + minXValue;

                const lookupDate = new Date(chartX);
                const y2019 = this.chart.data.datasets
                    .find(d => d.label === "2019").data
                    .find(p => p.x.getTime() === lookupDate.getTime())
                    .y;
                const y2020 = this.chart.data.datasets
                    .find(d => d.label === "2020").data
                    .find(p => p.x.getTime() === lookupDate.getTime())
                    .y;

                var topYpixel = this.chart.scales['y-axis-0'].top;
                var bottomYpixel = this.chart.scales['y-axis-0'].bottom;
                const minYValue = this.chart.scales['y-axis-0'].min;
                const maxYValue = this.chart.scales['y-axis-0'].max;

                const y0 = topYpixel + (
                    (maxYValue - y2019)
                    / (maxYValue - minYValue)
                    * (bottomYpixel - topYpixel)
                );
                const y1 = topYpixel + (
                    (maxYValue- y2020)
                    / (maxYValue - minYValue)
                    * (bottomYpixel - topYpixel)
                );
    
                // draw line
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, y0);
                ctx.lineTo(x, y1);
                ctx.lineWidth = 2.0;
                ctx.strokeStyle = '#000000';
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
                position: "average",
                filter: function (x) { return x.datasetIndex !== 0 },
                // itemSort: function (item1, item2) {
                //     return item2.yLabel - item1.yLabel
                // },
                callbacks: {
                    title: function(tooltipItems) {
                        const diff = (
                            parseFloat(tooltipItems.find(x => x.datasetIndex === 2).value)
                            / parseFloat(tooltipItems.find(x => x.datasetIndex === 1).value)
                        ) - 1.0;
                        return shortDate(new Date(tooltipItems[0].xLabel))
                            + ": " + (diff*100).toFixed(1) + "%";
                    },
                    label: function (tooltipItem, data) {
                        return (tooltipItem.datasetIndex === 1 ? " 2019 " : " 2020 ")
                            + "(" + tooltipItem.yLabel.toFixed(1) + "%)" ;
                    },
                    labelColor: function(tooltipItem, chart) {
                        return {
                            borderColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor,
                            backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor
                        };
                    },
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
                            return value                          
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
                            return ["1", "15"].includes(value.split(" ")[1])
                                ? value : undefined;
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
                            return ["1", "15"].includes(value.split(" ")[1])
                                ? true : false;
                        }
                    }
                }]
            }
        }
    });
};


// Adds data to the chart.
function updateApp ({ dataset, category, metro }) {
    // Update UI.
    var data;

    switch (dataset.name) {

        case "postingstrendbycategory": 
            // Chart data.
            data = dataset.data.filter(function(d) {
                return d.category === category;
            }).map(function (d,i) {
                return { x: new Date(d.date), y: d[dataset.yLabel] }
            });

            // UI
            industryForm.style.visibility = "visible";
            chartTitle.innerHTML =
                dataset.title + " in " + category + ", " + directoryIdMap[directory];
            break;

        case "postingstrend":
            // Chart Data.
            var lastDate = dataset.data[dataset.data.length - 1].date;
            data = dataset.data.reduce(function(a,c) {
                const year = c.date.getFullYear();
                const dateCopy = new Date(c.date);
                dateCopy.setFullYear(2020);
                if (
                    dateCopy > lastDate
                    || (
                        dateCopy.getMonth() === 1
                        && dateCopy.getDate() === 29
                    )
                ) {
                    return a
                } else if (year in a) {
                    return {
                        ...a,
                        [year]: a[year].concat({
                            x: dateCopy,
                            y: parseFloat(c[dataset.yLabel])
                        })
                    }
                } else {
                    return {
                        ...a,
                        [year]: [{
                            x: dateCopy,
                            y: parseFloat(c[dataset.yLabel])
                        }]
                    }
                }
            }, {});

            // UI
            industryForm.style.visibility = "hidden";

            break;

        case "postingstrendbymetro":

            // Chart Data.
            var lastDate = dataset.data.map(e => e.date).sort((a,b) => b - a)[0]
            data = dataset.data.filter(element => element.CBSA_Title === metro).reduce(function(a,c) {
                const year = c.date.getFullYear();
                const dateCopy = new Date(c.date);
                dateCopy.setFullYear(2020);
                if (
                    dateCopy > lastDate
                    || (
                        dateCopy.getMonth() === 1
                        && dateCopy.getDate() === 29
                    )
                ) {
                    return a
                } else if (year in a) {
                    return {
                        ...a,
                        [year]: a[year].concat({
                            x: dateCopy,
                            y: parseFloat(c[dataset.yLabel])
                        })
                    }
                } else {
                    return {
                        ...a,
                        [year]: [{
                            x: dateCopy,
                            y: parseFloat(c[dataset.yLabel])
                        }]
                    }
                }
            }, {});
            // UI
            industryForm.style.visibility = "hidden";
            break;
    };

    // UI
    chartTitleDataset.innerHTML =
        dataset.title.split(" ").join("&nbsp;") + ", ";
    chartTitleLocale.innerHTML = metro !== null ?
        metro.split(" ").join("&nbsp;") :
        directoryIdMap[directory].split(" ").join("&nbsp;");
    chartDatesP1.innerHTML = (
        "7 day moving avg through "
        + shortDate(new Date(dataset.data[dataset.data.length - 1].date))
    ).split(" ").join("&nbsp;") + ", ";
    chartDatesP2.innerHTML = (
        "indexed to "
        + shortDate(new Date(dataset.data[0].date))
    ).split(" ").join("&nbsp;");

    // Remove old datasets.
    myChart.data.labels.pop();
    while (myChart.data.datasets.length) {
        myChart.data.datasets.pop();
    }
    myChart.update();

    // Delete key.
    key.innerHTML= "";

    // Init the new dataset.
    Object.keys(data).sort((a,b) => a-b).forEach((year, i) => {
        // Update chart.
        myChart.data.datasets.push({
            label: year,
            data: data[year],
            fill: false,
            borderColor: colors[i],
            borderWidth: 3.0,
            pointRadius: 0,
            pointHoverRadius: ["2020", "2019"].includes(year) ? 5 : 0,
            pointHoverBackgroundColor: colors[i],
            pointHoverBorderColor: "#000000"
        });

        // Update key.
        var keyItem = document.createElement("div");
        keyItem.style.display = "flex";
        keyItem.style.margin = "0px 5px";
        var keyColor = document.createElement("div");
        keyColor.classList.add("color");
        keyColor.style.color = colors[i];
        keyColor.innerHTML = "&#9724;&#xFE0E;";
        var keyYear = document.createElement("div");
        keyYear.classList.add("year");
        keyYear.innerText = year;
        keyItem.appendChild(keyColor);
        keyItem.appendChild(keyYear);
        key.appendChild(keyItem);
    })
    myChart.update();
};


/**
 * Returns array of 
 * @param {*} directory 
 */
function getPossibleDatasets(directory) {
    return [
        // {
        //     name: "New Postings Trend",
        //     title: "New Job Postings on Indeed",
        //     filepath:  "./" + directory + "/" + "YoY_new_postings_trend_ratio_" + directory + ".csv",
        //     data: null,
        //     yLabel: "YoY_pct_change_in_new_postings_trend_from_feb1"
        // },
        // {
        //     name: "Postings Trend",
        //     title: "Job Postings on Indeed",
        //     filepath: "./" + directory + "/" + "YoY_postings_trend_ratio_" + directory + ".csv",
        //     data: null,
        //     yLabel: "YoY_pct_change_in_postings_trend_from_feb1"
        // },
        {
            name: "postingstrend",
            title: "Job Postings on Indeed",
            filepath: "./" + directory + "/" + "postings_category_index_" + directory + ".csv",
            data: null,
            yLabel: "index_to_feb01"
        },
        {
            name: "postingstrendbymetro",
            title: "Job Postings on Indeed by Metro",
            filepath: "./" + directory + "/" + "metro_indexed.csv",
            data: null,
            yLabel: "feb1_index"
        }
    ];
};


/**
 * Populate UI.
 */
function populateUI(datasets, chartName) {
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
            if (dataset.name === "postingstrendbymetro") {
                populateMetrosForm(dataset.data, metrosSelection);
            };
        };
    });

    // Add event listener to data selector.
    // datasetsSelection.addEventListener("change", function() {
    //     for (var i = 0; i < datasets.length; i++) {
    //         if (datasets[i].name === this.value) {
    //             if (datasets[i].name === "Postings Category Trend") {
    //                 state = {
    //                     dataset: datasets[i],
    //                     category: "Accounting"
    //                 }
    //                 updateApp(state);
    //             } else {
    //                 state = {
    //                     dataset: datasets[i],
    //                     category: null
    //                 }
    //                 updateApp(state);
    //             }
    //             break;
    //         };
    //     };
    // });

    // Hide datasetsSelection if chartName is passed in hash.
    switch (chartName) {
        case undefined:
            selectionsContainer.style.display = "none";
            break;
        case "postingstrend":
            selectionsContainer.style.display = "none";
            break;
        case "postingstrendbymetro":
            selectionsContainer.style.display = "flex";
            industryForm.style.display = "none";
            metrosForm.style.display = "block";
            datasetsForm.style.display = "none";
            break;
    }
};

/**
 * 
 * @param {*} data 
 */
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
 * Populate dataset selector.
 * @param {*} data 
 */
function populateMetrosForm(data, form) {
    // Get all unique metros into a set of strings.
    var metrosSet = new Set(data.map(function(d) {
        return d['CBSA_Title'] 
    })); 

    var rtn;

    Array(...metrosSet).sort().forEach(function(metro, i) {
        if (i === 0) { rtn = i }
        var option = document.createElement("option");
        option.value = metro;
        option.innerHTML = metro;
        option.selected = metro === "Austin-Round Rock, TX";
        form.appendChild(option);
    });

    // Add event listener to data selector.
    form.addEventListener("change", function() {
        state = {
            ...state,
            category: null,
            metro: this.value
        }
        updateApp(state);
    });

    return rtn;
}


/**
 * Main
 */
function main () {
    // Init chart.
    initChartJS();

    // Get the hash.
    var hash = window.location.hash;

    // Convert to directory.
    directory = hash.replace("#", "").split("-")[0];

    // Chart
    const chartName =
        hash.split("-").length > 1 ?
        hash.replace("#", "").split("-")[1] :
        null;

    // Init datasets.
    var datasets = getPossibleDatasets(directory);

    // Try reading all possible files from the directory.
    Promise.all(
        datasets.map(function(d) {
            return d3.csv(d.filepath).catch(function(err) { return null });
        })
    ).then(
        function(data) { 
            // Read the data in.
            data.forEach(function(d, i) { datasets[i].data = d });

            // Create a Date object for the date column (labels).
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


            // Update the state of the app.
            state = {
                dataset: datasets.find(d => d.name === chartName),
                category: null,
                metro: chartName === "postingstrendbymetro" ? "Austin-Round Rock, TX" : null
            };

            // Update the UI based on the datasets.
            populateUI(datasets, chartName);

            // Update the app.
            updateApp(state);
        }
    );
};

main();

window.addEventListener("hashchange", function () {
    main();
});
