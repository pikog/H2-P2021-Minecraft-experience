class Doors extends CustomObject {
    constructor(position, name) {
        super(position, name)
        this.createDoors()
        this.createFrame()
    }

    /**
     * Create the flat door face
     */
    createDoors()
    {
        const materialsDoors = faceTexture(`doors/front`, 'doors/side', 'doors/side', 'doors/side', 'doors/side', 'doors/side')

        const doors = new THREE.Mesh(
            new THREE.BoxBufferGeometry(0.5, 9, 10),
            materialsDoors
        )
        doors.position.x = 0.25
        doors.position.y = 4.5
        this.threeObject.add(doors)

        return doors
    }

    /**
     * Create the frame at back to give some thickness
     */
    createFrame()
    {
        const texture = loadTexture('doors/side')

        const frame = new THREE.Mesh(
            generateWall(10, 4, 0.5, [
                {x: 0.9, y: 0.9, width: 1.2, height: 0.9},
                {x: 0.9, y: 2.2, width: 1.2, height: 0.9},
                {x: 2.5, y: 0.9, width: 1.2, height: 0.9},
                {x: 2.5, y: 2.2, width: 1.2, height: 0.9},
                {x: 0.9 + 5.3, y: 0.9, width: 1.2, height: 0.9},
                {x: 0.9 + 5.3, y: 2.2, width: 1.2, height: 0.9},
                {x: 2.5 + 5.3, y: 0.9, width: 1.2, height: 0.9},
                {x: 2.5 + 5.3, y: 2.2, width: 1.2, height: 0.9}
            ]),
            new THREE.MeshLambertMaterial({ map: texture })
        )
        frame.position.x = 0.49
        frame.position.y = 5
        frame.position.z = -5
        frame.rotation.y = -Math.PI*0.5
        this.threeObject.add(frame)
    }
}