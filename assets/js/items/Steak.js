class Steak extends CustomItem {
    constructor(name, associatedObject) {
        super(name, associatedObject)
        this.currentCookTime = 0
        this.neededCookTime = 5
        this.boxCorrection = {
            position: {x:0, y:-0.1, z:0}
        }
        this.alreadyCooked = false
    }

    /**
     * Change the steak to a cooked texture
     */
    cook()
    {
        if(this.OBJLoad)
        {
            this.childObject.material.map = loadTexture('items/items-cooked')
        }
    }

    /**
     * Return if the steak is cooked or not
     */
    isCooked()
    {
        return this.currentCookTime > this.neededCookTime
    }

    /**
     * Add the cooked state of the steak in the title
     */
    getTitle()
    {
        return this.isCooked() ? 'cooked steak' : 'raw steak'
    }
}