class CustomItem {
    constructor(name, associatedObject = null) {
        this.threeObject = new THREE.Object3D()
        this.boxCorrectionObject = new THREE.Object3D()
        this.name = name
        this.threeObject.name = name
        this.associatedObject = associatedObject
        this.OBJLoad = false
        this.createOBJ()
        this.isTaken = false
        this.hasAction = true
        this.type = 'item'
    }
    
    /**
     * Import .OBJ and add to threeObject
     */
    createOBJ()
    {
        OBJloader.load(`assets/obj/${this.getOBJType()}.obj`, (object) => 
        {
            this.OBJLoad = true
            object.children[0].material.map = loadTexture('items/items')
            this.boxCorrectionObject.add(object)
            this.threeObject.add(this.boxCorrectionObject)
            this.childObject = object.children[0]
        })
    }

    /**
     * 
     */
    applyBoxCorrection()
    {
        if(this.boxCorrection)
        {
            if(this.boxCorrection.position)
            {
                this.boxCorrectionObject.position.set(
                    this.boxCorrectionObject.position.x + this.boxCorrection.position.x,
                    this.boxCorrectionObject.position.y + this.boxCorrection.position.y,
                    this.boxCorrectionObject.position.z + this.boxCorrection.position.z
                )
            }
            if(this.boxCorrection.scale)
            {
                this.boxCorrectionObject.scale.set(
                    this.boxCorrectionObject.scale.x * this.boxCorrection.scale.x,
                    this.boxCorrectionObject.scale.y * this.boxCorrection.scale.y,
                    this.boxCorrectionObject.scale.z * this.boxCorrection.scale.z
                )
            }
            if(this.boxCorrection.rotation)
            {
                this.boxCorrectionObject.rotation.set(
                    this.boxCorrectionObject.rotation.x + this.boxCorrection.rotation.x,
                    this.boxCorrectionObject.rotation.y + this.boxCorrection.rotation.y,
                    this.boxCorrectionObject.rotation.z + this.boxCorrection.rotation.z
                )
            }
        }
    }

    /**
     * Return type of the item
     */
    getOBJType()
    {
        return (this.name).match(/^([a-z]+)[0-9]?/)[1]
    }

    /**
     * Return title of this item (used for info bar at bottom)
     */
    getTitle()
    {
        return this.title ? this.title : this.getOBJType()
    }

    /**
     * Return Three js container of this item
     */
    getThreeObject()
    {
        return this.threeObject
    }

    /**
     * Take the item in the hand and remove from his block
     */
    take()
    {
        if(this.associatedObject)
        {
            this.associatedObject.removeItem(this)
        }
        hand.takeItem(this)
        this.isTaken = true
        this.threeObject.position.set(0.5, 0, 0.8)
        this.threeObject.scale.set(0.3, 0.3, 0.3)
        this.threeObject.rotation.set(Math.PI * 0.5, 0, 0)
        this.applyTakenCorrection()
    }

    /**
     * Apply position, rotation and scale corrections when we take the item
     */
    applyTakenCorrection()
    {
        if(this.takenCorrection)
        {
            if(this.takenCorrection.position)
            {
                this.threeObject.position.set(
                    this.threeObject.position.x + this.takenCorrection.position.x,
                    this.threeObject.position.y + this.takenCorrection.position.y,
                    this.threeObject.position.z + this.takenCorrection.position.z
                )
            }
            if(this.takenCorrection.scale)
            {
                this.threeObject.scale.set(
                    this.threeObject.scale.x * this.takenCorrection.scale,
                    this.threeObject.scale.y * this.takenCorrection.scale,
                    this.threeObject.scale.z * this.takenCorrection.scale
                )
            }
            if(this.takenCorrection.rotation)
            {
                this.threeObject.rotation.set(
                    this.threeObject.rotation.x + this.takenCorrection.rotation.x,
                    this.threeObject.rotation.y + this.takenCorrection.rotation.y,
                    this.threeObject.rotation.z + this.takenCorrection.rotation.z
                )
            }
        }
    }

    /**
     * Eat the item focused
     */
    eat()
    {
        this.take()
        hand.eat()
    }
}