class Furnace extends CustomObject {
    constructor(position, name) {
        super(position, name)
        this.body = this.createBody()
        this.light = this.createLight()
        this.state = false
        this.particules = this.createParticules()
        this.cookPulseRemain = 0
        this.maxIntensity = 1
        this.hasAction = true
        this.slots = [
            {position: {x: 0, y: 3.5, z: 0}}
        ]
    }

    /**
     * Create the body of the furnace
     */
    createBody()
    {
        const materialsBody = faceTexture('furnace/front-off', 'furnace/side', 'furnace/top', 'furnace/top', 'furnace/side', 'furnace/side')

        const body = new THREE.Mesh(
            new THREE.BoxBufferGeometry(3.4, 3.4, 3.4),
            materialsBody
        )
        body.position.y = 1.7
        this.threeObject.add(body)

        return body
    }

    /**
     * Create the light of the front of the furnace when it turned on
     */
    createLight()
    {
        const light = new THREE.PointLight(0xff4200, 0, 20)
        light.position.x = 3
        light.position.y = 0.5
        this.threeObject.add(light)

        return light
    }

    /**
     * Create the fire particules of the front of the furnace when it turned on
     */
    createParticules()
    {
        const particules = new Particules(0.5, 2.5, 30, 1.5, 3)
        const particulesObject = particules.getThreeObject()
        particulesObject.position.x = 1.85
        this.threeObject.add(particulesObject)
        particules.enable(false)
        return particules
    }

    /**
     * Switch state of the furnace (turned on/off)
     * @param {number} time 
     */
    switch(time)
    {
        if(this.state)
        {
            this.off(time)
        }
        else
        {
            this.on(time)
        }
    }

    /**
     * Set on the furnace
     * @param {number} time 
     * @param {boolean} sound 
     * @param {boolean} check 
     */
    on(time = 200, sound = true, check = false)
    {
        if(!check || (check && this.cookPulseRemain > 0))
        {
            this.state = true
            this.body.material = faceTexture('furnace/front-on', 'furnace/side', 'furnace/top', 'furnace/top', 'furnace/side', 'furnace/side')
            new TWEEN.Tween(this.light)
            .to({intensity: this.maxIntensity}, time)
            .start()
            this.particules.enable(true)
        }
    }
    /**
     * Set off the furnace
     * @param {number} time 
     * @param {boolean} sound 
     */
    off(time = 200, sound = true)
    {
        this.state = false
        this.body.material = faceTexture('furnace/front-off', 'furnace/side', 'furnace/top', 'furnace/top', 'furnace/side', 'furnace/side')
        new TWEEN.Tween(this.light)
        .to({intensity: 0}, time)
        .start()
        this.particules.enable(false)     
    }

    /**
     * Turn on the loop to cooked item when we give some fuel in it
     */
    burn()
    {
        hand.removeItem(true)
        burningSoundManager(this, true)
        if(this.cookPulser)
        {
            this.cookPulseRemain += 20
        }
        else
        {
            this.cookPulseRemain = 20
            this.cookPulser = window.setInterval(() =>
            {
                if(this.cookPulseRemain > 0)
                {
                    this.cookPulseRemain--
                    this.cook()
                }
                else
                {
                    window.clearTimeout(this.cookPulser)
                    this.cookPulser = null
                    this.cookPulse = 20
                    burningSoundManager(this, false)
                    this.off()
                }
            }, 1000)
            this.on()
        }
    }
    
    /**
     * Cook item of the top of the furnace
     */
    cook()
    {
        const objectToCook = this.slots[0].item
        if(objectToCook && objectToCook instanceof Steak)
        {
            if(objectToCook.isCooked())
            {
                if(!objectToCook.alreadyCooked)
                {
                    audio.playSound(this, 'ting', true)
                    objectToCook.cook()
                    objectToCook.alreadyCooked = true
                }
            }
            else
            {
                objectToCook.currentCookTime++
            }
        }
    }
}