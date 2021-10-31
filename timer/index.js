const DurationInput = document.querySelector('#duration');
const StartButton = document.querySelector('#start');
const PauseButton = document.querySelector('#pause');
const circle = document.querySelector('circle');
const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

let duration ;
const timer = new Timer(DurationInput,StartButton,PauseButton,{
    onStart(totalDuration) {
        console.log('timer started');
        duration = totalDuration
    },
    ontick(timeRemaining){
       circle.setAttribute('stroke-dashoffset',
       perimeter * timeRemaining / duration - perimeter
       );
      
    },
    onComplete(){
        console.log('timer completed');
    }
});
