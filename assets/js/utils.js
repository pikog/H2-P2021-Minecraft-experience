/**
 * Load textures for blocks and generate materials
 * @param {string} pathFront 
 * @param {string} pathBack 
 * @param {string} pathUp 
 * @param {string} pathDown 
 * @param {string} pathRight 
 * @param {string} pathLeft 
 */
const faceTexture = (pathFront, pathBack, pathUp, pathDown, pathRight, pathLeft) =>
{
    //front, back, up, down, right, left
    let front, back, up, down, right, left

    front = loadTexture(pathFront)

    if(pathBack) { back = loadTexture(pathBack) }
    else { back = front }

    if(pathUp) { up = loadTexture(pathUp) }
    else { up = front }

    if(pathDown) { down = loadTexture(pathDown) }
    else { down = front }

    if(pathRight) { right = loadTexture(pathRight) }
    else { right = front }
    if(pathLeft) { left = loadTexture(pathLeft) }
    else { left = front }
    
    const materials = [
        new THREE.MeshStandardMaterial( { map: front, roughness: 0.5, metalness: 0, transparent: true } ),
        new THREE.MeshStandardMaterial( { map: back, roughness: 0.5, metalness: 0, transparent: true} ),
        new THREE.MeshStandardMaterial( { map: up, roughness: 0.5, metalness: 0, transparent: true } ),
        new THREE.MeshStandardMaterial( { map: down, roughness: 0.5, metalness: 0, transparent: true } ),
        new THREE.MeshStandardMaterial( { map: right, roughness: 0.5, metalness: 0, transparent: true } ),
        new THREE.MeshStandardMaterial( { map: left, roughness: 0.5, metalness: 0, transparent: true } )
    ]

    return materials
}

/**
 * Load texture and applied NearestFilter
 * @param {string} path 
 */
const loadTexture = (path) =>
{
    const texture = textureLoader.load(`assets/images/${path}.png`)
    texture.magFilter = THREE.NearestFilter
    texture.minFilter = THREE.LinearMipMapLinearFilter
    return texture
}

/**
 * Check if a point is inside a polygon
 * @param {[number, number]} point 
 * @param {[[number, number]]} vs 
 */
const inside = (point, vs) =>
{
    let x = point[0], y = point[1]

    let inside = false
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        let xi = vs[i][0], yi = vs[i][1]
        let xj = vs[j][0], yj = vs[j][1]

        let intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
        if (intersect) inside = !inside
    }

    return inside
}

/**
 * Generate walls with holes
 * @param {number} width 
 * @param {number} height 
 * @param {number} depth 
 * @param {[]} holes 
 */
const generateWall = (width, height, depth, holes = []) =>
{
    const wall = new THREE.Shape()
    wall.moveTo(0, 0)
    wall.lineTo(width, 0)
    wall.lineTo(width, height)
    wall.lineTo(0, height)

    for(let hole of holes)
    {
        const holePath = new THREE.Path()
        holePath.moveTo(hole.x, hole.y)
        holePath.lineTo(hole.x + hole.width, hole.y)
        holePath.lineTo(hole.x + hole.width, hole.y + hole.height)
        holePath.lineTo(hole.x, hole.y + hole.height)
        wall.holes.push(holePath)
    }

    return (new THREE.ExtrudeBufferGeometry(wall, {amount: depth, bevelEnabled: false}))
}

/**
 * Get all light sources like torchs and furnaces
 */
const getAllLightSources = () =>
{
    const sources = []
    for(let object in objects)
    {
        if(/(torch|furnace)/.test(object))
        {
            sources.push({object: objects[object], state: objects[object].state})
        }
    }
    return sources
}

/**
 * Check if the object is declared in room
 * @param {object} object 
 * @param {[object]} excludes 
 */
const isInObjects = (object, excludes = []) =>
{
    if(Object.keys(objects).indexOf(object.name) > -1) {
        return objects[object.name]
    }
    else if(excludes.indexOf(object.name) > -1)
    {
        return false
    }
    else if(object.parent)
    {
        return isInObjects(object.parent, excludes)
    }
    else
    {
        return false
    }
}

/**
 * Get the collisioN boxes of all objects
 * @param {object} obstacles 
 */
const getCollisionBoxes = (obstacles) =>
{
    const boxes = []
    for(let obstacle in obstacles)
    {
        const currentObstacle = obstacles[obstacle]
        if(!(Object.getPrototypeOf(currentObstacle) instanceof CustomItem) && !(currentObstacle instanceof CustomItem) && !(currentObstacle instanceof Poster))
        {
            const box = new THREE.Box3()
            box.setFromObject(currentObstacle.getThreeObject())
            box.expandByVector(new THREE.Vector3(0.1, 10, 0.1))
            boxes.push(box)
        }
    }
    return boxes
}

/**
 * Manage random crisp fire sound for torchs and furnaces
 */
burningSoundManager = (elem, play) =>
{
    if(play && !elem.intervalBurningSound)
    {
        elem.intervalBurningSound = window.setInterval(() =>
        {
            Math.random() > 0.6 ? audio.playSound(elem, 'fire') : audio.stopSound(elem, 'fire')
        }, 5000)
    }
    else if(!play && elem.intervalBurningSound)
    {
        clearInterval(elem.intervalBurningSound)
        elem.intervalBurningSound = null
    }
}
