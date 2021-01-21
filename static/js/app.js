// Step1: Plotly - function to create a horizontal bar chart 
function createBar(id) {

    d3.json('data/samples.json').then(data => {
        var selected = data.samples.filter(sample => sample.id == id)[0];
        console.log(selected)
        
        var sampleValues = selected.sample_values.slice(0, 10).reverse();
        var otuIds = selected.otu_ids.slice(0, 10).map(item => `OTU ${item}`).reverse();
        var hoverText = selected.otu_labels.slice(0, 10).reverse();

        var trace1 = {
            x: sampleValues,
            y: otuIds,
            text: hoverText,
            type: "bar",
            orientation: "h",
            marker: {
                color: 'rgb(142,124,195)'
            }
        };

        var data = [trace1];

        var layout = {
            title: `Top 10 OTUs Found in Individual id ${id}`,
            font:{
                family: 'Raleway, sans-serif'
              }
            };

        Plotly.newPlot("bar", data, layout);
    });
            
};

// Step1: Plotly - function to create a bubble chart
function createBubble(id) {
    
    d3.json('data/samples.json').then(data => {
        var selected = data.samples.filter(sample => sample.id == id)[0];

        var sampleValues = selected.sample_values; // y values, marker size
        var otuIds = selected.otu_ids; // x values, marker colors 
        var labels = selected.otu_labels; // text values

        // Test
        // console.log(sampleValues, otuIds, labels);

        var trace1 = {
            x: otuIds,
            y: sampleValues,
            mode: 'markers',
            marker: {
                size: sampleValues,
                color: otuIds
            }
        };

        var data = [trace1];

        var layout = {
            xaxis: { title: "OTU ID"}
        };

        Plotly.newPlot("bubble", data, layout);

    });
};

// function to display the sample matadata - individual's demographic information
function displayDemographic(id) {
    d3.json('data/samples.json').then(data => {
        var selected = data.metadata.filter(individual => individual.id == id)[0];

        // Test
        console.log(selected);

    var panelBody = d3.select("#sample-metadata");
    Object.entries(selected).forEach( ([key, value]) => {
        var row = panelBody.append("p");
        row.text(`${key}: ${value}`);
    });
    });

};





createBar(940);
createBubble(940);
displayDemographic(940);

// function optionChanged(id) {

// }