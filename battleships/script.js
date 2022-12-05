window.onload=start;

function element(id) {
    return document.getElementById(id);
}

var trafione=0;
var kolejGracza=true;
var flaga=true;
var statkiGracza=[];
var zolte=[];

var wybranyStatek=0;
var podgladStatku=[];
var rotacja=0;

var jednomasztowce=4;
var dwumasztowce=3;
var trzymasztowce=2;
var czteromasztowce=1;

var moznaPostawic=false;
var zablokowanePola=[];



function wybierz(nr) {
    if(nr===1 && jednomasztowce>0)
    wybranyStatek=nr;
    else if(nr===2 && dwumasztowce>0)
    wybranyStatek=nr;
    else if(nr===3 && trzymasztowce>0)
    wybranyStatek=nr;
    else if(nr===4 && czteromasztowce>0)
    wybranyStatek=nr;
}

function obrot() {
    if(rotacja===0)
    rotacja=1;
    else if(rotacja===1)
    rotacja=0;
}


function start() {
    generujTabelke("polaGracza", "#00ccff");

    var elements = document.getElementsByClassName("pole");

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', e=>{
            if(moznaPostawic) {
                if(wybranyStatek===1 && jednomasztowce>0) {
                    jednomasztowce--;
                    element("jednomasztowce").innerHTML=element("jednomasztowce").innerHTML.replace(/[0-9]/g, jednomasztowce);
                    czysc();
                }
                else if(wybranyStatek===2 && dwumasztowce>0) {
                    dwumasztowce--;
                    element("dwumasztowce").innerHTML=element("dwumasztowce").innerHTML.replace(/[0-9]/g, dwumasztowce);
                    czysc();
                }
                else if(wybranyStatek===3 && trzymasztowce>0) {
                    trzymasztowce--;
                    element("trzymasztowce").innerHTML=element("trzymasztowce").innerHTML.replace(/[0-9]/g, trzymasztowce);
                    czysc();
                }
                else if(wybranyStatek===4 && czteromasztowce>0) {
                    czteromasztowce--;
                    element("czteromasztowce").innerHTML=element("czteromasztowce").innerHTML.replace(/[0-9]/g, czteromasztowce);
                    czysc();
                }
                
                function czysc(){
                wybranyStatek=0;
                for(i=0; i<niemozliwePola.length; i++)
                {
                    niemozliwePola[i].style.backgroundColor="#44515c";
                }
                for(i=0; i<podgladStatku.length; i++)
                {
                    statkiGracza.push(podgladStatku[i]);
                    element(podgladStatku[i]).style.backgroundColor="#00ccff";
                }
                podgladStatku=[];
                niemozliwePola=[];
            }
        }

        }, false);
    }

    document.addEventListener('mousemove', e => {
        pole=document.elementFromPoint(e.clientX, e.clientY);
        X=pole.getAttribute("x");
        Y=pole.getAttribute("y");
        nX=pole.getAttribute("x");
        nY=pole.getAttribute("y");

        if(rotacja===0) {
            X++;
            pole2=document.querySelector('[x="'+parseInt(X)+'"][y="'+parseInt(Y)+'"]');
            X++;
            pole3=document.querySelector('[x="'+parseInt(X)+'"][y="'+parseInt(Y)+'"]');
            X++;
            pole4=document.querySelector('[x="'+parseInt(X)+'"][y="'+parseInt(Y)+'"]');
        }
        else if (rotacja===1) {
            Y++;
            pole2=document.querySelector('[x="'+parseInt(X)+'"][y="'+parseInt(Y)+'"]');
            Y++;
            pole3=document.querySelector('[x="'+parseInt(X)+'"][y="'+parseInt(Y)+'"]');
            Y++;
            pole4=document.querySelector('[x="'+parseInt(X)+'"][y="'+parseInt(Y)+'"]');
        }

        for(i=0; i<podgladStatku.length; i++) {

            if(element(podgladStatku[i]).style.backgroundColor=="yellow")
            element(podgladStatku[i]).style.backgroundColor="";
        }
        

        podgladStatku=[];
        niemozliwePola=[];
        moznaPostawic=false;

        if(pole.id.includes("polaGracza") && !pole.id.includes("Plansza")) {
            if(wybranyStatek===1 && pole!=null && pole.style.backgroundColor=="") {
                podgladStatku.push(pole.id);

                wyliczZablokowanePola(nX,nY);
            }
            if(wybranyStatek===2 && pole!=null && pole2!=null && pole.style.backgroundColor=="" && pole2.style.backgroundColor=="") {
                podgladStatku.push(pole.id);
                podgladStatku.push(pole2.id);

                wyliczZablokowanePola(nX,nY);
            }
            if(wybranyStatek===3 && pole!=null && pole2!=null && pole3!=null && pole.style.backgroundColor=="" && pole2.style.backgroundColor=="" && pole3.style.backgroundColor=="") {
                podgladStatku.push(pole.id);
                podgladStatku.push(pole2.id);
                podgladStatku.push(pole3.id);

                wyliczZablokowanePola(nX,nY);
            }
            if(wybranyStatek===4 && pole!=null && pole2!=null && pole3!=null && pole4!=null && pole.style.backgroundColor=="" && pole2.style.backgroundColor=="" && pole3.style.backgroundColor=="" && pole4.style.backgroundColor=="") {
                podgladStatku.push(pole.id);
                podgladStatku.push(pole2.id);
                podgladStatku.push(pole3.id);
                podgladStatku.push(pole4.id);

                wyliczZablokowanePola(nX,nY);
            }
        }

        for(i=0; i<podgladStatku.length; i++) {
            if(element(podgladStatku[i]).style.backgroundColor=="") {
                element(podgladStatku[i]).style.backgroundColor="yellow";
            }
            moznaPostawic=true;
        }


      }, {passive: true})
}

async function klik(x) {
    if(statkiGracza.length==trafione)
        if(confirm("PRZEGRALES!"))
        window.location.reload();
        else
        window.location.reload();
    if(x.innerHTML=="")
    if(flaga) {
        flaga=false;
        if(kolejGracza)
        if(x.id.includes("polaKomputera")) {
            if(x.getAttribute("statekWroga")=="true") {
                x.innerHTML="X";
                x.style.backgroundColor="red";
                kolejGracza=true;
            } else {
                x.innerHTML="•";
                kolejGracza=false;
            }
            
            
        }
        if(!kolejGracza) {
            let powtorki=true;
            while(powtorki) {
                x=String.fromCharCode(Math.floor(Math.random() * (10))+65);
                y=Math.floor(Math.random() * (10)+1);
                e = element("polaGracza"+x+y);
                if(e.innerHTML=="") {
                    await new Promise(resolve => setTimeout(resolve, 600));
                    e.innerHTML+="•";
                    powtorki=false;
                    if(statkiGracza.includes(e.id)) {
                        e.innerHTML="X";
                        powtorki=true;
                        e.style.backgroundColor="red";
                        trafione++;
                    }
                    else
                    powtorki=false;
                }
            }
            kolejGracza=true;
        }
        flaga=true;
    }
}

function wyliczZablokowanePola(nX, nY) {
    if(rotacja===0)
    for(i=0; i<podgladStatku.length+2; i++) {
        for(j=0; j<3; j++)
            if(document.querySelector('[x="'+(parseInt(nX)-1+i)+'"][y="'+(parseInt(nY)-1+j)+'"]')!=null)
            niemozliwePola.push(
                document.querySelector('[x="'+(parseInt(nX)-1+i)+'"][y="'+(parseInt(nY)-1+j)+'"]')
            )
    } 
    else if(rotacja===1)
    for(i=0; i<3; i++) {
        for(j=0; j<podgladStatku.length+2; j++)
        if(document.querySelector('[x="'+(parseInt(nX)-1+i)+'"][y="'+(parseInt(nY)-1+j)+'"]')!=null)
        niemozliwePola.push(
            document.querySelector('[x="'+(parseInt(nX)-1+i)+'"][y="'+(parseInt(nY)-1+j)+'"]')
        )
    }
}

var niemozliwePolaKomputera=[];
function rozpocznij() {
    if(!(jednomasztowce===0 && dwumasztowce===0 && trzymasztowce===0 && czteromasztowce===0)){

        for(i=1; i<=10; i++)
        for(j=1; j<=10; j++) {
            if(document.querySelector('[x="'+i+'"][y="'+j+'"]').style.backgroundColor!="rgb(0, 204, 255)")
            document.querySelector('[x="'+i+'"][y="'+j+'"]').style.backgroundColor="";
        }
        generujTabelke("polaKomputera","red");
        

        genStatekPrzeciwnika(1);
        genStatekPrzeciwnika(1);
        genStatekPrzeciwnika(1);
        genStatekPrzeciwnika(1);

        genStatekPrzeciwnika(2);
        genStatekPrzeciwnika(2);
        genStatekPrzeciwnika(2);

        genStatekPrzeciwnika(3);
        genStatekPrzeciwnika(3);

        genStatekPrzeciwnika(4);


        function genStatekPrzeciwnika(dlugoscStatku) {
        
        var rotacjaWroga = Math.random();
        if (rotacjaWroga < 0.5)
            rotacjaWroga = 0
        else
            rotacjaWroga= 1

        losuj=true;

        while(losuj) {
            x=Math.floor(Math.random() * (10)+1);
            y=Math.floor(Math.random() * (10)+1);
            losuj=false;
    
            if(rotacjaWroga===0)
            for(i=0; i<dlugoscStatku; i++)
            if(document.querySelector('[x="'+(parseInt(x)+i)+'"][y="'+(parseInt(y))+'"]')==null || document.querySelector('[x="'+(parseInt(x)+i)+'"][y="'+(parseInt(y))+'"]').style.backgroundColor!="")
            losuj=true;

            if(rotacjaWroga===1)
            for(i=0; i<dlugoscStatku; i++)
            if(document.querySelector('[x="'+(parseInt(x))+'"][y="'+(parseInt(y)+i)+'"]')==null || document.querySelector('[x="'+(parseInt(x))+'"][y="'+(parseInt(y)+i)+'"]').style.backgroundColor!="")
            losuj=true;
        }
        



        if(rotacjaWroga===0)
        for(i=0; i<dlugoscStatku+2; i++)
            for(j=0; j<3; j++)
                if(document.querySelector('[x="'+(parseInt(x)-1+i)+'"][y="'+(parseInt(y)-1+j)+'"]')!=null)
                niemozliwePolaKomputera.push(
                    document.querySelector('[x="'+(parseInt(x)-1+i)+'"][y="'+(parseInt(y)-1+j)+'"]')
                )

        if(rotacjaWroga===1)
        for(i=0; i<3; i++)
        for(j=0; j<dlugoscStatku+2; j++)
            if(document.querySelector('[x="'+(parseInt(x)-1+i)+'"][y="'+(parseInt(y)-1+j)+'"]')!=null)
            niemozliwePolaKomputera.push(
                document.querySelector('[x="'+(parseInt(x)-1+i)+'"][y="'+(parseInt(y)-1+j)+'"]')
            )
        
        for(i=0; i<niemozliwePolaKomputera.length; i++)
            niemozliwePolaKomputera[i].style.backgroundColor="red";
        
        if(dlugoscStatku>0)
        document.querySelector('[x="'+(parseInt(x))+'"][y="'+(parseInt(y))+'"]').style.backgroundColor="purple";

        if(rotacjaWroga===0) {
            for(i=1; i<dlugoscStatku; i++)
            document.querySelector('[x="'+(parseInt(x)+i)+'"][y="'+(parseInt(y))+'"]').style.backgroundColor="purple";

        }
        else if(rotacjaWroga===1) {
            for(i=1; i<dlugoscStatku; i++)
            document.querySelector('[x="'+(parseInt(x))+'"][y="'+(parseInt(y)+i)+'"]').style.backgroundColor="purple";
        }
        niemozliwePolaKomputera=[];
    }

    for(i=1; i<=10; i++)
    for(j=1; j<=10; j++) {
        if(document.querySelector('[x="'+i+'"][y="'+j+'"]').style.backgroundColor=="purple")
        document.querySelector('[x="'+i+'"][y="'+j+'"]').setAttribute("statekWroga", "true");

        document.querySelector('[x="'+i+'"][y="'+j+'"]').style.backgroundColor="";

    }

    } else {
        alert("Rozstaw wszystkie statki!");
    }

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

    element(nazwa+"Plansza").innerHTML=tresc;

    for(let i=1; i<=10; i++){
        for(let j=1; j<=10; j++) {
            var x= String.fromCharCode(i+64)+(j);
            element(nazwa+x).setAttribute("x",i);
            element(nazwa+x).setAttribute("y",j);
            
            if(nazwa.includes("polaKomputera"))
            element(nazwa+x).setAttribute("onclick", "klik("+nazwa+x+")")
        }
    }
}