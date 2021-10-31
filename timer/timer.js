class Timer {
    constructor(DurationInput,StartButton,PauseButton,callbacks){
        this.DurationInput = DurationInput;
        this.StartButton = StartButton;
        this.PauseButton = PauseButton;
        this.StartButton.addEventListener('click', this.start);
        this.PauseButton.addEventListener('click',this.pause);

        if (callbacks){
            this.onStart = callbacks.onStart;
            this.ontick = callbacks.ontick;
            this.onComplete = callbacks.onComplete;

        }
    }
        
start = ()=>{
    if (this.onStart){
        this.onStart(this.timeRemaining);
    }
    this.tick();
    this.interval = setInterval(this.tick,50);
};

pause = ()=>{
    clearInterval(this.interval);
};

tick = ()=>{
    if (this.timeRemaining <= 0 ){
        this.pause();
        if (this.onComplete){
            this.onComplete();
        }
    }  
    else {
        this.timeRemaining = this.timeRemaining  -0.05;
        if (this.ontick){
            this.ontick(this.timeRemaining);
        }
    }

};
get timeRemaining(){
    return parseFloat(this.DurationInput.value);
};

set timeRemaining(time){
    this.DurationInput.value = time.toFixed(2);
};

}