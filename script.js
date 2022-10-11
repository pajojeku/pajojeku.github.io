window.onload = start;

var haslo="SZYMPANS";
var literyKlawiatury="";
var zakreskowaneHaslo="";
var zycie=5;

var podpowiedz="podpowiedz: "+"gatunek malpy";

var litery = new Array(23);

litery[0]='A'
litery[1]='B'
litery[2]='C'
litery[3]='D'
litery[4]='E'
litery[5]='F'
litery[6]='G'
litery[7]='H'
litery[8]='I'
litery[9]='J'
litery[10]='K'
litery[11]='L'
litery[12]='M'
litery[13]='N'
litery[14]='O'
litery[15]='P'
litery[16]='R'
litery[17]='S'
litery[18]='T'
litery[19]='U'
litery[20]='W'
litery[21]='Y'
litery[22]='Z'

function start() {
    
    document.getElementById("podpowiedz").innerHTML=podpowiedz;
    
    for(let i=0; i<haslo.length; i++)
    {
        zakreskowaneHaslo+="#";
    }
    
    document.getElementById("slowo").innerHTML=zakreskowaneHaslo;
    for(let i=0; i<litery.length; i++)
    {
        literyKlawiatury+="<input type=\"button\" class=\"przycisk\" value=\""+litery[i]+"\" id=\"p"+litery[i]+"\" onclick=\"klik("+i+")\">"

        if(i==11)
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