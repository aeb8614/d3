var svgWidth = 900;
var svgHeight = 500;

var margin = { top: 20, right: 40, bottom: 80, left: 100 };

// chart area minus margins
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;

// create svg container
var svg = d3.select("#svg-area").append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// shift everything over by the margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Retrieve data from the CSV file and execute everything below
d3.csv("data.csv", function(error, myData) {
  if (error) throw error;

  myData.forEach(function(data) {
    data.x_f_bachelor = Number(data.x_f_bachelor);
    data.y_birth_rate = Number(data.y_birth_rate);
  });

  console.log(myData);

  // Create scale functions
var yScale = d3.scaleLinear()
  .domain([0, d3.max(dataArray)])
  .range([chartHeight, 0]);

var xScale = d3.scaleBand()
  .domain(dataCategories)
  .range([0, chartWidth])
  .padding(0.05);

// create axes
var yAxis = d3.axisLeft(yScale);
var xAxis = d3.axisBottom(xScale);

  
  var xMin;
  var xMax;
  var yMax;

  
  function findMinAndMax(dataColumnX) {

    xMax = d3.max(myData, function(data) {
      return Number(data.x_f_bachelor) * 1.1;
    });

    yMax = d3.max(myData, function(data) {
      return Number(data.y_birth_rate) * 1.1;
    });
  }

  
  var LabelX = "Percent of Women who have a Bachelor Degree";

  var LabelY = "Percent of Women who gave Birth in Past Year";

  writeAnalysis(LabelX, LabelY);

  
  xLinearScale.domain([0, xMax]);
  yLinearScale.domain([0, yMax]);

  // Initializes tooltip
  var toolTip = d3
    .tip()
    .attr("class", "tooltip")
    // Define position
    .offset([80, -60])
    // The html() method allows mix of JS and HTML in callback function
    .html(function(data) {
      var itemName = data.state;
      var itemEdu = Number(data.x_f_bachelor);
      var itemInfo = Number(data.y_birth_rate);
      var itemString;

  // Create tooltip
  chart.call(toolTip);

  chart
    .selectAll("circle")
    .data(myData)
    .enter()
    .append("circle")
    .attr("cx", function(data, index) {
      return xLinearScale(Number(data.x_f_bachelor));
    })
    .attr("cy", function(data, index) {
      return yLinearScale(Number(data.y_birth_rate));
    })
    .attr("r", "12")
    .attr("fill", "lightblue")
    // Both circle and text instances have mouseover & mouseout event handlers
    .on("mouseover", function(data) {
      toolTip.show(data)})
    .on("mouseout", function(data) {
      toolTip.hide(data)});

  chart
    .selectAll("text")
    .data(myData)
    .enter()
    .append("text")
    .attr("text-anchor", "middle")
    .attr("class","stateText")
    .style("fill", "white")
    .style("font", "10px sans-serif")
    .style("font-weight", "bold")
    .text(function(data) {
      return data.abbr;})
    .on("mouseover", function(data) {
      toolTip.show(data)})
    .on("mouseout", function(data) {
      toolTip.hide(data)})
    .attr("x", function(data, index) {
      return xLinearScale(Number(data.x_f_bachelor));
    })
    .attr("y", function(data, index) {
      return yLinearScale(Number(data.y_birth_rate))+4;
    });
});

