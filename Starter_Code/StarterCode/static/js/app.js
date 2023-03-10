// create url variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
// Read in json file from url
const dataPromise = d3.json(url).then(function (data) {
    console.log(data);
  });

  
// Drop down menu
function drop_down() {
var dropdownMenu = d3.select("#selDataset");

// Get JSON data 
d3.json(url).then((dataset) => {

    // Assign the value of the dropdown menu option to a variable
    let ID_number = dataset.names;
   
    // // console log to check it works
    console.log(ID_number);

    //  each is a jquery function, forEach is general javascript 
    for (let index = 0; index < ID_number.length; index++) {
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    let dataset = dropdownMenu.property("value");
    dropdownMenu.append('option')
    // 
    .append('option')
    .text(ID_number[index])
    .property('value', ID_number[index])
    };

    // create variable to hold only first id 
    var id_name = ID_number[0]
    graphs(id_name);
    // make sure these functions have the same names as functions 
    demographicInfo(id_name);
});
}

//input information for the demographic information box
function demographicInfo(sample) {

//match the id name selected in the function:
d3.json(url).then(function (dataset) {
    var metadata = dataset.metadata
    var singleData = metadata.filter(object => object.id == sample);
    console.log(singleData)
    var result = singleData[0];

    var PANEL = d3.select("#sample-metadata");
    PANEL.html("");
    // look for alternate code below, causing error, iterating with for each 
    for (key in result){
    PANEL.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
    }; 
});
};

// create graphs function and pass in id variable 
function graphs(id) {

d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {

    // create variable for all samples
    var samplesAll = data.samples;

    // filter samples based on id 
    var samplesFiltered = samplesAll.filter(var1 => var1.id == id);

    // show filtered sampels in console 
    console.log(samplesFiltered)

    // select first item from filtered object 
    var samplesSelect = samplesFiltered[0];

    // Create arrays for sample_values, OTU ids, and OTU labels        
    var sample_values = samplesSelect.sample_values;
    var otu_ids = samplesSelect.otu_ids;
    var otu_labels = samplesSelect.otu_labels;

    console.log(sample_values);

    // sort values to get values highest to lowest
    let values_10 = sample_values.slice(0, 10).reverse();
    console.log(values_10);

    // sort ids to get values highest to lowest
    let ids_10 = otu_ids.slice(0, 10).reverse().map(ids_10 => `OTU ${ids_10}`);
    console.log(ids_10);

    // sort labels to get values highest to lowest
    let labels_10 = otu_labels.slice(0, 10).reverse();
    console.log(labels_10);

    //  create first graph 
    let trace1 = {
    x: values_10,
    y: ids_10,
    text: labels_10,
    type: "bar",
    orientation: 'h',
    width: .75,
    }

    let traceData = [trace1];

    let layout = {
    title: "Top 10 OTUs"
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", traceData, layout);

    // create second graph 
    let trace2 = {
    x: otu_ids,
    y: sample_values,
    mode: 'markers',
    text: otu_labels,
    marker: {
        size: sample_values,
        color: otu_ids
    }
    };

    let traceData2 = [trace2];
    let layout2 = {
    title: "OTU Bubble Chart"
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot('bubble', traceData2, layout2);

});
}

function optionChanged(nextSample) {
// fetch new data each time a new sample is selected 
graphs(nextSample);
demographicInfo(nextSample); 
}

drop_down();
  