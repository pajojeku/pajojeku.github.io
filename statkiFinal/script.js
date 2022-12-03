window.onload=start;
function element(id) {
    return document.getElementById(id);
}

function start() {
    generujTabelke("polaGracza", "#00ccff");
}

function rozpocznij() {
    generujTabelke("polaKomputera","red");
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
            tresc+="<td>"+"<div class=pole id="+nazwa+String.fromCharCode(j+64)+i+" onmouseover=zaznaczPola('"+nazwa+String.fromCharCode(j+64)+i+"')></div>"+"</td>";
        }
        tresc+="</tr>";
    } tresc+="</table>";

    element(nazwa).innerHTML=tresc;
}