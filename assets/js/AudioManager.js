class AudioManager {
    constructor() {
        this.listener = new THREE.AudioListener()
        this.music = this.createMusic()
        this.sounds = {}
    }

    /**
     * Create ambiant music
     */
    createMusic()
    {
        const music = new THREE.Audio(this.listener)
        music.setLoop(true)
        return music
    }

    /**
     * Set ambient music
     * @param {string} music 
     */
    setMusic(music)
    {
        audioLoader.load(`assets/sounds/musics/${music}.ogg`, (buffer) =>
        {
            this.music.setBuffer(buffer)
            this.music.play()
        })
    }

    /**
     * Stop ambient music
     */
    stopMusic()
    {
        this.music.stop()
    }

    /**
     * Play sound associated of an instance/object
     * @param {Object} instance 
     * @param {string} soundName 
     * @param {boolean} general 
     * @param {number} volume 
     * @param {number} distance 
     * @param {boolean} loop 
     */
    playSound(instance, soundName, general = false, volume = 1, distance = 5, loop = false)
    {
        const instanceName = typeof instance === "string" ? instance : instance.name

        if(this.sounds[instanceName] && this.sounds[instanceName][soundName])
        {
            const sound = this.sounds[instanceName][soundName]
            sound.setVolume(volume)
            if(!(typeof instance === "string" || general))
            {
                sound.setRefDistance(distance)
            }
            sound.setLoop(loop)
            if(sound.isPlaying)
            {
                sound.stop()
                sound.play()
            }
            else
            {
                sound.play()
            }
        }
        else
        {
            let sound
            if(typeof instance === "string" || general)
            {
                sound = new THREE.Audio(audio.listener)
            }
            else
            {
                sound = new THREE.PositionalAudio(audio.listener)
            }

            audioLoader.load(`assets/sounds/${soundName}.ogg`, (buffer) =>
            {
                sound.setBuffer(buffer)
                sound.setVolume(volume)
                if(!(typeof instance === "string" || general))
                {
                    sound.setRefDistance(distance)
                }
                sound.setLoop(loop)
                sound.play()
            })
            if(!(typeof instance === "string" || general))
            {
                instance.threeObject.add(sound)
            }

            if(!this.sounds[instanceName])
            {
                this.sounds[instanceName] = {}
            }

            this.sounds[instanceName][soundName] = sound
        }
    }

    /**
     * Stop a sound of an instance/object
     * @param {Object} instance 
     * @param {string} soundName 
     */
    stopSound(instance, soundName)
    {
        const instanceName = typeof instance === "string" ? instance : instance.name

        if(this.sounds[instanceName] && this.sounds[instanceName][soundName])
        {
            const sound = this.sounds[instanceName][soundName]
            if(sound)
            {
                sound.stop()
            }
        }
    }

    /**
     * Pause a sound of an instance/object
     * @param {Object} instance 
     * @param {string} soundName 
     */
    pauseSound(instance, soundName)
    {
        const instanceName = typeof instance === "string" ? instance : instance.name

        if(this.sounds[instanceName] && this.sounds[instanceName][soundName])
        {
            const sound = this.sounds[instanceName][soundName]
            if(sound)
            {
                sound.pause()
            }
        }
    }
}