
function gridData() {
  var data = new Array();
  var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
  var ypos = 1;
  var width = 32;
  var height = 32;
  var click = 0;

  // iterate for rows
  for (var row = 0; row < 18; row++) {
    data.push( new Array() );

    // iterate for cells/columns inside rows
    for (var column = 0; column < 18; column++) {
      data[row].push({
        x: xpos,
        y: ypos,
        width: width,
        height: height,
        click: click
      })
      // increment the x position. I.e. move it over by 50 (width variable)
      xpos += width;
    }
    // reset the x position after a row is complete
    xpos = 1;
    // increment the y position for the next row. Move it down 50 (height variable)
    ypos += height;
  }
  return data;
}



var gridData = gridData();
// I like to log the data to the console for quick debugging
console.log(gridData);

var grid = d3.select("#grid")
  .append("svg")
  .attr("width","700px")
  .attr("height","700px");

var row = grid.selectAll(".row")
  .data(gridData)
  .enter().append("g")
  .attr("class", "row");

var column = row.selectAll(".square")
  .data(function(d) { return d; })
  .enter().append("rect")
  .attr("class","square")
  .attr("x", function(d) { return d.x; })
  .attr("y", function(d) { return d.y; })
  .attr("width", function(d) { return d.width; })
  .attr("height", function(d) { return d.height; })
  .style("fill", "#e2e2e2")
  .style("stroke", "#222")

function pointData() {
  var data = new Array();
  var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
  var ypos = 1;
  var x=0;
  var y=0;
  var width = 32;
  var height = 32;
  var click = 0;

  // iterate for rows
  for (var row = 0; row < 19; row++) {
    data.push( new Array() );

    // iterate for cells/columns inside rows
    for (var column = 0; column < 19; column++) {
      data[row].push({
        x: xpos,
        y: ypos,
        lx:row,
        ly:column,
        width: width,
        height: height,
        click: click
      })
      // increment the x position. I.e. move it over by 50 (width variable)
      xpos += width;
    }
    // reset the x position after a row is complete
    xpos = 1;
    // increment the y position for the next row. Move it down 50 (height variable)
    ypos += height;
  }
  return data;
}




var pion = grid.selectAll(".pion")
  .data(pointData)
  .enter().append("g")
  .attr("class", "pion");

  var column2 = pion.selectAll(".point")
  .data(function(d) { return d; })
  .enter().append("circle")
  .attr("class","point")
  .attr("cx", function(d) { return d.x; })
  .attr("cy", function(d) { return d.y; })
  .attr("r",12)
  .attr("x",function(d) { return d.lx; })
  .attr("y",function(d) { return d.ly; })
  .attr("id",function(d) { return d.lx+";"+d.ly; })
  .attr("width", function(d) { return d.width; })
  .attr("height", function(d) { return d.height; })
  .style("fill", "black")
  .style("stroke", "#222")
  .style("opacity", "0")

//x ligne y colonne
function addPion(x,y,playerNumber)
{
  if (playerNumber==1)
  {
 pion.select("[x='"+x+"'][y='"+y+"']")
.style("opacity", "1")
.style("fill", "#013A6B")
  }
  else if (playerNumber==2)
  {
pion.select("[x='"+x+"'][y='"+y+"']")
.style("opacity", "1")
.style("fill", "#c1ad17")
  }
}



grid.style("padding-left", "15px")
grid.style("padding-top", "15px")
