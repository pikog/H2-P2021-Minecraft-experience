class Window extends CustomObject {
    constructor(position, name, number) {
        super(position, name)
        this.number = number
        this.createBody()
    }

    /**
     * Create the glass of the window
     */
    createBody()
    {
        const texture = loadTexture('windows/front')
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(this.number, 1)

        const body = new THREE.Mesh(
            new THREE.BoxBufferGeometry(0.6, 6, this.number*6),
            new THREE.MeshLambertMaterial({ map: texture, transparent: true, side: THREE.DoubleSide})
        )
        body.position.x = -1
        body.position.y = 3
        body.position.z = - this.number*3
        body.rotation.y = Math.PI
        this.threeObject.add(body)

        return body
    }
}