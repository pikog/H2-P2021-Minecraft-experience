class Hand {
    constructor() {
        this.threeObject = new THREE.Object3D()
        this.threeObject.position.set(1.2, -1.5, 0)
        this.threeObject.rotation.x = Math.PI * 0.15
        this.threeObject.rotation.y = Math.PI
        this.name = name
        this.threeObject.name = name
        this.hand = this.createHand()
        this.eating = false
    }

    /**
     * Create hand three js object
     */
    createHand()
    {
        const materialsHand = faceTexture('hand/side')

        const hand = new THREE.Mesh(
            new THREE.BoxBufferGeometry(0.5, 0.5, 2.1),
            materialsHand
        )
        hand.position.z = 1.05
        hand.rotation.y = - Math.PI * 0.15
        hand.rotation.z = Math.PI * 0.25
        this.threeObject.add(hand)

        return hand
    }

    /**
     * Return three js object
     */
    getThreeObject()
    {
        return this.threeObject
    }

    /**
     * Add item in hand
     * @param {Item} item 
     */
    takeItem(item)
    {
        if(!this.take)
        {
            this.take = item
            this.hand.add(item.getThreeObject())
            audio.playSound('hand', 'take', true)
        }
    }

    /**
     * Remove item from the hand
     * @param {boolean} completeRemove 
     */
    removeItem(completeRemove = false)
    {
        if(completeRemove)
        {
            delete objects[this.take.name]
        }
        this.take.isTaken = false
        this.hand.remove(this.take.threeObject)
        this.take = null
        audio.playSound('hand', 'place', true)
    }

    /**
     * Eat item in hand
     */
    eat()
    {
        const time = 1500
        if(this.take)
        {
            this.eating = true
            new TWEEN.Tween(this.hand.position)
            .to({x: 0.3, y: 0.4, z: 1}, time)
            .start()

            new TWEEN.Tween(this.hand.rotation)
            .to({x: -Math.PI * 0.3, y: Math.PI * 0.15}, time)
            .onComplete(() =>
            {
                audio.playSound('hand', 'eat', true)
                this.removeItem(true)
                tweenResetPos.start()
                tweenResetRotation.start()
            })
            .start()

            const tweenResetPos = new TWEEN.Tween(this.hand.position)
            .to({x: 0, y: 0, z: 1.05}, time)

            const tweenResetRotation = new TWEEN.Tween(this.hand.rotation)
            .to({x: 0, y: - Math.PI * 0.15, z: Math.PI * 0.25}, time)
            .onComplete(() =>
            {
                this.take = null
                this.eating = false
            })
        }
    }
}