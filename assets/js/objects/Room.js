class Room {
    constructor() {
        this.threeObject = new THREE.Object3D()
        this.createFloor()
        this.createRoof()
        this.createWalls()
        this.createBackground()
        this.state = true
        this.dayIntensity = 0.9
        this.nightIntensity = 0.3
        this.ambientLight = this.createAmbientLight()
    }

    /**
     * Create the spherical background inspired by 360 panorama
     */
    createBackground()
    {
        const texture = loadTexture('background')
        const bg = new THREE.Mesh(
            new THREE.SphereBufferGeometry(60, 60, 40),
            new THREE.MeshLambertMaterial({map: texture, side: THREE.DoubleSide})
        )
        this.threeObject.add(bg)
    }

    /**
     * Create the floor of the room
     */
    createFloor()
    {
        const texture = loadTexture('room/floor')
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(10, 10)
        const floor = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(35, 35),
            new THREE.MeshStandardMaterial({ map: texture, roughness: 1, metalness: 0 })
        )
        floor.rotation.x = - Math.PI * 0.5
        this.threeObject.add(floor)
    }

    /**
     * Create the roof of the room
     */
    createRoof()
    {
        const texture = loadTexture('room/roof')
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(10, 10)

        const roof = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(40, 40),
            new THREE.MeshStandardMaterial({ map: texture, roughness: 0.8, metalness: 0 })
        )
        roof.position.y = 12
        roof.rotation.x = Math.PI * 0.5
        roof.receiveShadow = true
        this.threeObject.add(roof)
    }

    /**
     * Create the walls of the room
     */
    createWalls()
    {

        const texture = loadTexture('room/walls')
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(0.2, 0.2)

        const materialWalls = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.8, metalness: 0 })
        const depth = 2

        const frontWallP1 = new THREE.Mesh(
            generateWall(12.5, 12, depth),
            materialWalls
        )
        frontWallP1.position.x = - 17.5
        frontWallP1.position.z = - 12.5 - depth
        this.threeObject.add(frontWallP1)

        const frontWallP2 = new THREE.Mesh(
            generateWall(5, 12, depth),
            materialWalls
        )
        frontWallP2.position.x = - 5 - depth
        frontWallP2.position.z = - 12.5 - depth
        frontWallP2.rotation.y = Math.PI * 0.5
        this.threeObject.add(frontWallP2)

        const frontWallP3 = new THREE.Mesh(
            generateWall(22.5 + depth, 12, depth, [
                {x: 8, y: 4, width: 12, height: 6}
            ]),
            materialWalls
        )
        frontWallP3.position.x = - 5
        frontWallP3.position.z = - 17.5 - depth
        this.threeObject.add(frontWallP3)

        const leftWall = new THREE.Mesh(
            generateWall(30 + depth, 12, depth),
            materialWalls
        )
        leftWall.position.x = - 17.5 - depth
        leftWall.position.z = 17.5
        leftWall.rotation.y = Math.PI * 0.5
        this.threeObject.add(leftWall)

        const rightWall = new THREE.Mesh(
            generateWall(35 + depth, 12, depth, [
                {x: 12.5, y: 0, width: 10, height: 9}
            ]),
            materialWalls
        )
        rightWall.position.x = 17.5 + depth
        rightWall.position.z = - 17.5
        rightWall.rotation.y =  - Math.PI * 0.5
        this.threeObject.add(rightWall)

        const backWall = new THREE.Mesh(
            generateWall(35 + depth, 12, depth, [
                {x: 13, y: 4, width: 18, height: 6}
            ]),
            materialWalls
        )
        backWall.position.x = 17.5
        backWall.position.z = 17.5 + depth
        backWall.rotation.y = Math.PI
        this.threeObject.add(backWall)
    }

    /**
     * Create the ambient light of the room
     */
    createAmbientLight()
    {
        const ambientLight = new THREE.AmbientLight(0xffffff)
        ambientLight.intensity = this.dayIntensity
        this.threeObject.add(ambientLight)

        return ambientLight
    }

    /**
     * Turn on the ambient light
     * @param {number} time 
     */
    on(time = 1000)
    {
        new TWEEN.Tween(this.ambientLight)
        .to({intensity: this.state ? this.nightIntensity : this.dayIntensity}, time)
        .start()
        this.state = !this.state
    }

    /**
     * Turn off the ambient light
     * @param {number} time 
     */
    off(time = 1000)
    {
        new TWEEN.Tween(this.ambientLight)
        .to({intensity: 0}, time)
        .start()
    }

    /**
     * Return Three js container of the room
     */
    getThreeObject()
    {
        return this.threeObject
    }

}
