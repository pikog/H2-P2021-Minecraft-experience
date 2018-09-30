class SimpleBlock extends CustomObject {
    constructor(position, name) {
        super(position, name)
        this.createBody()
        this.hasAction = true
        this.slots = [
            {position: {x: 0, y: 3.5, z: 0}}
        ]
    }

    /**
     * Create the body of the common block
     */
    createBody()
    {
        const body = new THREE.Mesh(
            new THREE.BoxBufferGeometry(3.4, 3.4, 3.4),
            this.getMaterial()
        )
        body.position.y = 1.7
        this.threeObject.add(body)

        return body
    }

    /**
     * Return the type of this block
     */
    getBlockType()
    {
        return (this.name).match(/^([a-z]+)[0-9]?/)[1]
    }

    /**
     * Return the material of this block in function to his type
     */
    getMaterial()
    {
        const materials = {
            bookshelf: faceTexture(`bookshelf/front`, 'bookshelf/front', 'bookshelf/side', 'bookshelf/side', 'bookshelf/side', 'bookshelf/side'),
            crafting: faceTexture(`crafting/front`, 'crafting/front', 'crafting/top', 'crafting/top', 'crafting/side', 'crafting/side'),
            wool: faceTexture(`wool/front`),
            cobblestone: faceTexture(`cobblestone/front`),
            emerald: faceTexture(`emerald/front`)
        }
        return materials[this.getBlockType()]
    }
}