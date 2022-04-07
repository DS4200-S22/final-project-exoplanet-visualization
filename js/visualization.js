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

const svg4 = d3.select("#vis-container")
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

        console.log(medians)
        console.log(medians[0].dataPoints)
        console.log(medians.length)

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
            .call((g) => g.append("text")
                .attr("x", 0)
                .attr("y", margin.top)
                .attr("fill", "black")
                .attr("text-anchor", "end")
                .text("frequency"));

        for (i = 0; i < medians.length; i++){            
            dataP = medians[i].dataPoints;
            medianM = medians[i].medianMass;
            
            console.log("medians[" + i + "]: ");
            console.log("d.dataPoints: " + dataP);
            console.log("d.medianMass: " + medianM);
                               
        }
           
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
    }

    // Plot 4 
    {
        xKey4 = "radius"

        // Find max x
        let maxX4 = d3.max(data, (d) => { return d[xKey4]; });

        // Find max y 
        let maxY4 = 76;

        const thresholds = d3.range(maxX4 + 1)
        const binner = d3.bin().value(d=>d[xKey4]).thresholds(thresholds).domain([0,maxX4])
        const binned = binner(data)
        const mediansRadius = binned.map(bin => {
            return {
                medianRadius: d3.median(bin, b=>b[xKey4]),
                dataPoints: bin.length,
                bucketMin: bin.x0,
                bucketMax: bin.x1

            }
        })


        console.log(mediansRadius)
        console.log(mediansRadius[0].dataPoints)
        console.log(mediansRadius.length)

        /*
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
            .call((g) => g.append("text")
                .attr("x", 0)
                .attr("y", margin.top)
                .attr("fill", "black")
                .attr("text-anchor", "end")
                .text("frequency"));

        for (i = 0; i < mediansRadius.length; i++){            
            dataP = mediansRadius[i].dataPoints;
            medianR = mediansRadius[i].medianRadius;
            
            console.log("medians[" + i + "]: ");
            console.log("d.dataPoints: " + dataP);
            console.log("d.medianMass: " + medianR);
                               
        }
           
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
        */         
    }
})                
