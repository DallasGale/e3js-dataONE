// d3

var data = [1, 2, 3, 4, 5];

var width = 420;
var height = 20;

var y = d3.scaleLinear()
    .range([height, 0]);

var chart = d3.select('.chart')
  .attr('width', width)
  .attr('height', height);


  // d3.xml(data, "application/xml", function(xml) {
  //   d3.select('.chart')
  //     .data(xml.documentElement.getElementsByTagName("value"))
  //    .attr('width', width)
  //    .attr('height', barHeight * data.length);
  // });
var barwidth = width / data.length;

var bar = chart.selectAll('g')
  .data(data)
  .enter().append('g')
  .attr('transform', (d, i) => {
    return 'translate(0,' + i * barHWidth +')'; });

  bar.append('rect')
    .attr('y', (d) => {
      return y(d.value); })
    .attr('height', (d) => {
      return height - y(d.value); //TODO https://bost.ocks.org/mike/bar/3/
    } - 1);

  bar.append('text')
    .attr('x', (d) => {
      return x(d) - 3; })
    .attr('y', barHeight / 2)
    .attr('dy', '.35em')
    .text((d) => {
      return d;
    });

var body = d3.select('body');
var div = body.append('div');
    div.html('hello world!');





// fetch DataONE API

let exampleData = 'https://knb.ecoinformatics.org/knb/d1/mn/v2/object/';
let exampleObj = '/object';

let examplePID = '010172ce-2068-48a8-9aa1-071c8c8accc6-snotel_201702_1034.xml';

// PID
let waterRes = exampleData + '08d9af19-9800-4a2d-8032-81adff1a2a4f-PRISM-T-mean-celcius-Quay.xml'

const dataTable = document.getElementById('xmlDataTable');

let dataOne = new Request(exampleData);
console.log(`'byte ${dataOne.url}`);


let waterRequest = new Request(waterRes);
console.log(waterRequest.url);
const waterRequestTable = document.getElementById('waterRequestTable');


// jQuery below
$(function() {
  console.log('jquery works');
  // $('img').css({
  //   'display': 'block',
  //   'maxWidth': '90%',
  //   'position': 'relative',
  //   'margin': '0 auto'
  // });

  $.ajax({
    type: 'GET',
    url: waterRequest.url,
    dataType: 'xml',
    contentType: 'text/xml; charset=\'utf-8\'',
    success: function populateTable(xml, status) {
      $(xml).find('descript').each( function() {

        // abstract
        let abstract = $(this).find('abstract').text();
          // console.log(abstract);
        $('<p id="abstract"></p>').html(`
            ${abstract},
          `
        ).appendTo(waterRequestTable);

        // purpose
        let purpose = $(this).find('purpose').text();
          // console.log(purpose);
        $('<p id="purpose"></p>').html(`
            ${purpose}
          `
        ).appendTo(waterRequestTable);


        // supplinf
        let supplinf = $(this).find('supplinf').text();
          // console.log(supplinf);
        $('<p id="supplinf"></p>').html(`
            ${supplinf}
          `
        ).appendTo(waterRequestTable);

      });



      // month data
      $(xml).find('spdoinfo').each( function() {
        // abstract
        let indspref = $(this).find('indspref').text();
          // console.log(indspref);
        $('<h1 id="indspref"></h1>').html(`
            ${indspref}
          `
        ).appendTo(waterRequestTable);
      });


      // month data
      $(xml).find('eainfo').each(function() {

        // eainfo
        let rdommin = $(this).find('rdommin').text();
        // rdomain.makeArray(rdomminArr);
        let rdommax = $(this).find('rdommax').text();
        let attrunit = $(this).find('attrunit').text();

        $('#eainfoTable').append('<tr><td>' + rdommin + '</td><td>' + rdommax + '</td><td>' + attrunit + '</td></tr>');
        console.log(rdommin);
        var arr = $.makeArray(rdommin);
        console.log(arr);
      });






    }, error: function() {
      alert("An error occurred while processing XML file.");
    }
   });


  $.ajax({
    type: 'GET',
    url: dataOne.url,
    dataType: 'xml',
    contentType: 'text/xml; charset=\'utf-8\'',
    success: function(xml) {
      $(xml).find('objectInfo').each( function() {
        let id = $(this).find('identifier').text();
        // console.log(`id ${id}`);

        let fId = $(this).find('formatId').text();
        // console.log(`fId ${fId}`);

        let metaData = $(this).find('dateSysMetadataModified').text();
        // console.log(`metaData ${metaData}`);

        $('<tr colspan="3"></tr>').html(
            `
              <td width="33%"><a href="${exampleData}${id}" target="_blank">${id}</a></td>
              <td width="33%">${fId}</td>
              <td width="33%">${metaData}</td>

            `).appendTo('#xmlDataTable');
      });

    }, error: function() {
      alert("An error occurred while processing XML file.");
    }
   });


});



// fetch(dataOne).then( (response) => {
//   console.log(dataOne);
//   return response.blob();
// }).then( (myDataBlob) => {
//   let dataUrl = URL.createObjectURL(myDataBlob);
//   console.log(dataUrl);
//   document.getElementById('xmlData').innerHTML = dataUrl;
// });

// var xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function() {
//   // if (this.readyState == 4 && this.status == 200) {
//     dataOneFunc(this);
//   // }
// };
//
// xhttp.open("GET", dataOne, true);
// xhttp.send();
//
// console.log('xhttp ', xhttp);
//
// function dataOneFunc(xml) {
//   var xmlDoc = xml.responseXML;
//   console.log('xmlDoc ', xmlDoc)
//   document.getElementById("xmlData").innerHTML = xmlDoc.getELementsByTagName("citation")[0].childNodes[0].nodeValue
// };






// fetch imageUrl
// const myImage = document.querySelector('img');
// let myRequest = new Request('./img/flower.jpg');
//
// fetch(myRequest)
//   .then( (response) => {
//     return response.blob();
// })
//   .then( (myBlob) => {
//     let objectUrl = URL.createObjectURL(myBlob);
//     myImage.src = objectUrl;
// });





// console.log(ajax)
