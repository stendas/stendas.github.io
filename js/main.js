for(var k in JSON.parse(localStorage.getItem('konsultacijos'))){

    // KABINETAI
    if(JSON.parse(localStorage.getItem('konsultacijos'))[k].tipas.toString() === "1"){
        var $Item1 = $("<div class='element-item transition metal' data-category='transition'>\n"+
            "<div class='kabibetas'>" + JSON.parse(localStorage.getItem('konsultacijos'))[k].kabinetas.toString() + " kab.</div>\n" +
            "<ul class='list-group'>\n" +
            "<li class='list-group-item' align='center' style='top: -20px; font-size:x-large;'>\n" + JSON.parse(localStorage.getItem('konsultacijos'))[k].vardas.toUpperCase().toString() + "</li>\n" +
            "</ul>\n" +
            "</div>\n");

        $('.grid').prepend($Item1)
            .isotope('reloadItems').isotope({sortBy: 'original-order'});
    }
    // DARBUOTOJAI
    if(JSON.parse(localStorage.getItem('konsultacijos'))[k].tipas.toString() === "2") {

        var $Item2 = $('      <div class="element-item transition metal" data-category="transition">' +
            '<img src="' + JSON.parse(localStorage.getItem('konsultacijos'))[k].foto.toString() + '"\n' +
            '        align="left" height="400px">\n' +
            '            <ul class="list-group">\n' +
            '           <li class="list-group-item">' + JSON.parse(localStorage.getItem('konsultacijos'))[k].vardas.toString() + '</li>\n' +
            '       <li class="list-group-item">' + '<span style="font-weight: 900;\n' +
            '    color: #2b1195;\n' +
            '    font-size: x-large;">'+JSON.parse(localStorage.getItem('konsultacijos'))[k].kabinetas.toString() + ' kab.</span></li>\n' +
            '            <li class="list-group-item">' + JSON.parse(localStorage.getItem('konsultacijos'))[k].laikas.toString() + '\n' +
            '            </li>\n' +
            '      </ul>\n' +
            '      </div>');

        $('.grid').prepend($Item2)
            .isotope('reloadItems').isotope({sortBy: 'original-order'});

    }
    // DESTYTOJU KORTELES ATVAIZDAVIMAS
    for(var j in JSON.parse(localStorage.getItem('dest')).rows) {
        if (JSON.parse(localStorage.getItem('dest')).rows[j].lastname.includes(JSON.parse(localStorage.getItem('konsultacijos'))[k].vardas)) {
            //console.log(JSON.parse(localStorage.getItem('konsultacijos'))[i].vardas+" "+JSON.parse(localStorage.getItem('dest')).rows[j].lastname+" "+i);
            var $Item3 = $('      <div class="element-item transition metal" data-category="transition">' +
                '<img src="' + JSON.parse(localStorage.getItem('konsultacijos'))[k].foto.toString() + '"\n' +
                '        align="left" height="400px">\n' +
                '            <ul class="list-group">\n' +
                '           <li class="list-group-item">' + JSON.parse(localStorage.getItem('dest')).rows[j].firstname.toString() + ' ' + JSON.parse(localStorage.getItem('dest')).rows[j].lastname.toString() + '</li>\n' +
                '            <li class="list-group-item">' + JSON.parse(localStorage.getItem('konsultacijos'))[k].laikas.toString() +" <strong>"+ JSON.parse(localStorage.getItem('konsultacijos'))[k].kabinetas.toString()+ ' aud.</strong>\n' +
                '            </li>\n' +
                '            <li class="list-group-item">\n' +
                '           <div class="links">\n' +
                '            <a class="openpop" href="" id="' + "https://vikoeif.edupage.org/timetable/view.php?teacher=" + JSON.parse(localStorage.getItem('dest')).rows[j].id.toString() + '"><i class="far fa-calendar"></i> Paskaitų tvarkaraštis</a>\n' +
                '       </div>\n' +
                '        </li>\n' +
                '      </ul>\n' +
                '      </div>');

            $('.grid').prepend($Item3)
                .isotope('reloadItems').isotope({sortBy: 'original-order'});


        }
    }

}