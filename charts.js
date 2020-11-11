// Selections
var chartContainer = document.querySelector(".chart-container");

function shortDate(date) {
    var months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return months[date.getMonth()] + " " + date.getDate();
}


/**
 * METROS CHART
 */
function initChartMetro() {
    // Clear out existing chart.
    chartContainer.innerHTML = null;
    var canvas = document.createElement("canvas");
    canvas.id = "myChart";
    chartContainer.appendChild(canvas);
    var ctx = document.getElementById('myChart');

    // Extend chart.
    Chart.defaults.global.defaultFontFamily = 'Noto Sans';
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
    return new Chart(ctx, {
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
                        padding: 5,
                        beginAtZero: false,
                        autoSkip: false,
                        callback: function(value, index, values) {
                            return value.toString() + "%";
                        }
                    },
                    gridLines: {
                        display: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        padding: 10,
                        fontStyle: "bold",
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
                        zeroLineColor: 'rgba(0, 0, 0, 0.1)',
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
 * STATE CHART
 */
function initChartState() {
    // Clear out existing chart.
    chartContainer.innerHTML = null;
    var canvas = document.createElement("canvas");
    canvas.id = "myChart";
    chartContainer.appendChild(canvas);
    var ctx = document.getElementById('myChart');

    // Extend chart.
    Chart.defaults.global.defaultFontFamily = 'Noto Sans';
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
    return new Chart(ctx, {
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
                        return label.toUpperCase() + " (" + tooltipItem.yLabel.toFixed(1) + "%)" ;
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
                        padding: 5,
                        beginAtZero: false,
                        autoSkip: false,
                        callback: function(value, index, values) {
                            return value.toString() + "%";
                        }
                    },
                    gridLines: {
                        display: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        padding: 10,
                        fontStyle: "bold",
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
                        zeroLineColor: 'rgba(0, 0, 0, 0.1)',
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
 * STATE CHART
 */
function initChartNational() {
    // Clear out existing chart.
    chartContainer.innerHTML = null;
    var canvas = document.createElement("canvas");
    canvas.id = "myChart";
    chartContainer.appendChild(canvas);
    var ctx = document.getElementById('myChart');

    // Extend chart.
    Chart.defaults.global.defaultFontFamily = 'Noto Sans';
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
    return new Chart(ctx, {
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
                        label = label.split("_").join(" ");
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
                        padding: 5,
                        beginAtZero: false,
                        autoSkip: false,
                        callback: function(value, index, values) {
                            return value.toString() + "%";
                        }
                    },
                    gridLines: {
                        display: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        padding: 10,
                        fontStyle: "bold",
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
                        zeroLineColor: 'rgba(0, 0, 0, 0.1)',
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
 * STATE CHART
 */
function initChartCountry() {
    // Clear out existing chart.
    chartContainer.innerHTML = null;
    var canvas = document.createElement("canvas");
    canvas.id = "myChart";
    chartContainer.appendChild(canvas);
    var ctx = document.getElementById('myChart');

    // Extend chart.
    Chart.defaults.global.defaultFontFamily = 'Noto Sans';
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
    return new Chart(ctx, {
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
                        padding: 5,
                        beginAtZero: false,
                        autoSkip: false,
                        callback: function(value, index, values) {
                            return value.toString() + "%";
                        }
                    },
                    gridLines: {
                        display: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        padding: 10,
                        fontStyle: "bold",
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
                        zeroLineColor: 'rgba(0, 0, 0, 0.1)',
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
