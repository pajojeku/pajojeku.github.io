window.onload=start;
var d = document;
var statki=15;
var zycia=statki;
var statkiWroga=statki;
function start() {
    
    generujTabelke(10, "polaGracza", "cyan");

}

function rozpocznij() {
    if(statki==0) {
        generujTabelke(10, "polaKomputera","red");

        var tablica=[];
        for(k=0; k<15; k++) {
            flaga=false;
            while(flaga==false) {
                h=String.fromCharCode(Math.floor(Math.random() * (10 + 1)+1)+64);
                z=Math.floor(Math.random() * (10)+1);
    
                if(!tablica.includes(h+z)) {
                    tablica+=toString((h+z));
                    flaga=true;
                }
            }
            if(d.getElementById("polaKomputera"+h+z)!=null) {
                d.getElementById("polaKomputera"+h+z).innerHTML="X";
                d.getElementById("polaKomputera"+h+z).style.textIndent="-999999px";
            }
            
        }
    }

}

function klik(x) {
    d.getElementById("strzalyKomputera").innerHTML="";
    d.getElementById("strzalyGracza").innerHTML="";

    if(statki>0 && x.includes("Gracz") && statki>0 && d.getElementById(x).style.backgroundColor!="whitesmoke") {
        d.getElementById(x).style.backgroundColor="whitesmoke";
        statki--;
        d.getElementById("statkiDoPostawienia").innerHTML=statki;
    }
    else if(x.includes("Komputer") && d.getElementById(x).innerHTML=="X") {
        d.getElementById(x).style.backgroundColor="red";
        d.getElementById("strzalyGracza").innerHTML=x.replace("polaKomputera","")+" ";
    }
    else if(x.includes("Komputer") && !d.getElementById(x).innerHTML.includes("X") && !d.getElementById(x).innerHTML.includes("x")){
    {
        d.getElementById(x).innerHTML="<text style='color: darkgray'>x</text>";
        d.getElementById("strzalyGracza").innerHTML=x.replace("polaKomputera","")+" ";
    }   


        for(k=0; k<1; k++) {
            flaga=false;
            while(flaga==false) {
                h=String.fromCharCode(Math.floor(Math.random() * (10 + 1)+1)+64);
                z=Math.floor(Math.random() * (10)+1);
    
                if(d.getElementById("polaGracza"+h+z)!=undefined)
                if(!d.getElementById("polaGracza"+h+z).innerHTML.includes("X")) {
                    flaga=true;
                    if(d.getElementById("polaGracza"+h+z).style.backgroundColor=="whitesmoke") {
                        d.getElementById("polaGracza"+h+z).style.backgroundColor="red";
                      //  d.getElementById("polaGracza"+h+z).innerHTML="X";
                        d.getElementById("polaGracza"+h+z).style.textIndent="-999999px";
                        zycia--;
                        flaga=false;
                        d.getElementById("strzalyKomputera").innerHTML+=(h+z)+" ";
                    }
                }
            }
            if(d.getElementById("polaGracza"+h+z)!=undefined) {
                d.getElementById("polaGracza"+h+z).innerHTML="X";
                d.getElementById("strzalyKomputera").innerHTML+=(h+z)+" ";
            }
            
        }
    }
}


function generujTabelke(nr, nazwa, kolor) {
    var ile=nr;

    var tresc="<table>";

    for(i=0; i<=ile; i++){
        tresc+="<tr>";

        for(j=0; j<=ile; j++) {
            if(i==0 && j==0)
            tresc+="<td style='color:"+kolor+"'></td>"
            else if(i==0)
            tresc+="<td style='color:"+kolor+"'>"+String.fromCharCode(j+64)+"</td>"
            else if(j==0)
            tresc+="<td style='color:"+kolor+"'>"+(1*i*(j+1))+"</td>";
            else if(j!=0)
            tresc+="<td>"+"<div class=pole "+"id="+nazwa+String.fromCharCode(j+64)+i+"></div>"+"</td>";
        }
        
        tresc+="</tr>";
    }
    tresc+="</table>";
    d.getElementById(nazwa).innerHTML=tresc;

    for(let i=1; i<=ile; i++){
        for(let j=0; j<ile; j++) {
            var x= String.fromCharCode(i+64)+(j+1);
            d.getElementById(nazwa+x).addEventListener("click", function() {klik(nazwa+String.fromCharCode(i+64)+(j+1));});
        }
    }
}