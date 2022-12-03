window.onload=start;

function element(id) {
    return document.getElementById(id);
}

var trafione=[];
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
                for(i=0; i<podgladStatku.length; i++)
                {
                    statkiGracza.push(podgladStatku[i]);
                    element(podgladStatku[i]).style.backgroundColor="#00ccff";
                }
                podgladStatku=[];
            }
        }

        }, false);
    }

    document.addEventListener('mousemove', e => {
        pole=document.elementFromPoint(e.clientX, e.clientY);
        X=pole.getAttribute("x");
        Y=pole.getAttribute("y");

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
        moznaPostawic=false;

        if(pole.id.includes("polaGracza") && !pole.id.includes("Plansza")) {
            if(wybranyStatek===1 && pole!=null && pole.style.backgroundColor=="") {
                podgladStatku.push(pole.id);
            }
            if(wybranyStatek===2 && pole!=null && pole2!=null && pole.style.backgroundColor=="" && pole2.style.backgroundColor=="") {
                podgladStatku.push(pole.id);
                podgladStatku.push(pole2.id);
            }
            if(wybranyStatek===3 && pole!=null && pole2!=null && pole3!=null && pole.style.backgroundColor=="" && pole2.style.backgroundColor=="" && pole3.style.backgroundColor=="") {
                podgladStatku.push(pole.id);
                podgladStatku.push(pole2.id);
                podgladStatku.push(pole3.id);
            }
            if(wybranyStatek===4 && pole!=null && pole2!=null && pole3!=null && pole4!=null && pole.style.backgroundColor=="" && pole2.style.backgroundColor=="" && pole3.style.backgroundColor=="" && pole4.style.backgroundColor=="") {
                podgladStatku.push(pole.id);
                podgladStatku.push(pole2.id);
                podgladStatku.push(pole3.id);
                podgladStatku.push(pole4.id);
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

function rozpocznij() {
    if(jednomasztowce===0 && dwumasztowce===0 && trzymasztowce===0 && czteromasztowce===0)
    generujTabelke("polaKomputera","red");
}

async function klik(x) {
    if(element(x).innerHTML=="")
    if(flaga) {
        flaga=false;
        if(kolejGracza)
        if(x.includes("polaKomputera")) {
            element(x).innerHTML="•";
            kolejGracza=false;
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
                    if(e.style.backgroundColor=="gray") {
                        e.innerHTML="X";
                        powtorki=true;
                        e.style.backgroundColor="red";
                        console.log(statkiGracza.length);
                        console.log(trafione.length)
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
        }
    }
}