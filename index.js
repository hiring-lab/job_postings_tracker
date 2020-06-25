/**
 * Returns array of 
 * @param {*} directory 
 */
function getPossibleDatasets(directory) {
    return [
        {
            name: "newPostingsTrend",
            filepath:  "./" + directory + "/" + "new_postings_trend_" + directory + ".csv",
            data: null
        },
        {
            name: "postingsTrend",
            filepath: "./" + directory + "/" + "postings_category_trend_" + directory + ".csv",
            data: null
        },
        {
            name: "postingsCategoryTrend",
            filepath: "./" + directory + "/" + "new_postings_trend_" + directory + ".csv",
            data: null
        }
    ];
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
    Promise.all(datasets.map(function(d) {
        return d3.csv(d.filepath).catch(function(err) {
            return null 
        });
    }))
        .then(function(data) {
            data.forEach(function(d,i) {
                datasets[i].data = d;
            });

            console.log(datasets);
        });
};

main();
