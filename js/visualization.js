const margin = { top: 50, right: 50, bottom: 50, left: 200 };
const width = 900; 
const height = 650; 

const svg1 = d3.select("#vis-container")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height]); 

// Plotting 
d3.csv("data/cleanedExoplanetData.csv").then((data) => {

  for (let i = 0; i < 10; i++) { 
    console.log(data[i]);
  }
  

  let x1;
  let xKey1;
  
  // Plot 1
  {

    xKey1 = "radius"
    yKey1 = "eccentricity"

    // Find max x
    let maxX1 = d3.max(data, (d) => { return d[xKey1]; });

    console.log("Max X1: ", maxX1);

    // Create X scale
    x1 = d3.scaleLinear()
        .domain([0,maxX1])
        .range([margin.left, width-margin.right]); 

    // Add x axis 
    svg1.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(x1))   
        .attr("font-size", '20px')
        .call((g) => g.append("text")
            .attr("x", width - margin.right)
            .attr("y", margin.bottom - 4)
            .attr("fill", "black")
            .attr("text-anchor", "end")
            .text(xKey1));

    // Finx max y 
    let maxY1 = d3.max(data, (d) => { return d[yKey1]; });

    console.log("Max Y1: ", maxY1);

    // Create Y scale
    y1 = d3.scaleLinear()
        .domain([0, maxY1])
        .range([height - margin.bottom, margin.top]); 

    // Add y axis 
    svg1.append("g")
        .attr("transform", `translate(${margin.left}, 0)`) 
        .call(d3.axisLeft(y1)) 
        .attr("font-size", '20px') 
        .call((g) => g.append("text")
            .attr("x", 0)
            .attr("y", margin.top)
            .attr("fill", "black")
            .attr("text-anchor", "end")
            .text(yKey1));

    // Add points
    var myCircles1 = svg1.append('g')
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr("id", (d) => d.name)
            .attr("cx", (d) => x1(d[xKey1]))
            .attr("cy", (d) => y1(d[yKey1]))
            .attr("r", 8)
            .style("fill", "blue")
            .style("opacity", 0.5);
  } 
  
          

})                
