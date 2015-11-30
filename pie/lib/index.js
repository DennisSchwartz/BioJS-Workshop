/*
 * biojs-vis-gcpiechart
 * https://github.com/DennisSchwartz/biojs-vis-gcpiechart
 *
 * Copyright (c) 2015 DennisSchwartz
 * Licensed under the MIT license.
 */

var d3 = require( 'd3' );

/**
@class GCPieChart
 */

var GCPieChart = function ( opts ) {
    var container = opts.el;
    container.id = 'pie';
    var sequence = opts.sequence;

    var dataset = countBases(sequence);

    console.log(dataset);

    // Get height and width of chart container
    var width = container.clientWidth;
    var height = container.clientHeight;

    // Set the radius of the pie chart
    var radius = Math.min( width, height ) / 2;

    // Set color scale
    var color = d3.scale.category10();

    // Initialize the svg element
    var svg = d3.select( '#pie' )
        .append( 'svg' )
        .attr( 'width', width )
        .attr( 'height', height )
        .append( 'g' )
        .attr( 'transform', 'translate(' + ( width / 2 ) + ',' + ( height / 2 ) + ')' );

    var arc = d3.svg.arc()
        .outerRadius(radius);

    var labelArc = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 100);

    // Create layout
    var pie = d3.layout.pie()
        .value(function ( d ) {
            return d.count;
        })
        .sort(null);


    // Fill layout with data
    var path = svg.selectAll('path')
        .data(pie(dataset))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function (d, i) {
            return color(d.data.label)
        });

    /**
     * Adding labels
      */

    // Calculate the positions for labels
    var textPositions = {};
    path.each(function (d) {
        textPositions[d.data.label] = labelArc.centroid(d);
    });

    // Create text elements
    var textElements = svg.selectAll('text')
        .data(dataset)
        .enter()
        .append("text");

    // Set position and text of text elements
    var text = textElements
        .attr("transform", function(d) {
            return "translate(" + textPositions[d.label][0] + "," + textPositions[d.label][1] + ")";
        })
        .attr("dy", ".35em")
        .text(function(d) {
            return d.label;
        });

    function countBases(seq) {
        // Initialize counts
        var counts = {
            T : 0,
            G : 0,
            A : 0,
            C : 0
        };

        // Count bases
        for (var i = 0; i < seq.length; i++) {
            var base = seq.charAt(i);
            counts[base]++;
        }

        console.log(counts);

        // Transform counts into JSON array
        var result = [
            { label: "T", count : counts["T"] },
            { label: "G", count : counts["G"] },
            { label: "A", count : counts["A"] },
            { label: "C", count : counts["C"] }
        ];

        return result;
    }

};


module.exports = GCPieChart;