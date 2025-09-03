const buttons = document.querySelectorAll('.key');

buttons.forEach(button => {
    button.addEventListener('click', ()=>{
        const key = button.getAttribute('data-key');

        const audio = document.querySelector(`audio[data-key="${key}"]`);

        if(audio){
            audio.currentTime = 0;
            audio.play();
        }
    });
});

