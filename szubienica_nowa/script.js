var haslo="";
var literyKlawiatury="";
var zakreskowaneHaslo="";
var zycie=5;
var podpowiedz="Kategoria: "+"Małpy";

function start() {

    haslo=document.getElementById("haselko").value;
    document.getElementById("podpowiedz").innerHTML=podpowiedz;

    for(let i=0; i<haslo.length; i++) {
        if(haslo[i]!=" ")
        zakreskowaneHaslo+="#";
        else
        zakreskowaneHaslo+=" ";
    }
    
    document.getElementById("slowo").innerHTML=zakreskowaneHaslo;
    for(let i=0; i<litery.length; i++) {
        literyKlawiatury+="<input type=\"button\" class=\"przycisk\" value=\""+litery[i]+"\" id=\"p"+litery[i]+"\" onclick=\"klik("+i+")\">"

        if(i==6 || i==13 || i==20 || i==27) 
        literyKlawiatury+="<br>"
    }
    document.getElementById("klawiatura").innerHTML=literyKlawiatury;
}

function klik(nr) {
    var litera = document.getElementById("p"+litery[nr]);

    if(haslo.includes(litery[nr]))
    for(let i=0; i<haslo.length; i++) {
        if(haslo[i]==litery[nr]) {
            zakreskowaneHaslo = zakreskowaneHaslo.substring(0, i) + litery[nr] + zakreskowaneHaslo.substring(i + 1);
            document.getElementById("slowo").innerHTML=zakreskowaneHaslo;
            litera.style.color="green";
            litera.style.borderColor="green";
            litera.setAttribute("onclick",";");
        }
    }
    else {
        litera.style.color="red";
        litera.style.borderColor="red";
        litera.setAttribute("onclick",";");
        zycie-=1;
        document.getElementById("stan").innerHTML="<img src="+zycie+".png>";
    }

    if(zycie<=0)
    document.getElementById("klawiatura").innerHTML="<br><br><text id=przegrana onclick=window.location.reload()>Nie zgadłeś!<br>Hasło to<br>"+haslo+"</text>";

    if(!zakreskowaneHaslo.includes("#"))
    document.getElementById("klawiatura").innerHTML="<br><br><text id=wygrana onclick=window.location.reload()>Zgadłeś!<br>Hasło to<br>"+haslo+"</text>";
}