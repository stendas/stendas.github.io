const rp = require('request-promise');
const url = 'https://vikoeif.edupage.org/timetable/';

// const cors = require('cors');
// const express = require('express');
//
// let app = express();
// app.use(cors());
// app.options('*', cors());



rp(url)
    .then(function(html){
        //success!

        // https://regex101.com/
        let matched = html.match(/{"table":"teachers",[\w\W]*?\(-a\)"}]}/gm);
        for(let k in matched[0]) {


          //  $(".grid").append("<h1>HELLO</h1>");
            console.log(JSON.parse(matched[0]).rows[k].short,
                JSON.parse(matched[0]).rows[k].id,
                "https://vikoeif.edupage.org/timetable/view.php?teacher="+JSON.parse(matched[0]).rows[k].id.toString()+"");
        }

    })
    .catch(function(err){
        //handle error
    });







// var cheerio = require('cheerio'); // Basically jQuery for node.js
//
// var options = {
//     uri: 'http://www.google.com',
//     transform: function (body) {
//         return cheerio.load(body);
//     }
// };
//
// rp(options)
//     .then(function ($) {
//         // Process html like you would with jQuery...
//     })
//     .catch(function (err) {
//         // Crawling failed or Cheerio choked...
//     });