const margin = { top: 50, right: 50, bottom: 50, left: 200 };
const width = 900; 
const height = 650; 

// defines the first svg scatter plot
const svg1 = d3.select("#vis-container")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height]);
                 
// defines the second svg scatter plot
const svg2 = d3.select("#vis-container")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height])
                .call( d3.brush() 
                    .extent([[margin.left, margin.top], [width + margin.left, height + margin.top ]]));
                    

// Plotting 
d3.csv("data/cleanedExoplanetData.csv").then((data) => {
  
  // defines all global constants in plotting
  let x1, x2, y1, y2;
  let xKey1, yKey1, xKey2, yKey2;
  let brush1, brush2;
  let myCircles1, myCircles2;
  
    // Plot 1
    {
        xKey1 = "radius"
        yKey1 = "eccentricity"

        // Find max x
        let maxX1 = d3.max(data, (d) => { return d[xKey1]; });

        // Create X scale
        x1 = d3.scaleLinear()
            .domain([0, maxX1])
            .range([margin.left, width-margin.right]); 

        // Add x axis 
        svg1.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`) 
            .call(d3.axisBottom(x1))   
            .attr("font-size", '20px')
            .call((g) => g.append("text")
                .attr("x", width - margin.right)
                .attr("y", margin.bottom)
                .attr("fill", "black")
                .attr("text-anchor", "end")
                .text(xKey1));


        // Find max y 
        let maxY1 = d3.max(data, (d) => { return d[yKey1]; });

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
        myCircles1 = svg1.append('g')
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
                .attr("id", (d) => d.name)
                .attr("cx", (d) => x1(d[xKey1]))
                .attr("cy", (d) => y1(d[yKey1]))
                .attr("r", 8)
                .style("fill", "blue") // TODO: ADD COLORS
                .style("opacity", 0.5);

       // initialize the brush
       brush1 = d3.brush().extent([[0, 0], [width, height]])
       
       // call the brush for the first scatterplot
       svg1.call(brush1
            .on("start", clear)
            .on("brush", updateChart1)
        );
             
    } 

    // Plot 2
    {
        xKey2 = "mass"
        yKey2 = "eccentricity"

        // Find max x
        let maxX2 = d3.max(data, (d) => { return d[xKey2]; });

        // Create X scale
        x2 = d3.scaleLinear()
            .domain([0,maxX2])
            .range([margin.left, width-margin.right]); 

        // Add x axis 
        svg2.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`) 
            .call(d3.axisBottom(x2))   
            .attr("font-size", '20px')
            .call((g) => g.append("text")
                .attr("x", width - margin.right)
                .attr("y", margin.bottom)
                .attr("fill", "black")
                .attr("text-anchor", "end")
                .text(xKey2));

        // Find max y 
        let maxY2 = d3.max(data, (d) => { return d[yKey2]; });

        // Create Y scale
        y2 = d3.scaleLinear()
            .domain([0, maxY2])
            .range([height - margin.bottom, margin.top]); 

        // Add y axis 
        svg2.append("g")
            .attr("transform", `translate(${margin.left}, 0)`) 
            .call(d3.axisLeft(y2)) 
            .attr("font-size", '20px') 
            .call((g) => g.append("text")
                .attr("x", 0)
                .attr("y", margin.top)
                .attr("fill", "black")
                .attr("text-anchor", "end")
                .text(yKey2));

        // Add points
        myCircles2 = svg2.append('g')
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
                .attr("id", (d) => d.name)
                .attr("cx", (d) => x1(d[xKey2]))
                .attr("cy", (d) => y1(d[yKey2]))
                .attr("r", 8)
                .style("fill", "blue") // TODO: ADD COLORS
                .style("opacity", 0.5);

        // initialize the brush for the second scatterplot
        brush2 = d3.brush().extent([[0, 0], [width, height]])
        
        // call the second brush on the second scatterplot
        svg2.call(brush2
                .on("start", clear)
                .on("brush", updateChart2)
        );
    }

     // Call to remove existing brushes 
    function clear() {
        svg1.call(brush1.move, null);
        svg2.call(brush2.move, null);
    }

    // Call when Scatterplot1 is brushed  
    function updateChart1(brushEvent) {
        // Find coordinates of brushed region 
        extent = brushEvent.selection;

        // Give bold outline to all points within the brush region in Scatterplot1
        myCircles1.classed("selected", function (d) {
            return isBrushed(extent, x1(d.radius), y1(d.eccentricity))
        });

        // Give bold outline to all points in Scatterplot2 corresponding to points within the brush region in Scatterplot1
        myCircles2.classed("selected", function (d) {
            return isBrushed(extent, x1(d.radius), y1(d.eccentricity))
        });
    }

    // Call when Scatterplot2 is brushed 
    function updateChart2(brushEvent) {
        // Find coordinates of brushed region
        extent = brushEvent.selection;

        // Give bold outline to all points within the brush region in Scatterplot1
        myCircles1.classed("selected", function (d) {
            return isBrushed(extent, x2(d.mass), y2(d.eccentricity));
        });

        // Give bold outline to all points within the brush region in Scatterplot2 
        myCircles2.classed("selected", function (d) {
            return isBrushed(extent, x2(d.mass), y2(d.eccentricity));
        });
    }
  

  //Finds dots within the brushed region
  function isBrushed(brush_coords, cx, cy) {
    if (brush_coords == null) return;

    let x0 = brush_coords[0][0],
      x1 = brush_coords[1][0],
      y0 = brush_coords[0][1],
      y1 = brush_coords[1][1];
    return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1; // This return TRUE or FALSE depending on if the points is in the selected area
    }
});                
