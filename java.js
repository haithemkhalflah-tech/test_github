let  counter = document.querySelector(".counter");
let start_time=document.getElementById("start_time");
let last_time = document.querySelector(".last_time");
let record = document.querySelector(".record");
let intervalId = null;
let z_img = document.getElementById("z_img");
let clicksound = new Audio("/music/cursor.mp3");
let running = false;
function increment (){
    if(!running){
    counter.innerHTML=parseFloat(counter.innerHTML)+1;
    clicksound.currentTime=0;
    clicksound.play();
    }
}
function time(){
    if(last_time.innerHTML > 0){
    last_time.innerHTML=parseFloat(last_time.innerHTML)-1;
    
    }else{
        clearInterval(intervalId);
        intervalId = null;
        running = true;
        if(parseInt(record.innerHTML) < parseInt(counter.innerHTML)){
        record.innerHTML=counter.innerHTML;
    }
     counter.innerHTML=0;
    }
}

function start(){
        running=false;
        if (intervalId) clearInterval(intervalId);
        last_time.innerHTML=start_time.value;
        counter.innerHTML=0;
        intervalId =setInterval(time,1000);
        z_img.onclick=increment;
        
    
}
    



