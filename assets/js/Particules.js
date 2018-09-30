class Particules {
    constructor(width, depth, factor, minHeight, maxHeight, colors = ['#ff8d00', '#fffeff', '#fffe95', '#ffd600']) {
        this.threeObject = new THREE.Object3D()
        this.threeObject.name = 'particules'
        this.width = width
        this.depth = depth
        this.factor = factor
        this.minHeight = minHeight
        this.maxHeight = maxHeight
        this.colors = colors
        this.enabled = true
        this.generateParticules()
        particulesInstances.push(this)
    }

    /**
     * Generate random particules in the rectangle with different colors and random positions
     */
    generateParticules()
    {
        for(let color of this.colors)
        {
            const currentParticulesContainer = new THREE.Geometry()

            for(let i = 0; i < this.factor * this.minHeight * this.width * this.depth; i++)
            {
                const point = new THREE.Vector3()
    
                point.x = (Math.random() - 0.5) * this.width
                point.z = (Math.random() - 0.5) * this.depth
    
                point.y = Math.random() * this.minHeight
    
                currentParticulesContainer.vertices.push(point)
            }

            const particules = new THREE.Points(
                currentParticulesContainer,
                new THREE.PointsMaterial({size: 0.1, color: new THREE.Color(color)})
            )
            particules.name = 'particules-container'
            this.threeObject.add(particules)
        }
    }

    /**
     * Function cal; in loop to move the particule
     * Reset position of particule to bottom when they reached the max height
     */
    update()
    {
        if(this.enabled)
        {
            for(let particulesContainer of this.threeObject.children)
            {
                if(particulesContainer.name == 'particules-container')
                {
                    const points = particulesContainer.geometry.vertices
                    for(let i = 0; i < points.length; i++)
                    {
                        const point = points[i]
                        point.y += 0.01 * Math.random()
                        if((point.y >= this.minHeight && Math.random() > 0.98) || point.y >= this.maxHeight)
                        {
                            point.y = 0
                        }
                    }
            
                    particulesContainer.geometry.verticesNeedUpdate = true
                }
            }
        }
    }

    /**
     * Enable/disable particules
     * @param {boolean} state 
     */
    enable(state)
    {
        this.enabled = state
        this.threeObject.visible = state
    }

    /**
     * return Three.js object
     */
    getThreeObject()
    {
        return this.threeObject
    }
}