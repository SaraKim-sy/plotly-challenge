// dropdown menu
let dropdownMenu = d3.select("#selDataset");

d3.json('data/samples.json').then(data => { 

    // List of Test Subject IDs
    let idOptions = data.names

    // Populate dropdowns selections
    idOptions.forEach( id => dropdownMenu.append("option").text(id) );

    // Look for the first id to display in the first page
    firstId = idOptions[0]

    // Test
    console.log(firstId);

    // Create charts and demographic information for the first page
    createBar(firstId)
    createBubble(firstId);
    displayDemographic(firstId);
    createGuage(firstId);
 });
 

// Function called by DOM changes
function optionChanged(id) {
    createBar(id);
    createBubble(id);
    displayDemographic(id);
    createGuage(id);
};

// Plotly - function to create a horizontal bar chart 
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
            title: `Top 10 OTUs Found in Test Subject ID No.${id}`,
            xaxis: {title: "Value"},
            font:{
                family: 'Raleway, sans-serif'
              }

            };

        Plotly.newPlot("bar", data, layout);
    });
            
};

// Plotly - function to create a bubble chart
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
            text: labels,
            mode: 'markers',
            marker: {
                size: sampleValues,
                color: otuIds
            }
        };

        var data = [trace1];

        var layout = {
            title : `OTUs Found in Test Subject ID No.${id}`, 
            xaxis: { title: "OTU ID" },
            yaxis: { title: "Value" }
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
    
    // To get the new panel with selected id data, clear the panel
    panelBody.html("");
    
    // Use `Object.entries` and d3 to append <p> and update value per each key and value
    Object.entries(selected).forEach( ([key, value]) => {
        var row = panelBody.append("p");
        row.text(`${key}: ${value}`);
    });
    });
};

// Optional: function to create a gauge chart
function createGuage(id) {
    d3.json('data/samples.json').then(data => {
        var selected = data.metadata.filter(individual => individual.id == id)[0];

        // Test
        console.log(selected)

        var data = [
            {
              type: "indicator",
              mode: "gauge+number",
              value: selected.wfreq,
              title: { text: "Belly Button Washing Frequency<br>Scrubs per Week<br>", 
                        font: { size: 20, color: "black" } 
                    },
              gauge: {
                axis: { range: [null, 9], tickwidth: 1, tickcolor: "#E73F64" },
                bar: { color: "#E73F64" },
                bgcolor: "white",
                borderwidth: 1,
                bordercolor: "a300bf",
                steps: [
                  { range: [0, 1], color: "#E9DBF0" },
                  { range: [1, 2], color: "#ddb7e8" },
                  { range: [2, 3], color: "#d292e0" },
                  { range: [3, 4], color: "#cc80dc" },
                  { range: [4, 5], color: "#c66ed7" },
                  { range: [5, 6], color: "#ba49cf" },
                  { range: [6, 7], color: "#af25c7" },
                  { range: [7, 8], color: "#a912c3" },
                  { range: [8, 9], color: "#a300bf" }
                ],
              }
            }
          ];
          
          var layout = {
            margin: { t: 25, r: 25, l: 25, b: 25 },
            font: { color: "#a300bf", family: "Arial" }
          };
          
          Plotly.newPlot('gauge', data, layout);
    });
};

