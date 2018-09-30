class Torch extends CustomObject {
    constructor(position, name, onWall) {
        super(position, name)
        this.onWall = onWall
        this.body = this.createBody()
        this.light = this.createLight()
        this.particules = this.createParticules()
        this.state = true
        this.maxIntensity = 1
        this.hasAction = true
    }


    /**
     * Create the body of the torch
     */
    createBody()
    {
        const materialsBody = faceTexture('torch/side-on', 'torch/side-on', 'torch/top-on', 'torch/back')

        const body = new THREE.Mesh(
            new THREE.BoxBufferGeometry(0.6, 2.8, 0.6),
            materialsBody
        )
        body.position.y = 1.2
        if(this.onWall)
        {
            body.rotation.x = Math.PI*0.25
            body.position.y = 1
            body.position.z = 0.8
        }
        this.threeObject.add(body)
        burningSoundManager(this, true)

        return body
    }

    /**
     * Create the light source of the torch
     */
    createLight()
    {
        const light = new THREE.PointLight(0xff4200, this.maxIntensity, 30)
        light.position.y = 2.8
        if(this.onWall)
        {
            light.position.z = 2
        }
        this.threeObject.add(light)

        return light
    }

    /**
     * Create the fire particules of the torch
     */
    createParticules()
    {
        const particules = new Particules(1, 1, 20, 1.5, 3)
        const particulesObject = particules.getThreeObject()
        particulesObject.position.y = 2

        if(this.onWall)
        {
            particulesObject.position.z = 1.7
        }
        this.threeObject.add(particulesObject)
        return particules
    }

    /**
     * Switch the state of the torch (on/off)
     * @param {number} time 
     */
    switch(time)
    {
        this.state ? this.off(time) : this.on(time)
    }

    /**
     * Turned on the torch
     * @param {number} time 
     * @param {boolean} sound 
     */
    on(time = 200, sound = true)
    {
        this.state = true
        this.body.material = faceTexture('torch/side-on', 'torch/side-on', 'torch/top-on', 'torch/back')
        new TWEEN.Tween(this.light)
        .to({intensity: this.maxIntensity}, time)
        .start()
        this.particules.enable(true)
        if(sound)
        {
            audio.playSound(this, 'fire_on')
            burningSoundManager(this, true)
        }
    }

    /**
     * Turned off the torch
     * @param {number} time 
     * @param {boolean} sound 
     */
    off(time = 200, sound = true)
    {
        this.state = false
        this.body.material = faceTexture('torch/side-off', 'torch/side-off', 'torch/top-off', 'torch/back')
        new TWEEN.Tween(this.light)
        .to({intensity: 0}, time)
        .start()
        this.particules.enable(false)
        if(sound)
        {
            audio.playSound(this, 'fire_off')
            burningSoundManager(this, false)
        }
    }
}