// Selections
var datasetsSelection = document.querySelector("#datasets");
var datasetsForm = document.querySelector("#datasets-form");
var selectionsContainer = document.querySelector("#selections-container");
var ctx = document.getElementById('myChart');
var chartTitle = document.querySelector("#chart-title");
var chartTitleDataset = document.querySelector("#chart-title-dataset");
var chartTitleLocale = document.querySelector("#chart-title-locale");
var chartDates = document.querySelector("#chart-dates");
var chartDatesP1 = document.querySelector("#chart-dates-p1");
var chartDatesP2 = document.querySelector("#chart-dates-p2");
var key = document.querySelector("#key");

//
var defaultMetros = [
    "Austin-Round Rock--TX",
    "San Francisco-Oakland-Hayward--CA",
    "New York-Newark-Jersey City--NY-NJ-PA"
];
var defaultState = "tx";

// Global vars.
var directory;
var myChart;
var directoryIdMap = {
    AU: "Australia",
    CA: "Canada",
    DE: "Germany",
    FR: "France",
    GB: "UK",
    IE: "Ireland",
    US: "United States"
};
var availableColors = [
    ["#2164F3", 'notInUse'], // indeed blue
    ["#FF6600", 'notInUse'], // Orange
    ["#FFB100", 'notInUse'], // Yellow:
    ["#008040", 'notInUse'], // Green
    ["#CD29C0", 'notInUse'], // Magenta
    ["#551A8B", 'notInUse'],  // Purple: 
    ["#0000CC", 'notInUse'], // Light blue
    ["#99CCFF", 'notInUse']
  ];
var statenames = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
};


function shortDate(date) {
    var months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return months[date.getMonth()] + " " + date.getDate();
}





// Adds data to the chart.
function updateApp({ dataset, category, metro }) {
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
            chartTitleLocale.innerHTML = metro !== null ?
                metro.split(" ").join("&nbsp;") :
                directoryIdMap[directory].split(" ").join("&nbsp;");
            break;

        case "postingstrendbystate":
            // Chart Data.
            var lastDate = dataset.data.map(e => e.date).sort((a,b) => b - a)[0]
            data = dataset.data.filter(element => element.state === metro).reduce(function(a,c) {
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
            chartTitleLocale.innerHTML = metro !== null ?
                statenames[metro.toUpperCase()] :
                directoryIdMap[directory].split(" ").join("&nbsp;");
            break;
        };

    // UI
    chartTitleDataset.innerHTML =
        dataset.title.split(" ").join("&nbsp;") + ", ";

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


function getDatasetsMeta(chartType, directory) {
    switch (chartType) {
        case "postingstrend": 
            return {
                name: "postingstrend",
                title: "Job Postings on Indeed",
                filepath: "./" + directory + "/" + "postings_category_index_" + directory + ".csv",
                data: null,
                yLabel: "index_to_feb01"
            };
        case "postingstrendbymetro":
            return {
                name: "postingstrendbymetro",
                title: "Job Postings on Indeed by Metro",
                filepath: "./" + directory + "/" + "metro_pct_gap_in_trend.csv",
                data: null,
                yLabel: "% gap in trend over last year"
            };
        case "postingstrendbystate":
            return {
                name: "postingstrendbystate",
                title: "Job Postings on Indeed by State",
                filepath: "./" + directory + "/" + "state_indexed.csv",
                data: null,
                yLabel: "US job postings, 2020 vs. 2019, % gap in trend"
            };
    };
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
            switch (dataset.name) {
                case "Postings Category Trend":
                    populateIndustryForm(dataset.data);
                    break;
                case "postingstrendbymetro":
                    populateMetrosForm(dataset.data, metrosSelection);
                    break;
                case "postingstrendbystate":
                    populateStatesForm(dataset.data, statesSelection);
                    break;
                default:
                    null
                    break;
            }
        };
    });

    // Hide datasetsSelection if chartName is passed in hash.
    switch (chartName) {
        case undefined:
            selectionsContainer.style.display = "none";
            break;
        case "postingstrend":
            selectionsContainer.style.display = "none";
            statesForm.style.display = "none";
            metrosForm.style.display = "block";
            break;
        case "postingstrendbymetro":
            selectionsContainer.style.display = "flex";
            industryForm.style.display = "none";
            metrosForm.style.display = "block";
            statesForm.style.display = "none";
            datasetsForm.style.display = "none";
            break;
        case "postingstrendbystate":
            selectionsContainer.style.display = "flex";
            industryForm.style.display = "none";
            statesForm.style.display = "block";
            metrosForm.style.display = "none";
            datasetsForm.style.display = "none";
            break;
    }
};


/**
 * STATE CHART
 */
function initChart() {

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
                        maxTicksLimit: 1000,
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

/**
 * METROS CHART
 */
function initChartMetros() {
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
                position: "average",
                itemSort: (item1, item2) => { return item2.yLabel - item1.yLabel },
                callbacks: {
                    title: function(tooltipItems) {
                        return shortDate(new Date(tooltipItems[0].xLabel));;
                    },
                    label: function (tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label;
                        label =  label.length > 15 ? label.substring(0,12) + "..." : label;
                        return label + " (" + tooltipItem.yLabel.toFixed(1) + "%)" ;
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
                        maxTicksLimit: 1000,
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

function updateAppMetro(data, metaData, metros) {
    // Styling for the state.
    chartTitleLocale.innerHTML = metros.length === 1 ? metros[0] : "Selected Metros";
    chartTitleDataset.innerHTML = metaData.title.split(" ").join("&nbsp;") + ", ";
    if (metros.length) {
        chartDatesP1.innerHTML = (
            "7 day moving avg through "
            + shortDate(new Date(data[metros[0]][data[metros[0]].length - 1].date))
        ).split(" ").join("&nbsp;") + ", ";
        chartDatesP2.innerHTML = (
            "indexed to "
            + shortDate(new Date(data[metros[0]][0].date))
        ).split(" ").join("&nbsp;");    
    };

    // Swap old with new datasets.
    myChart.data.labels.pop();
    while (myChart.data.datasets.length) { myChart.data.datasets.pop() };
    for (var i = 0; i < metros.length; i++) {
        myChart.data.datasets.push({
            label: metros[i],
            data: data[metros[i]].map(e => ({ x: e.date, y: e[metaData.yLabel]})),
            fill: false,
            borderColor: availableColors[i][0],
            borderWidth: 3.0,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: availableColors[i][0],
            pointHoverBorderColor: "#000000"
        });

        // Update colors.
        $(".tag")
            .filter(function() { return this.innerText == metros[i]; })
            .css('background-color', availableColors[i][0]);
    };
    myChart.update();
};

function handlePostingsTrendByMetro(data, metaData, defaultMetros) {
    // Chart.
    initChartMetros();

    // Style.
    $(".postingsTrendByMetro").css('display','block');
    var keyItem = document.createElement("div");
    keyItem.style.display = "flex";
    keyItem.style.margin = "0px 5px";
    var keyColor = document.createElement("div");
    keyColor.classList.add("color");
    keyColor.style.color = availableColors[0][0];
    keyColor.innerHTML = "&#9724;&#xFE0E;";
    var keyYear = document.createElement("div");
    keyYear.classList.add("year");
    keyYear.innerText = "2020";
    keyItem.appendChild(keyColor);
    keyItem.appendChild(keyYear);
    key.appendChild(keyItem);

    // Hash the data by metro.
    var dataByMetro = {};
    for (var row of data) {
        row["CBSA_Title"].replace(", ", "--") in dataByMetro ? 
            dataByMetro[row["CBSA_Title"].replace(", ", "--")].push(row) :
            dataByMetro[row["CBSA_Title"].replace(", ", "--")] = [row];
    };

    // Sets the options for the typeahead input.
    $('.tagsinput-typeahead').tagsinput({
        typeahead: {
            source: Object.keys(dataByMetro),
            limit: 3,
            afterSelect: function() {
                this.$element[0].value = '';
            }
        }
    });

    // Update and listen for updates.
    updateAppMetro(dataByMetro, metaData, defaultMetros);
    defaultMetros.forEach((m,i) => {
        $('.tagsinput-typeahead').tagsinput('add', m);
        $(".tag")
            .filter(function() { return this.innerText == m; })
            .css('background-color', availableColors[i][0]);
    });
    $('.tagsinput-typeahead').change(function() {    
        updateAppMetro(
            dataByMetro,
            metaData,
            $('.tagsinput-typeahead').tagsinput('items'),
        );
    });
};


/**
 * STATE CHART
 */
function initChartState() {
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
                position: "average",
                callbacks: {
                    title: function(tooltipItems) {
                        return shortDate(new Date(tooltipItems[0].xLabel));
                    },
                    label: function (tooltipItem, data) {
                        return"(" + tooltipItem.yLabel.toFixed(1) + "%)" ;
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
                        maxTicksLimit: 1000,
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

function updateAppState(data, metaData, state) {
    // Styling for the state.
    chartTitleLocale.innerHTML = statenames[state.toUpperCase()];
    chartTitleDataset.innerHTML = metaData.title.split(" ").join("&nbsp;") + ", ";
    chartDatesP1.innerHTML = (
        "7 day moving avg through "
        + shortDate(new Date(data[data.length - 1].date))
    ).split(" ").join("&nbsp;") + ", ";
    chartDatesP2.innerHTML = (
        "indexed to "
        + shortDate(new Date(data[0].date))
    ).split(" ").join("&nbsp;");

    // Swap old with new datasets.
    myChart.data.labels.pop();
    while (myChart.data.datasets.length) { myChart.data.datasets.pop() };
    myChart.data.datasets.push({
        label: "2020",
        data: data
            .filter(e => e.state === state)
            .sort((a,b) => a.date - b.date)
            .map(e => ({ x: e.date, y: e[metaData.yLabel]})),
        fill: false,
        borderColor: availableColors[0][0],
        borderWidth: 3.0,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: availableColors[0][0],
        pointHoverBorderColor: "#000000"
    });
    myChart.update();
};

function handlePostingsTrendByState(data, metaData, defaultState) {
    // Chart.
    initChartState();

    // Styling.
    $(".postingsTrendByState").css("display", "block");
    var statesSelection = document.querySelector("#states");
    var keyItem = document.createElement("div");
    keyItem.style.display = "flex";
    keyItem.style.margin = "0px 5px";
    var keyColor = document.createElement("div");
    keyColor.classList.add("color");
    keyColor.style.color = availableColors[0][0];
    keyColor.innerHTML = "&#9724;&#xFE0E;";
    var keyYear = document.createElement("div");
    keyYear.classList.add("year");
    keyYear.innerText = "2020";
    keyItem.appendChild(keyColor);
    keyItem.appendChild(keyYear);
    key.appendChild(keyItem);

    // Get all unique metros into a set of strings, init selections.
    var statesSet = new Set(data.map(function(d) { return d['state'] })); 
    Array(...statesSet).sort().forEach(function(state, i) {
        var option = document.createElement("option");
        option.value = state;
        option.innerHTML = statenames[state.toUpperCase()];
        option.selected = state === defaultState;
        statesSelection.appendChild(option);
    });

    // Update and listen for updates.
    updateAppState(data, metaData, defaultState);
    statesSelection.addEventListener("change", function() {
        updateAppState(data, metaData, this.value);
    });
};


/**
 * Main
 */
function main () {
    // Get directory and chart names from hash.
    var hash = window.location.hash;
    directory = hash.replace("#", "").split("-")[0];
    const chartName =
        hash.split("-").length > 1 ?
        hash.replace("#", "").split("-")[1] :
        null;

    // Get meta data.
    var metaData = getDatasetsMeta(chartName, directory);

    // Try reading in the data.
    d3.csv(metaData.filepath)
        .catch(function(err) { console.log(err); return null })
        .then(function(data) { 
            // Create a Date object for the date column (labels).
            dataset = data.map(function(data) {
                var newDate = new Date(data.date);
                return {
                    ...data,
                    date: new Date(
                        newDate.getTime()
                        + Math.abs(newDate.getTimezoneOffset()*60000)
                    )
                };
            });

            // Handle the data by chart type.
            switch(chartName) {
                case "postingstrendbymetro":
                    handlePostingsTrendByMetro(dataset, metaData, defaultMetros);
                    break;
                case "postingstrendbystate":
                    handlePostingsTrendByState(dataset, metaData, defaultState);
                    break;
                case "postingstrend":
                    handlePostingsTrend(dataset, metaData);
                    break;
                default:
                    break;
            };
        }
    );


    // Promise.all(
    //     datasets.map(function(d) {
    //         return d3.csv(d.filepath).catch(function(err) { return null });
    //     })
    // ).then(
    //     function(data) { 
    //         // Read the data in.
    //         data.forEach(function(d, i) { datasets[i].data = d });

    //         // Create a Date object for the date column (labels).
    //         datasets = datasets.map(function(dataset) {
    //             return {
    //                 ...dataset,
    //                 data: dataset.data === null ? null : dataset.data.map(function(data) {
    //                     var newDate = new Date(data.date);
    //                     return {
    //                         ...data,
    //                         date: new Date(
    //                             newDate.getTime()
    //                             + Math.abs(newDate.getTimezoneOffset()*60000)
    //                         )
    //                     }
    //                 })
    //             }
    //         })


    //         // Update the state of the app.
    //         state = {
    //             dataset: datasets.find(d => d.name === chartName),
    //             category: null,
    //             metro:  (() => {
    //                 switch (chartName) {
    //                     case "postingstrendbymetro":
    //                         return "Austin-Round Rock, TX"
    //                     case "postingstrendbystate":
    //                         return "tx"
    //                     default:
    //                         return null
    //                 }
    //             })()
    //         };

    //         // Update the UI based on the datasets.
    //         populateUI(datasets, chartName);

    //         // Update the app.
    //         updateApp(state);
    //     }
    // );
};

main();
window.addEventListener("hashchange", function () { main() });
