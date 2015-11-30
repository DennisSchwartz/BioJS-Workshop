/*
 * pie-chart-demo
 * https://github.com/DennisSchwartz/pie-chart-demo
 *
 * Copyright (c) 2015 Dennis Schwartz
 * Licensed under the MIT license.
 */

/**
@class piechartdemo
 */

var d3 = require('d3');

var Piechartdemo = function ( opts ) {

    var container = opts.el;
    container.id = 'pie';
    var sequence = opts.sequence;

    // Calculate the base counts
    var dataset = countBases(sequence);


    // Set the height and width of our container
    var height = container.clientHeight;
    var width = container.clientWidth;

    var radius = Math.min(height, width) / 2;

    // Set color scale
    var color = d3.scale.category10();

    // Initialize the svg element
    var svg = d3.select('#pie')
        .append( 'svg' )
        .attr( 'width', width )
        .attr( 'height', height)
        .append( 'g' )
        .attr( 'transform', 'translate(' + width / 2 + ',' +
            ( height / 2 ) + ')' );

    var arc = d3.svg.arc().outerRadius(radius);


    // Create pie chart layout
    var pie = d3.layout.pie()
        .value(function ( d ) {
            return d.count;
        })
        .sort(null);


    var path = svg.selectAll('path')
        .data(pie(dataset))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function (d) {
            return color(d.data.label);
        });



    function countBases(seq) {
        // initialize
        var counts = {
            T : 0,
            G : 0,
            A : 0,
            C : 0
        };

        // count bases
        for (var i = 0; i < seq.length; i++) {
            var base = seq.charAt(i);
            counts[base]++;
        }

        var results = [
            { label: "T", count: counts["T"] },
            { label: "C", count: counts["C"] },
            { label: "A", count: counts["A"] },
            { label: "G", count: counts["G"] }
        ];

        return results;

    }



};

module.exports = Piechartdemo;



///*
//module.exports = piechartdemo = function(opts){
//  this.el = opts.el;
//  this.el.textContent = piechartdemo.hello(opts.text);
//};
//
///**
// * Private Methods
// */
//
///*
// * Public Methods
// */
//
///**
// * Method responsible to say Hello
// *
// * @example
// *
// *     piechartdemo.hello('biojs');
// *
// * @method hello
// * @param {String} name Name of a person
// * @return {String} Returns hello name
// */
//
//
//piechartdemo.hello = function (name) {
//
//  return 'hello ' + name;
//};
//

