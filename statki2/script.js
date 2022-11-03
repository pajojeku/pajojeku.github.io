window.onload=start;
function element(id) {
    return document.getElementById(id);
}

var statkiGracza=[];



function start() {
    generujTabelke("polaGracza", "cyan");
}
var zolte=[];
function allowDrop(ev) {
    ev.preventDefault();

    for(i=0; i<zolte.length; i++) {
        if(zolte[i].style.background!="gray")
        zolte[i].style.background="none";
    }
    
    
    zolte=[];

    data = ev.dataTransfer.getData("text");

    if(data=="drag1" || data=="drag2" || data=="drag3") {
        nowy = ev.target.id.replace(ev.target.id.slice(-1), parseInt(ev.target.id.slice(-1))+1);
    
        if((parseInt(ev.target.id.slice(-1))+1)<=10) {
            zolte.push(element(ev.target.id));
            zolte.push(element(nowy));
        }
    }
    else if(data=="drag4" || data=="drag5") {
        nowy = ev.target.id.replace(ev.target.id.slice(-1), parseInt(ev.target.id.slice(-1))+1);
        nowy2 = ev.target.id.replace(ev.target.id.slice(-1), parseInt(ev.target.id.slice(-1))+2);
        if((parseInt(ev.target.id.slice(-1))+2)<=10) {
            zolte.push(element(ev.target.id));
            zolte.push(element(nowy));
            zolte.push(element(nowy2));
        }
    }

    for(i=0; i<zolte.length; i++) {
        if(zolte[i].style.backgroundColor!="gray")
        zolte[i].style.backgroundColor="yellow";
    }
    
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
} 

function drop(ev) {
    ev.preventDefault();
    data = ev.dataTransfer.getData("text");


    if(data=="drag1" || data=="drag2" || data=="drag3") {
        cyfra=ev.target.id.slice(-1);
        if((parseInt(ev.target.id.slice(-1))+2)<=10) {
        statkiGracza.push(ev.target.id);
        statkiGracza.push(ev.target.id.replace(cyfra, parseInt(cyfra)+1));
        
        element(data).setAttribute("draggable", "false");
        element(data).style.visibility="hidden";
        }
    }
    else if(data=="drag4" || data=="drag5") {
        nowy = ev.target.id.replace(ev.target.id.slice(-1), parseInt(ev.target.id.slice(-1))+1);
        nowy2 = ev.target.id.replace(ev.target.id.slice(-1), parseInt(ev.target.id.slice(-1))+2);
        if((parseInt(ev.target.id.slice(-1))+2)<=10) {
            statkiGracza.push(ev.target.id);
            statkiGracza.push(nowy);
            statkiGracza.push(nowy2);

            element(data).setAttribute("draggable", "false");
            element(data).style.visibility="hidden";
        }
    }

    for(i=0; i<statkiGracza.length; i++) {
        element(statkiGracza[i]).style.backgroundColor="gray";
        element(statkiGracza[i]).setAttribute("ondragover", ";");
    }
    
}

function rozpocznij() {
        generujTabelke("polaKomputera","red");

}

function klik(x) {
    //rozpocznij();
}


function generujTabelke(nazwa, kolor) {
    var tresc="<table>";
    for(i=0; i<=10; i++){
        tresc+="<tr>";
        for(j=0; j<=10; j++) {
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

    element(nazwa).innerHTML=tresc;

    for(let i=1; i<=10; i++){
        for(let j=0; j<10; j++) {
            var x= String.fromCharCode(i+64)+(j+1);
            element(nazwa+x).addEventListener("click", function() {klik(nazwa+String.fromCharCode(i+64)+(j+1));});
            element(nazwa+x).setAttribute("ondrop", "drop(event)");
            element(nazwa+x).setAttribute("ondragover", "allowDrop(event)");
        }
    }
}