class UI {
    constructor() {
        this.infoBlock = document.querySelector('.info')
        this.soundButton = document.querySelector('.shortcuts a.sound')
        this.menuButton = document.querySelector('.shortcuts a.menu')
        this.pauseBlock = document.querySelector('.pause')
        this.setSoundButton()
        this.listenButtons()
        this.listenKeydown()
    }

    /**
     * Display text at bottom
     * @param {string} text 
     */
    display(text)
    {
        if(text)
        {
            this.infoBlock.style.display = 'block'
            this.infoBlock.querySelector('p').textContent = text
        }
        else
        {
            this.infoBlock.style.display = 'none'
        }
    }

    /**
     * Listen click on the sound button
     */
    listenButtons()
    {
        this.soundButton.addEventListener('click', (e) =>
        {
            e.preventDefault()
            this.switchSound()
        })
        this.menuButton.addEventListener('click', (e) =>
        {
            e.preventDefault()
            this.pause()
        })
    }

    /**
     * Set state of the sound button
     */
    setSoundButton()
    {
        if(window.localStorage.getItem('sound') == 'true')
        {
            this.soundButton.classList.remove('line')
            audio.listener.setMasterVolume(1)
        }
        else
        {
            this.soundButton.classList.add('line')
            audio.listener.setMasterVolume(0)
        }
    }

    /**
     * Switch state of the sound button
     */
    switchSound()
    {
        if(window.localStorage.getItem('sound') == 'true')
        {
            this.soundButton.classList.add('line')
            audio.listener.setMasterVolume(0)
            window.localStorage.setItem('sound', 'false')
        }
        else
        {
            this.soundButton.classList.remove('line')
            audio.listener.setMasterVolume(1)
            audio.playSound('UI', 'click', true)
            window.localStorage.setItem('sound', 'true')
        }
    }

    /**
     * Listen when Escape or M key is down
     */
    listenKeydown()
    {
        window.addEventListener('keydown', (e) =>
        {
            if(e.code === 'Escape')
            {
                e.preventDefault()
                this.pause()
            }
            else if(e.code === 'Semicolon')
            {
                e.preventDefault()
                this.switchSound()
            }
        })
    }

    /**
     * Toggle pause menu
     */
    pause()
    {
        audio.playSound('UI', 'click', true)
        pause = !pause
        controls.enabled = pause
        this.pauseBlock.style.display = pause ? 'block' : 'none'
        this.menuButton.classList.toggle('line')
    }
}