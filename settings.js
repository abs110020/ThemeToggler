const toggles = document.querySelectorAll(".settings [type='checkbox']");
const radios = document.querySelectorAll(".settings [type='radio']");
const audioCheck = document.querySelector("#audio-check");
const audioToggle = document.querySelector("#audio-toggle");
let isPlay;
const doc = document.documentElement;

function playAudio(type){
    if(isPlay){
       const sound = type === "check"? audioCheck : audioToggle;
        sound.currentTime = 0;
        sound.play();
    }
}
function updateUI({name, value}){
    if(name === "customColor"){
        return doc.style.setProperty("--customColor", `var(--${value})`);
    }
    return (doc.dataset[name] = value);
}
toggles.forEach((toggle)=>{
      toggle.addEventListener("change",(e)=>{
            const {name, checked} = e.target;
            updateUI({name,value:checked});
            localStorage.setItem(name,checked);
            if(name === "sound"){
                isPlay = checked;
            }
            playAudio("toggle");

      });
});

radios.forEach((radio)=>{
    radio.addEventListener("change",(e)=>{
            const {name, id} = e.target;
            updateUI({name,value:id});
            localStorage.setItem(name,id);
            playAudio("check");
      });
});


   