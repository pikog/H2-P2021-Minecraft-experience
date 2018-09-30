class Bed extends CustomObject {
    constructor(position, name) {
        super(position, name)
        this.createFeet()
        this.createBody()
        this.createPillow()
        this.hasAction = true
        this.actionInProgress = false
    }

    /**
     * Create Feet part of the bed
     */
    createFeet()
    {
        const materialsFoot = faceTexture('bed/feet')

        const feet1 = new THREE.Mesh(
            new THREE.BoxBufferGeometry(1, 1, 1),
            materialsFoot
        )
        feet1.position.x = 0.5
        feet1.position.y = 0.5
        feet1.position.z = 0.5
        this.threeObject.add(feet1)
    
        const feet2 = new THREE.Mesh(
            new THREE.BoxBufferGeometry(1, 1, 1),
            materialsFoot
        )
        feet2.position.x = 0.5 + 8
        feet2.position.y = 0.5
        feet2.position.z = 0.5 
        this.threeObject.add(feet2)
    
        const feet3 = new THREE.Mesh(
            new THREE.BoxBufferGeometry(1, 1, 1),
            materialsFoot
        )
        feet3.position.x = 0.5 + 8
        feet3.position.y = 0.5
        feet3.position.z = 0.5 + 4
        this.threeObject.add(feet3)
    
        const feet4 = new THREE.Mesh(
            new THREE.BoxBufferGeometry(1, 1, 1),
            materialsFoot
        )
        feet4.position.x = 0.5
        feet4.position.y = 0.5
        feet4.position.z = 0.5 + 4
        this.threeObject.add(feet4)
    }

    /**
     * Create body part of the bed
     */
    createBody()
    {
        const materialsBody = faceTexture('bed/front', 'bed/back', 'bed/up', 'bed/down', 'bed/right', 'bed/left')

        const body = new THREE.Mesh(
            new THREE.BoxBufferGeometry(9, 1, 5),
            materialsBody
        )
        body.position.x = 4.5
        body.position.y = 1 + 0.5
        body.position.z = 2.5
        this.threeObject.add(body)
    }

    /**
     * Create pillow part of the bed
     */
    createPillow()
    {
        const materialsPillow = faceTexture('bed/pillow')

        const pillow = new THREE.Mesh(
            new THREE.BoxBufferGeometry(2, 0.5, 5),
            materialsPillow
        )
        pillow.position.x = 1
        pillow.position.y = 1 + 1 + 0.25
        pillow.position.z = 2.5
        this.threeObject.add(pillow)
    }

    /**
     * Launch the sleep and wake up animation of the camera (player)
     * Turing all lights off during the sleep
     */
    sleep()
    {
        if(!this.actionInProgress)
        {
            this.actionInProgress = true
            controls.toggle()

            const lightSources = getAllLightSources()

            for(let source of lightSources)
            {
                source.object.off(2000, false)
            }

            room.off(2000)

            const tween1 = new TWEEN.Tween(camera.position)
                .to({x: this.threeObject.position.x + 1, y: 3, z: this.threeObject.position.z + 2.5}, 2000)
                .onComplete(() =>
                {
                    camera.lookAt(120, 7, 0)
                    window.setTimeout(() =>
                    {
                        for(let source of lightSources)
                        {
                            if(source.state)
                            {
                                source.object.on(2000, false, true)
                            }
                        }
                        room.on(2000)
                        tween4.start()
                    }, 2000)
                })
                .start()

            const tween4 = new TWEEN.Tween(camera.position)
                .delay(2000)
                .to({x: this.threeObject.position.x, y: 7, z: this.threeObject.position.z + 6}, 2000)
                .onComplete(() =>
                {
                    controls.resetView()
                    controls.toggle()
                    this.actionInProgress = false
                })
        }
    }
}