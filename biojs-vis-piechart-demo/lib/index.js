/*
 * biojs-vis-piechart-demo
 * https://github.com/DennisSchwartz/biojs-vis-piechart-demo
 *
 * Copyright (c) 2015 Dennis Schwartz
 * Licensed under the MIT license.
 */

/**
 @class Pie
 */

var d3 = require('d3');

var Pie = function ( opts ) {

    var container = opts.el;
    container.id = 'pie';
    var sequence = opts.sequence;

    // Calculate the base counts for the sequence
    var dataset = countBases(sequence);

    // Get width from container
    var height = container.clientHeight;
    var width = container.clientWidth;

    // Calculate radius of pie chart
    var radius = Math.min( height, width ) / 2;

    // Create circular shape of chart with calculated radius
    var arc = d3.svg.arc()
        .outerRadius( radius );

    // Set color scheme
    var color = d3.scale.category10();


    // Initialize svg element
    var svg = d3.select( '#pie' )
        .append( 'svg' )
        .attr( 'width', width )
        .attr( 'height', height)
        .append( 'g' )
        .attr( 'transform', 'translate(' + ( width / 2 ) + ',' + ( height /2 ) + ')' );

    // Initialize layout

    /*
     Valid d3 data structure is a JSON array:

     var data = [
     { label: "T", count: 2 }, <-- one line = one data point
     { label: "A", count: 5 }
     ]
     */

    var pie = d3.layout.pie()
        .value(function (d, i) {
            return d.count;
        })
        .sort(null);

    // Fill layout with data
    var path = svg.selectAll( 'path' )
        .data(pie(dataset))
        .enter()
        .append( 'path' )
        .attr('d', arc)
        .attr('fill', function (d, i) {
            console.log('The color fill d object:');
            console.log(d);
            return color(d.data.label);
        });

    /*
        Adding Labels
     */

    var labelArc = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 100);

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


    function countBases( seq ) {

        var counts = {
            T : 0,
            G : 0,
            A : 0,
            C : 0
        };

        for ( var i = 0; i < seq.length; i++ ) {
            // Warning: This is not very robust!
            var base = seq.charAt(i);
            counts[base]++;
        }

        var result = [
            { label: "T", count: counts["T"] },
            { label: "G", count: counts["G"] },
            { label: "A", count: counts["A"] },
            { label: "C", count: counts["C"] }
        ];

        return result;

    }

};

module.exports = Pie;




