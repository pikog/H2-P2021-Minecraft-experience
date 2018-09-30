class Poster extends CustomObject {
    constructor(position, name, texture = null, size = [0.5, 0.5]) {
        super(position, name)
        this.size = size
        this.texture = texture
        this.createBody()
    }

    /**
     * Create the frame of the poster and set its content
     */
    createBody()
    {
        if(!this.texture)
        {
                this.texture = 'back'
        }
        const materialsBody = faceTexture(`poster/${this.texture}`, 'poster/back', 'poster/back', 'poster/back', 'poster/back', 'poster/back')

        const body = new THREE.Mesh(
            new THREE.BoxBufferGeometry(0.2, this.size[1], this.size[0]),
            materialsBody
        )
        body.position.x = 0.1
        this.threeObject.add(body)

        return body
    }
}