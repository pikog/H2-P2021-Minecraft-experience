class Controls {
    constructor(camera) {
        this.camera = camera
        this.controls = new THREE.FirstPersonControls(camera)
        this.controls.movementSpeed = 5
        this.controls.lookSpeed = 0.125
        this.controls.lookVertical = true
        this.controls.enabled = true
    }

    /**
     * Toggle camera controls
     */
    toggle()
    {
        this.controls.enabled = !this.controls.enabled
    }

    /**
     * Reset view
     */
    resetView()
    {
        this.controls.lat = 0
        this.controls.lon = 0
    }

    /**
     * Send the polygon of the room for collision with walls
     * @param {[[number, number]]} roomPolygon 
     */
    setRoomPolygon(roomPolygon)
    {
        this.controls.roomPolygon = roomPolygon
    }

    /**
     * Send the boxes for collisions with objects
     * @param {[BoxGeometry]} collisionBoxes 
     */
    setCollisionBoxes(collisionBoxes)
    {
        this.controls.collisionBoxes = collisionBoxes
    }

    /**
     * Lock camera on Y axis
     * @param {number} y 
     */
    lockY(y)
    {
        this.controls.lockY = y
    }
}