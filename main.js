
var etelekTomb = [];

$(function () {

   $("article").on("click", "div", kivalasztott);
     $("article").on("click", ".torol", function(){     
                        var index = Number($(this).attr("index")); 
                        etelekTomb.splice(index, 1);                        
                        kinalat();   
                        
       
   });
     $("article").on("click", ".modosit", function(){     
                        var index = Number($(this).attr("index")); 
                        Modosit(index);      
                        
   });
   
   $("#nav").on("slideUp","#siklas",function(){
       var val = $('#siklas').attr('value'); 
                    console.log(val);
   });
   
   
   
   $.ajax(
            {url: "szoveg.json", success: function (result) {
                    console.log(result);
                    etelekTomb = result;  
                   siklik();
                    kinalat();
                     Minden();
                     
                    $("#siklas").change(function(){
                     var val = $('#siklas').val();
                    console.log(val);                         
                        
                    }); 
                    
              
                    

                }});
  
    });



    
function siklik(){
    var min_ar=0;
    var max_ar=2500;
    
 $("nav").append("<input type='range' name='siklas' id='siklas' min='"+min_ar+"' max='"+max_ar+"' step='1' oninput='this.nextElementSibling.value = this.value'>\n\
");    
$("nav").append("<output>"+$('#siklas').val()+"</output>");





}




function kinalat(){
   $("article").empty();
    for (var item in etelekTomb) {
        var Rekord ="<p><b>Étel neve</b>: "+etelekTomb[item]["nev"]+"</p>\n\
                          <p><b>Kategória</b>: "+etelekTomb[item]["kategoria"]+"</p>\n\
                          <p> <b>Elkészítési idő</b>: "+etelekTomb[item]["elkeszitesi_ido"]+"</p>\n\
                           <img src='" + etelekTomb[item]['eleresi_ut'] + "' alt='" + etelekTomb[item]['eleresi_ut'].slice(6,etelekTomb[item]['eleresi_ut'].length-4) + "' >\n\
                            <p><b>Ár</b>: "+etelekTomb[item]["ar"]+" Ft</p>\n\
                           <p><b>Db</b>: <input type='text' id='"+etelekTomb[item]["nev"]+"_db'></p>\n\
                            <div id=gombok><input type='button' class='modosit' index='"+item+"' value='Módosít'><input type='button' class='torol' index='"+item+"' value='Töröl'></div>"; 
                        $("article").append("<div id='"+etelekTomb[item]["nev"]+"'>"+Rekord+"</div>");
         
                        } 
   

    }

function kivalasztott(){
     $("aside").empty();
     $("aside").remove("#kivalasztott_etel");
    var etelDivID = $(this).attr("id");
    var i =0;
    talalt = false;
    while(i<etelekTomb.length && !talalt){
      
        if(etelDivID === etelekTomb[i].nev){
         talalt = true;
         var Rekord ="<h3>A kiválasztott fogás adatai:</h3><p><b>Étel neve</b>: "+etelekTomb[i].nev+"</p>\n\
                          <p><b>Kategória</b>: "+etelekTomb[i].kategoria+"</p>\n\
                          <p> <b>Elkészítési idő</b>: "+etelekTomb[i].elkeszitesi_ido+"</p>\n\
                           <img src='" + etelekTomb[i].eleresi_ut + "' alt='" +  etelekTomb[i].eleresi_ut.slice(6, etelekTomb[i].eleresi_ut.length-4) + "' >\n\
                            <p><b>Ár</b>: "+ etelekTomb[i].ar+" Ft</p>";
          $("aside").append("<div id='kivalasztott_etel'>"+Rekord+"</div>");
        }
          i++;
    }
    $("#kivalasztott_etel").addClass("asideFormaz");
    $("aside img").addClass("asideImgFormaz");   
    
    
    
}

function Minden(){
$("section").empty();
$("section").append("<div id = urlap><h2>Új adat felvitele</h2>\n\
                        <form >\n\
                        <div>\n\
                        <label for='nev'>Név: </label><input type='text' name='nev' id='nev' >\n\
                        <label for='kategoria'>Kategória: </label><input type='text' id='kategoria' name='kategoria'>\n\
                        <label for='elkeszitesi_ido'>Elkészítési idő</label><input type='number' id='elkeszitesi_ido' name='elkeszitesi_ido'>\n\
                        <label for='eleresi_ut'>Kép elérési útja: </label><input type='text' id='eleresi_ut' name='eleresi_ut'>\n\
                        \n\ <label for='ar'>Ár: </label><input type='number' id='ar' name='ar'> \
                        <input type='button' id ='beszur' value='Beszúr'> \n\
                        </div>\n\
                        </form>\n\
                        </div>");

$("#urlap").addClass("urlapFormaz");
$("#beszur").click(uj);


}

function Modosit(index){
$("section").empty();
$("section").append("<div id = urlap><h2>Új adat felvitele</h2>\n\
                        <form >\n\
                        <div>\n\
                        <label for='nev'>Név: </label><input type='text' name='nev' id='nev' value='"+etelekTomb[index]["nev"]+"' >\n\
                        <label for='kategoria'>Kategória: </label><input type='text' id='kategoria' name='kategoria' value='"+etelekTomb[index]["kategoria"]+"'>\n\
                        <label for='elkeszitesi_ido'>Elkészítési idő</label><input type='number' id='elkeszitesi_ido' name='elkeszitesi_ido' value='"+etelekTomb[index]["elkeszitesi_ido"]+"'>\n\
                        <label for='eleresi_ut'>Kép elérési útja: </label><input type='text' id='eleresi_ut' name='eleresi_ut' value='"+etelekTomb[index]["eleresi_ut"]+"'>\n\
                        \n\ <label for='ar'>Ár: </label><input type='number' id='ar' name='ar' value='"+etelekTomb[index]["ar"]+"'> \
                        <input type='button' id ='mentes' value='Mentés'> \n\
                        </div>\n\
                        </form>\n\
                        </div>");

$("#urlap").addClass("urlapFormaz");
$("#mentes").click( function (){Felulir(index);}); 


}


function uj(){
  
        var etel = {
        nev: $("#nev").val(),
        elkeszitesi_ido: $("#elkeszitesi_ido").val(),
        eleresi_ut: $("#eleresi_ut").val(),
        ar: $("#ar").val(),
        kategoria: $("#kategoria").val()                    
        };       
        etelekTomb.push(etel);
        kinalat();
}

function Felulir(index){
        
        var etel = {
        nev: $("#nev").val(),
        elkeszitesi_ido: $("#elkeszitesi_ido").val(),
        eleresi_ut: $("#eleresi_ut").val(),
        ar: $("#ar").val(),
        kategoria: $("#kategoria").val()                    
        };
        console.log("felülírt: "+etel);
        etelekTomb[index]=etel;
        console.log(etelekTomb);
        kinalat();
}

