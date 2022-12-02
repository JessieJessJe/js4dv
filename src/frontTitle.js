function drawFrontTitle(data_text, width, height) {
  width = width / 2;
  let benchmark_text;
  if (data_text['name'].length > data_text['farm'].length) {
    benchmark_text = data_text.name;
  } else {
    benchmark_text = data_text.farm;
  }

  const ratio = 1;
  const margin = { top: 20 * ratio, right: 10 * ratio, bottom: 20 * ratio, left: 30 * ratio };

  const title = d3.select('svg#front-title');

  title.selectAll('*').remove();
  title.attr('width', width).attr('height', height).attr('fill', 'black');

  title
    .append('text')
    .attr('class', 'text-title')
    .attr('fill', 'black')
    .attr('transform', `translate(${margin.left} ${margin.top + 40})`)
    .attr('x', '0')
    .attr('y', '0')
    .style('font-size', '40px')
    .text(data_text.name);
}
