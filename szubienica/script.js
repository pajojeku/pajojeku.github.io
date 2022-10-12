window.onload = start;

var haslo=lista[Math.floor(Math.random()*lista.length)];
var literyKlawiatury="";
var zakreskowaneHaslo="";
var zycie=5;

var podpowiedz="Podpowiedź: "+"gatunek małpy";

function start() {
    
    document.getElementById("podpowiedz").innerHTML=podpowiedz;
    
    for(let i=0; i<haslo.length; i++)
    {
        if(haslo[i]!=" ")
        zakreskowaneHaslo+="#";
        else
        zakreskowaneHaslo+=" ";
    }
    
    document.getElementById("slowo").innerHTML=zakreskowaneHaslo;
    for(let i=0; i<litery.length; i++)
    {
        literyKlawiatury+="<input type=\"button\" class=\"przycisk\" value=\""+litery[i]+"\" id=\"p"+litery[i]+"\" onclick=\"klik("+i+")\">"

        if(i==11)
        literyKlawiatury+="<br>"

        if(i==22)
        literyKlawiatury+="<br>"
    }
    document.getElementById("klawiatura").innerHTML=literyKlawiatury;
}

function klik(nr) {

    if(haslo.includes(litery[nr]))
    {
        for(let i=0; i<haslo.length; i++)
        {
            if(haslo[i]==litery[nr])
            {
                zakreskowaneHaslo = zakreskowaneHaslo.substring(0, i) + litery[nr] + zakreskowaneHaslo.substring(i + 1);
                document.getElementById("slowo").innerHTML=zakreskowaneHaslo;
                document.getElementById("p"+litery[nr]).style.color="green";
                document.getElementById("p"+litery[nr]).style.borderColor="green";
                document.getElementById("p"+litery[nr]).setAttribute("onclick",";");
            }
        }
    }
    else
    {
        document.getElementById("p"+litery[nr]).style.color="red";
        document.getElementById("p"+litery[nr]).style.borderColor="red";
        document.getElementById("p"+litery[nr]).setAttribute("onclick",";");
        zycie-=1;
        document.getElementById("stan").innerHTML="<img src="+zycie+".png width=\"80%\">";
    }

    if(zycie<=0)
    document.getElementById("klawiatura").innerHTML="<span id=przegrana>Przegrałeś!<br>Hasło to "+haslo+"</span>";

    if(!zakreskowaneHaslo.includes("#"))
    document.getElementById("klawiatura").innerHTML="<span id=wygrana>Wygrałeś!<br>Hasło to "+haslo+"</span>";
}