class Disc extends CustomItem {
    constructor(name, associatedObject, music) {
        super(name, associatedObject)
        this.music = music
    }

    /**
     * Import Disc .OBJ and add to threeObject
     */
    createOBJ()
    {
        OBJloader.load(`assets/obj/${this.name}.obj`, (object) => 
        {
            this.OBJLoad = true
            object.children[0].material.map = loadTexture('items/items')
            this.boxCorrectionObject.add(object)
            this.threeObject.add(this.boxCorrectionObject)
            this.childObject = object.children[0]
        })
    }

    /**
     * Over pass the title to add also the music associated
     */
    getTitle()
    {
        return `disc ${this.music}`
    }

    /**
     * Stop the music from the juxebox when we take the dic in the hand
     */
    take()
    {
        if(this.associatedObject instanceof Juxebox)
        {
            audio.stopMusic()
        }
        super.take()
    }
}