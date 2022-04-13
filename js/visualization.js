const margin = { top: 50, right: 50, bottom: 50, left: 200 };
const width = 900; 
const height = 650; 
const yTooltipOffset = 15; 

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

// defines the third svg histogram
const svg3 = d3.select("#vis-container")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height])

// defines the fourth svg histogram
const svg4 = d3.select("#vis-container")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height])

// Add div for tooltip to webpage
const tooltip1 = d3.select("#vis-container") 
  .append("div") 
  .attr('id', "tooltip1") 
  .style("opacity", 0) 
  .attr("class", "tooltip"); 

// Add values to tooltip on mouseover, make tooltip div opaque  
const mouseover= function(event, d) {
  tooltip1.html("Name: " + d.name +  "<br> Radius: " + d.radius + "<br>"
     + "<br> Mass: " + d.mass + "<br>" + "<br> Orbital Period: " + d.orbital_period + "<br>" 
     + "<br> Eccentricity: " + d.eccentricity + "<br>" + "<br> Discovery Year: " + d.discovered + "<br>")
     .style("opacity", 1);  
}

// Position tooltip to follow mouse 
const mousemove = function(event, d) {
  tooltip1.style("left", (event.pageX)+"px") 
      .style("top", (event.pageY + yTooltipOffset)+"px"); 
}

// Return tooltip to transparant when mouse leaves
const mouseleave = function(event, d) { 
  tooltip1.style("opacity", 0); 
}
                    

d3.csv("data/cleanedExoplanetData2.csv").then((data) => {

    let max = d3.max(data, (d) => { return d[xKey2]; });
    console.log("MAX X 2: " + max)
}

// Plotting 
d3.csv("data/cleanedExoplanetData.csv").then((data) => {

  let x1, x2, x3, y1, y2, y3;
  let xKey1, yKey1, xKey2, yKey2, xKey3;
  
  let brush1, brush2;
  let myCircles1, myCircles2;

  // colors for the years of discovery
  let myColor = d3.scaleSequential().domain([2010, 
    1995, 2004, 2007, 2011, 2008, 2009, 2006, 2012,
    2000, 2005, 1999, 2001, 2002, 1996])
    .interpolator(d3.interpolateViridis);
  
    // Plot 1
    {

        xKey1 = "radius"
        yKey1 = "eccentricity"

        // Find max x
        let maxX1 = d3.max(data, (d) => { return d[xKey1]; });

        // Set min x
        let minX1 = 0;

        // Create X scale
        x1 = d3.scaleLinear()
            .domain([minX1, maxX1])
            .range([margin.left, width-margin.right]); 
        
        // Adds a title to the visualization
        svg1.append("g")
             .attr("transform", `translate(10,${(margin.top/2) - 50 })`) 
            .call((g) => g.append("text")
                .attr("x", width/2)             
                .attr("y", margin.top)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-size", "35px")
                .text("Eccentricity of Exoplanet's Orbit vs Exoplanet's Radius"));

        // Add x axis 
        var xAxis1 = svg1.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`) 
            .call(d3.axisBottom(x1))   
            .attr("font-size", '20px')
            .attr("color", "black")
            .call((g) => g.append("text")
                .attr("x", width - margin.right)
                .attr("y", margin.bottom)
                .attr("fill", "black")
                .attr("text-anchor", "end")
                .text("radius (Jupiters)"));


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
            .attr("color", "black")
            .call((g) => g.append("text")
                .attr("x", 0)
                .attr("y", margin.top)
                .attr("fill", "black")
                .attr("text-anchor", "end")
                .text(yKey1));
        
       // initialize the brush
       brush1 = d3.brush().extent([[0, 0], [width, height]])
       
       // call the brush for the first scatterplot
       svg1.call(brush1
            .on("start", clear)
            .on("brush", updateChart1)
        );
          
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
                .attr("fill", function(d){return myColor(d.discovered) })
                .style("opacity", 0.75)
                .on("mouseover", mouseover)
                .on("mousemove", mousemove)
                .on("mouseleave", mouseleave);

    } 

    // Plot 2
    {
        xKey2 = "mass"
        yKey2 = "eccentricity"

        // Find max x
        let maxX2 = d3.max(data, (d) => { return d[xKey2]; });
        //console.log("MAX X 2: " + maxX2)
        
        // Set min x 
        let minX2 = 0;

        // Create X scale
        x2 = d3.scaleLinear()
            .domain([minX2,maxX2])
            .range([margin.left, width-margin.right]); 

        // Add a title for the visualization
        svg2.append("g")
            .attr("transform", `translate(${width/2 - margin.left - 200}, ${margin.top/2 - 50})`) 
            .call((g) => g.append("text")
               .attr("x", width/2)             
               .attr("y", margin.top)
               .attr("fill", "black")
               .attr("text-anchor", "middle")
               .attr("font-size", "35px")
               .text("Eccentricity of Exoplanet's Orbit vs Exoplanet's Mass"));

        // Add x axis 
        var xAxis2 = svg2.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`) 
            .call(d3.axisBottom(x2))   
            .attr("font-size", '20px')
            .attr("color", "black")
            .call((g) => g.append("text")
                .attr("x", width - margin.right)
                .attr("y", margin.bottom)
                .attr("fill", "black")
                .attr("text-anchor", "end")
                .text("mass (Jupiters)"));

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
            .attr("color", "black")
            .call((g) => g.append("text")
                .attr("x", 0)
                .attr("y", margin.top)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .text(yKey2));

        // Add points
        myCircles2 = svg2.append('g')
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
                .attr("id", (d) => d.name)
                .attr("cx", (d) => x2(d[xKey2]))
                .attr("cy", (d) => y2(d[yKey2]))
                .attr("r", 8)
                .attr("fill", function(d){return myColor(d.discovered) })
                .style("opacity", 0.75)
                .on("mouseover", mouseover)
                .on("mousemove", mousemove)
                .on("mouseleave", mouseleave);
        
        // initialize the brush for the second scatterplot
        brush2 = d3.brush().extent([[0, 0], [width, height]])

        // call the second brush on the second scatterplot
        svg2.call(brush2
            .on("start", clear)
            .on("brush", updateChart2)
        );        
    }

    // Plot 3
    {
        xKey3 = "mass"

        // Find max x
        let maxX3 = d3.max(data, (d) => { return d[xKey3]; });

        // Finx max y 
        let maxY3 = 76;

        const thresholds = d3.range(maxX3 + 1)
        const binner = d3.bin().value(d=>d[xKey3]).thresholds(thresholds).domain([0,maxX3])
        const binned = binner(data)
        const medians = binned.map(bin => {
            return {
                medianMass: d3.median(bin, b=>b[xKey3]),
                dataPoints: bin.length,
                bucketMin: bin.x0,
                bucketMax: bin.x1
            }
        })

        // Create y scale   
        let y3 = d3.scaleLinear()
            .domain([0,maxY3])
            .range([height-margin.bottom,margin.top]); 

        // Create x scale
        let x3 = d3.scaleBand()
            .domain(d3.range(medians.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

        // Add x axis 
        svg3.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`) 
            .call(d3.axisBottom(x3))   
            .attr("font-size", '20px')
            .attr("color", "black")
            .call((g) => g.append("text")
                .attr("x", width - margin.right)
                .attr("y", margin.bottom)
                .attr("fill", "black")
                .attr("text-anchor", "end")
                .text(xKey3)); 

        // Add y axis 
        svg3.append("g")
            .attr("transform", `translate(${margin.left}, 0)`) 
            .call(d3.axisLeft(y3)) 
            .attr("font-size", '20px') 
            .attr("color", "black")
            .call((g) => g.append("text")
                .attr("x", 0)
                .attr("y", 0)
                .attr("fill", "black")
                .attr("text-anchor", "end")
                .text("frequency"));
           
        bars1 = svg3.selectAll(".bar")
                .data(medians)
                .enter()
                .append("rect") 
                 .attr("class", "bar") 
                 .attr("x", (d,i) => x3(i)) 
                 .attr("y", (d) => y3(d.dataPoints)) 
                 .attr("height", (d) => height - margin.bottom - (y3(d.dataPoints)))  
                 .attr("width", x3.bandwidth())
                 .style("fill", "green")    
                 .on("mouseover", mouseover)
                 .on("mousemove", mousemove)
                 .on("mouseleave", mouseleave);  
    }

    // Plot 4 
    {
        xKey4 = "radius"

        // Find max x
        let maxX4 = d3.max(data, (d) => { return d[xKey4]; });

        const thresholdsRadius = d3.range(maxX4)
        const binnerRadius = d3.bin().value(d=>d[xKey4]).thresholds(thresholdsRadius).domain([0,maxX4])
        const binnedRadius = binnerRadius(data)
        const mediansRadius = binnedRadius.map(bin => {
            return {
                medianRadius: d3.median(bin, b=>b[xKey4]),
                dataPoints: bin.length,
                bucketMin: bin.x0,
                bucketMax: bin.x1

            }
        })

        // Find max y 
        let maxY4 = 110;

        // Create y scale   
        let y4 = d3.scaleLinear()
            .domain([0,maxY4])
            .range([height-margin.bottom,margin.top]); 

        // Create x scale
        let x4 = d3.scaleBand()
            .domain(d3.range(mediansRadius.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

        // Add x axis 
        svg4.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`) 
            .call(d3.axisBottom(x4))   
            .attr("font-size", '20px')
            .attr("color", "black")
            .call((g) => g.append("text")
                .attr("x", width - margin.right)
                .attr("y", margin.bottom)
                .attr("fill", "black")
                .attr("text-anchor", "end")
                .text(xKey4)); 

        // Add y axis 
        svg4.append("g")
            .attr("transform", `translate(${margin.left}, 0)`) 
            .call(d3.axisLeft(y4)) 
            .attr("font-size", '20px') 
            .attr("color", "black")
            .call((g) => g.append("text")
                .attr("x", 0)
                .attr("y", 0)
                .attr("fill", "black")
                .attr("text-anchor", "end")
                .text("frequency"));
           
        bars2 = svg4.selectAll(".bar")
                .data(mediansRadius)
                .enter()
                .append("rect") 
                 .attr("class", "bar") 
                 .attr("x", (d,i) => x4(i)) 
                 .attr("y", (d) => y4(d.dataPoints)) 
                 .attr("height", (d) => height - margin.bottom - (y4(d.dataPoints)))  
                 .attr("width", x4.bandwidth())
                 .style("fill", "green") 
                 .on("mouseover", mouseover)
                 .on("mousemove", mousemove)
                 .on("mouseleave", mouseleave);
                 
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

    function update_radius_bound() {
        // Get the value of the button
        xlim = this.value

        // Update X axis
        x1.domain([0,xlim])
        xAxis1.transition().duration(1000).call(d3.axisBottom(x1))

        // Update chart
        svg1.selectAll("circle")
            .data(data)
            .transition()
            .duration(1000)
            .attr("cx", function (d) { return x1(d[xKey1]); } )
            .attr("cy", function (d) { return y1(d[yKey1]); } )

    }

    function update_mass_bound() {
        // Get the value of the button
        xlim = this.value

        // Update X axis
        x2.domain([0,xlim])
        xAxis2.transition().duration(1000).call(d3.axisBottom(x2))

        // Update chart
        svg2.selectAll("circle")
            .data(data)
            .transition()
            .duration(1000)
            .attr("cx", function (d) { return x2(d[xKey2]); } )
            .attr("cy", function (d) { return y2(d[yKey2]); } )

    }

    d3.select("#upRadius").on("input", update_radius_bound )

    d3.select("#upMass").on("input", update_mass_bound )
}); 

