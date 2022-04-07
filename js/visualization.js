const margin = { top: 50, right: 50, bottom: 50, left: 200 };
const width = 900; 
const height = 650; 

const svg1 = d3.select("#vis-container")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height]);
                 

const svg2 = d3.select("#vis-container")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height])
                .call( d3.brush() 
                    .extent([[margin.left, margin.top], [width + margin.left, height + margin.top ]]));

const svg3 = d3.select("#vis-container")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height])
                    

// Plotting 
d3.csv("data/cleanedExoplanetData.csv").then((data) => {
  

  let x1, x2, x3, y1, y2, y3;
  let xKey1, xKey2, xKey3;
  let brush1, brush2;
  
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

        // Add brushing 
        svg1.call( d3.brush() 
            .extent([[margin.left, margin.top], [width + margin.left, height + margin.top ]]))
            .on("start end", updateChart1);

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

        // Function that is triggered when brushing is performed
        function updateChart1() {
            extent = d3.event.selection
            myCircles1.classed("selected", function(d){ return isBrushed(extent, x1(d.radius), y1(d.eccentricity))})
        }

        function isBrushed(brush_coords, cx, cy) {
            var x0 = brush_coords[0][0],
                x1 = brush_coords[1][0],
                y0 = brush_coords[0][1],
                y1 = brush_coords[1][1];
            return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    // This return TRUE or FALSE depending on if the points is in the selected area
        }
             
    } 

    // Plot 2
    {
        xKey2 = "mass"
        yKey2 = "eccentricity"

        // Find max x
        let maxX2 = d3.max(data, (d) => { return d[xKey2]; });

        console.log("Max X2: ", maxX2);

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

        // Finx max y 
        let maxY2 = d3.max(data, (d) => { return d[yKey2]; });

        console.log("Max Y2: ", maxY2);

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
        var myCircles2 = svg2.append('g')
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
                .attr("id", (d) => d.name)
                .attr("cx", (d) => x1(d[xKey2]))
                .attr("cy", (d) => y1(d[yKey2]))
                .attr("r", 8)
                .style("fill", "blue")
                .style("opacity", 0.5);

    }

    // Plot 3
    {
        xKey3 = "mass"

        // Find max x
        let maxX3 = d3.max(data, (d) => { return d[xKey3]; });

        console.log("Max X3: ", maxX3);

        const thresholds = d3.range(maxX3 + 1)

        // Create x scale
        x3 = d3.scaleLinear()
            .domain([0,maxX3])
            .range([margin.left, width-margin.right]);

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

        console.log(medians)
        /*
        // Add x axis 
        svg3.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`) 
            .call(d3.axisBottom(x3))   
            .attr("font-size", '20px')
            .call((g) => g.append("text")
                .attr("x", width - margin.right)
                .attr("y", margin.bottom)
                .attr("fill", "black")
                .attr("text-anchor", "end")
                .text(xKey3));

        

        // set the parameters for the histogram
        var histogram = d3.histogram()
            .value(function(d) { return d.mass; })   // I need to give the vector of value
            .domain(x3.domain())  // then the domain of the graphic
            .thresholds(x3.ticks(70)); // then the numbers of bins
        
        // And apply this function to data to get the bins
        var bins = histogram(data);
        */
    }
})                
