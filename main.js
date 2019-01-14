document.addEventListener('DOMContentLoaded', appStart);

const sounds={
97 :"boom",
115:"clap",
100:"hihat",
102:"kick",
103:"openhat",
104:"ride",
106:"snare",
107:"tink",
108:"tom",
}

const channels={
    channel1:[],
    channel2:[],
    channel3:[],
    channel4:[]
   }
let isRecording=false;
let recStartTime=0;
let radioList;
let checkList;
let clearList;
let divs;
let audioDOM;
function appStart(){

    window.addEventListener('keypress',readKey);

    document.querySelector('#rec').addEventListener('touchstart',recAudio);
    document.querySelector('#play').addEventListener('touchstart',playAudio);
    clearList=document.querySelectorAll(".remove");
    radioList=document.querySelectorAll(".radio-check")   
    checkList=document.querySelectorAll(".check");
    divs= document.querySelectorAll(".sound-button");



    //detecting which div was clicked
    for(let m=0;m<divs.length;m++){
        divs[m].addEventListener("touchstart",function(e){
            
           audioDOM=divs[m].childNodes[1].id;
           playSound(audioDOM);
        })
    }






//removing sounds from a channel
    for(let k=0;k<clearList.length;k++){
        clearList[k].addEventListener("touchstart",function(){
            channels["channel"+(k+1)]=[];
        })
    }
   




    
    radioList.forEach(input=>{
            input.addEventListener('change',checkChange)
               
        })
    
        function checkChange(e){
    e.target.dataset.channel1
        }
     
 
} 




function playAudio(){  
   

   for(let j=0;j<checkList.length;j++){
       
          if(checkList[j].checked===true){
            document.getElementById("check-first").style.display="none";
        channels["channel"+(j+1)].forEach(sound =>{  
            setTimeout(
            
                ()=>{ 
                 const audioDOM = document.querySelector(`#${sound.name}`);
                 audioDOM.currentTime=0;
                 audioDOM.play();
                },sound.time
         
            )
     
     })
    } 
    
    
}
if (checkList[0].checked!=true&&checkList[1].checked!=true&&checkList[2].checked!=true&&checkList[3].checked!=true) {
    
    document.getElementById("check-first").style.display="block";
   
}      
        
    

}

function recAudio(e){
    e.preventDefault();
    e.stopPropagation();
isRecording=!isRecording;
recStartTime=Date.now();
e.target.innerHTML=isRecording?'Stop':'Record';
if(isRecording){
    e.target.style.background="rgb(255, 89, 89)";
playAudio();}
else{
    e.target.style.background="rgb(160, 160, 160)";
}
}



function readKey(e){
    e.preventDefault();

if(!sounds[e.charCode]){
    return
}

 const soundName = sounds[e.charCode];



playSound(soundName);
}


function playSound(soundName){
 audioDOM = document.querySelector(`#${soundName}`);
 audioDOM.currentTime=0; 
 audioDOM.play();
 


 


if(isRecording){
 
    for(let i=0;i<radioList.length;i++){

        if(radioList[i].checked===true){
    
      channels["channel"+(i+1)].push(
          {
      name: soundName,
      time:Date.now() - recStartTime
      }
      )
      }
  
      }
   
}

}

