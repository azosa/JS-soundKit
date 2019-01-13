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
function appStart(){

    window.addEventListener('keypress',playSound);
    document.querySelector('#rec').addEventListener('click',recAudio);
    document.querySelector('#play').addEventListener('click',playAudio);
 
    radioList=document.querySelectorAll(".radio-check");

    radioList.forEach(input=>{
            input.addEventListener('change',checkChange)
               
        })
    
        function checkChange(e){
    e.target.dataset.channel1
        }
     
 
} 




function playAudio(){

channel1.forEach(sound =>{
   setTimeout(
       ()=>{
        const audioDOM = document.querySelector(`#${sound.name}`);
        audioDOM.currentTime=0;
        audioDOM.play();
       },sound.time

   )
})
}

function recAudio(e){
isRecording=!isRecording;
recStartTime=Date.now();
e.target.innerHTML=isRecording?'Stop':'Record';
}

function playSound(e){


if(!sounds[e.charCode]){
    return
} 

const soundName = sounds[e.charCode];

 const audioDOM = document.querySelector(`#${soundName}`);
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
      else continue
      }
}


}
