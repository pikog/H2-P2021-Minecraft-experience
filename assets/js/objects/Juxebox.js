class Juxebox extends CustomObject {
    constructor(position, name) {
        super(position, name)
        this.body = this.createBody()
        this.hasAction = true
        this.slots = [
            {position: {x: 0, y: 3.4, z: 0}, rotation: {x: 0, y: 0, z: Math.PI*0.5}}
        ]
    }

    /**
     * Create the body of the juxebox
     */
    createBody()
    {
        const materialsBody = faceTexture('juxebox/side', null, 'juxebox/top')

        const body = new THREE.Mesh(
            new THREE.BoxBufferGeometry(3.4, 3.4, 3.4),
            materialsBody
        )
        body.position.y = 1.7
        this.threeObject.add(body)

        return body
    }

    /**
     * Play the music if a disc is put in it
     * @param {Object} item 
     */
    keepItem(item)
    {
        if(super.keepItem(item))
        {
            this.playMusic()
            return true
        }
        return false
    }

    /**
     * Play the music of the disc in the slot
     */
    playMusic()
    {
        const disc = this.slots[0].item
        if(disc && disc instanceof Disc)
        {
            audio.setMusic(disc.music)
        }
    }
}