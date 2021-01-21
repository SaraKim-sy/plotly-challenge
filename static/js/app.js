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


createBar(940)

// function optionChanged(id) {

// }