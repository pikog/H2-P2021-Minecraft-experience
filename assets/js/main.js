/**
 * Init loader
 */
let OBJloader, audioLoader, textureLoader
const createLoader = () =>
{
    OBJloader = new THREE.OBJLoader()
    audioLoader = new THREE.AudioLoader()
    textureLoader = new THREE.TextureLoader()
}

/**
 * Create room
 */
let room
const createRoom = () =>
{
    room = new Room()
    scene.add(room.getThreeObject())
}

/**
 * Create camera
 */
let camera, windowWidth, windowHeight
const createCamera = () =>
{
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight
    camera = new THREE.PerspectiveCamera(70, windowWidth / windowHeight)
    camera.position.y = 7
    scene.add(camera)
}

/**
 * Create AudioManager
 */
let audio
const createAudioManager = () =>
{
    audio = new AudioManager()
    camera.add(audio.listener)
}

/**
 * Create UI
 */
let ui
const createUI = () =>
{
    ui = new UI()
}

/**
 * Create Hand
 */
let hand
const createHand = () =>
{
    hand = new Hand()
    camera.add(hand.getThreeObject())
}

/**
 * Create objects in room
 */
const objects = {}
const addObjects = () =>
{
    objects.chest1 = new Chest({x:7.25, y:0, z:11.5}, 'chest1')

    objects.chest2 = new Chest({x:-11.5, y:0, z:-12.25}, 'chest2')
    objects.chest2.rotation(0, -Math.PI*0.5, 0)

    objects.bed = new Bed({x:-5, y:0, z:-17.5}, 'bed')
    objects.bed.scale(1.25, 1, 1)

    objects.itemholder1 = new Poster({x:1, y:0, z:-13.5}, 'itemholder1')
    objects.itemholder1.rotation(0, 0, Math.PI*0.5)
    objects.itemholder1.slots = [
        {rotation:{x:Math.PI*0.9, y:0, z:Math.PI*0.5}, position: {x:0.3, y:0, z:0}}
    ]

    objects.itemholder2 = new Poster({x:-1, y:6, z:-17.5}, 'itemholder2')
    objects.itemholder2.rotation(0, Math.PI*1.5, 0)
    objects.itemholder2.slots = [
        {rotation:{x:Math.PI, y:0, z:Math.PI*0.5}, position: {x:0.3, y:0, z:0}}
    ]

    objects.itemholder3 = new Poster({x:8, y:0, z:-5}, 'itemholder3')
    objects.itemholder3.rotation(0, 0, Math.PI*0.5)
    objects.itemholder3.slots = [
        {rotation:{x:Math.PI*1.2, y:0, z:Math.PI*0.5}, position: {x:0.3, y:0, z:0}}
    ]

    objects.itemholder4 = new Poster({x:14, y:0, z:6}, 'itemholder4')
    objects.itemholder4.rotation(0, 0, Math.PI*0.5)
    objects.itemholder4.slots = [
        {rotation:{x:Math.PI*1.6, y:0, z:Math.PI*0.5}, position: {x:0.3, y:0, z:0}}
    ]

    objects.itemholder5 = new Poster({x:-14, y:7, z:-12.5}, 'itemholder5')
    objects.itemholder5.rotation(0, Math.PI*1.5, 0)
    objects.itemholder5.slots = [
        {rotation:{x:Math.PI, y:0, z:Math.PI*0.5}, position: {x:0.3, y:0, z:0}}
    ]

    objects.itemholder6 = new Poster({x:-6, y:0, z:7}, 'itemholder6')
    objects.itemholder6.rotation(0, 0, Math.PI*0.5)
    objects.itemholder6.slots = [
        {rotation:{x:Math.PI*0.3, y:0, z:Math.PI*0.5}, position: {x:0.3, y:0, z:0}}
    ]

    objects.itemframe1 = new Poster({x:-17.5, y:6.5, z:13}, 'itemframe1', 'itemframe', [3.5, 3.5])
    objects.itemframe1.slots = [
        {rotation:{x:Math.PI, y:0, z:Math.PI*0.5}, position: {x:0.3, y:0, z:0}}
    ]

    objects.itemframe2 = new Poster({x:-17.5, y:6.5, z:6.5}, 'itemframe2', 'itemframe', [3.5, 3.5])
    objects.itemframe2.slots = [
        {rotation:{x:Math.PI, y:0, z:Math.PI*0.5}, position: {x:0.3, y:0, z:0}}
    ]

    objects.itemframe3 = new Poster({x:-17.5, y:6.5, z:0}, 'itemframe3', 'itemframe', [3.5, 3.5])
    objects.itemframe3.slots = [
        {rotation:{x:Math.PI, y:0, z:Math.PI*0.5}, position: {x:0.3, y:0, z:0}}
    ]

    objects.itemframe4 = new Poster({x:-17.5, y:6.5, z:-6.5}, 'itemframe4', 'itemframe', [3.5, 3.5])
    objects.itemframe4.slots = [
        {rotation:{x:Math.PI, y:0, z:Math.PI*0.5}, position: {x:0.3, y:0, z:0}}
    ]

    objects.doors = new Doors({x:17.5, y:0, z:0}, 'doors')
    objects.doors.rotation(0, Math.PI, 0)

    objects.window1 = new Window({x:4.5, y:4, z:17.5}, 'window1', 3)
    objects.window1.rotation(0, Math.PI*0.5, 0)

    objects.window2 = new Window({x:3, y:4, z:-17.5}, 'window2', 2)
    objects.window2.rotation(0, Math.PI*1.5, 0)

    objects.bookshelf1 = new SimpleBlock({x:1, y:0, z:15}, 'bookshelf1')
    objects.bookshelf1.rotation(0, Math.PI*0.5, 0)

    objects.bookshelf2 = new SimpleBlock({x:-2.4, y:0, z:15}, 'bookshelf2')
    objects.bookshelf2.rotation(0, Math.PI*0.5, 0)

    objects.bookshelf3 = new SimpleBlock({x:-5.8, y:0, z:15}, 'bookshelf3')
    objects.bookshelf3.rotation(0, Math.PI*0.5, 0)

    objects.bookshelf4 = new SimpleBlock({x:-9.2, y:0, z:15}, 'bookshelf4')
    objects.bookshelf4.rotation(0, Math.PI*0.5, 0)

    objects.crafting1 = new SimpleBlock({x:-14, y:0, z:15}, 'crafting1')
    objects.crafting1.rotation(0, Math.PI*0.5, 0)

    objects.furnace1 = new Furnace({x:15, y:0, z:-15}, 'furnace1')
    objects.furnace1.rotation(0, Math.PI, 0)

    objects.furnace2 = new Furnace({x:15, y:0, z:-11}, 'furnace2')
    objects.furnace2.rotation(0, Math.PI, 0)

    objects.poster1 = new Poster({x:11, y:7, z:17.5}, 'poster1', 'poster', [10, 5])
    objects.poster1.rotation(0, Math.PI*0.5, 0)

    objects.poster2 = new Poster({x:17.5, y:7, z:-12}, 'poster2', 'poster2', [7, 3.5])
    objects.poster2.rotation(0, Math.PI, 0)

    objects.poster3 = new Poster({x:-8.5, y:6, z:-12.5}, 'poster3', 'poster3', [3.5, 7])
    objects.poster3.rotation(0, Math.PI*1.5, 0)

    objects.emerald1 = new SimpleBlock({x:-15, y:0, z:4.5}, 'emerald1')

    objects.cobblestone1 = new SimpleBlock({x:-15, y:0, z:9}, 'cobblestone1')

    objects.wool1 = new SimpleBlock({x:-15, y:-1.7, z:0}, 'wool1')
    objects.wool1.slots = []

    objects.torch1 = new Torch({x:-15, y:1.7, z:0}, 'torch1', false)

    objects.torch2 = new Torch({x:17.5, y:6, z:-7}, 'torch2', true)
    objects.torch2.rotation(0, Math.PI*1.5, 0)

    objects.torch3 = new Torch({x:17.5, y:6, z:7}, 'torch3', true)
    objects.torch3.rotation(0, Math.PI*1.5, 0)

    objects.juxebox1 = new Juxebox({x:5, y:0, z:15}, 'juxebox1')
    objects.juxebox1.rotation(0, Math.PI*0.5, 0)

    objects.steak1 = new Steak('steak1', objects.chest1)

    objects.steak2 = new Steak('steak2', objects.chest1)

    objects.charcoal1 = new CustomItem('charcoal1', objects.chest2)
    objects.charcoal1.takenCorrection = {
        position: {x: 0.1, y: 0, z: 0},
        rotation: {x: 0, y: Math.PI, z: 0}
    }

    objects.charcoal2 = new CustomItem('charcoal2', objects.itemholder6)
    objects.charcoal2.takenCorrection = {
        position: {x: 0.1, y: 0, z: 0},
        rotation: {x: 0, y: Math.PI, z: 0}
    }

    objects.charcoal3 = new CustomItem('charcoal3', objects.cobblestone1)
    objects.charcoal3.takenCorrection = {
        position: {x: 0.1, y: 0, z: 0},
        rotation: {x: 0, y: Math.PI, z: 0}
    }
    
    objects.disc1 = new Disc('disc1', objects.juxebox1, 'calm2')

    objects.disc2 = new Disc('disc2', objects.itemholder1, 'calm3')

    objects.disc3 = new Disc('disc3', objects.itemholder2, 'hal4')

    objects.disc4 = new Disc('disc4', objects.itemholder3, 'piano3')

    objects.disc5 = new Disc('disc5', objects.itemholder4, 'piano2')

    objects.sword = new CustomItem('sword', objects.itemframe1)
    objects.sword.takenCorrection = {
        position: {x: 0.2, y: 0.05, z: 0},
        rotation: {x: 0, y: Math.PI*0.8, z: 0},
        scale: 1.7
    }

    objects.pickaxe = new CustomItem('pickaxe', objects.itemframe2)
    objects.pickaxe.takenCorrection = {
        position: {x: 0.2, y: 0.05, z: 0},
        rotation: {x: 0, y: Math.PI*0.8, z: 0},
        scale: 1.7
    }

    objects.wheat1 = new CustomItem('wheat1', objects.itemframe3)
    objects.wheat1.takenCorrection = {
        position: {x: 0.1, y: 0.05, z: 0},
        rotation: {x: 0, y: Math.PI*0.8, z: 0}
    }

    objects.creeper = new CustomItem('creeper', objects.itemframe4)
    objects.creeper.takenCorrection = {
        position: {x: 0.1, y: 0, z: 0},
        rotation: {x: 0, y: Math.PI, z: 0}
    }

    objects.saphir1 = new CustomItem('saphir1', objects.itemholder5)

    objects.axe = new CustomItem('axe', objects.chest2)
    objects.axe.takenCorrection = {
        position: {x: 0.05, y: 0.05, z: 0},
        rotation: {x: 0, y: Math.PI*0.85, z: 0},
        scale: 1.7
    }

    objects.eye = new CustomItem('eye', objects.chest2)

    objects.apple = new CustomItem('apple', objects.chest1)
    objects.apple.takenCorrection = {
        position: {x: 0.1, y: 0, z: 0},
        rotation: {x: 0, y: Math.PI, z: 0}
    }

    objects.shovel = new CustomItem('shovel', objects.bookshelf3)
    objects.shovel.takenCorrection = {
        position: {x: 0.05, y: 0, z: 0},
        rotation: {x: 0, y: Math.PI*0.8, z: 0},
        scale: 1.7
    }

    for(let object in objects)
    {
        const currentObject = objects[object]
        if(currentObject.associatedObject)
        {
            currentObject.associatedObject.keepItem(currentObject)
        }
        else
        {
            room.getThreeObject().add(currentObject.getThreeObject())
        }
    }
}

/**
 * Create controls associated to the camera
 */
let controls
const createControls = () =>
{
    controls = new Controls(camera)
    controls.lockY(7)
    controls.setRoomPolygon([[-17, -12], [-4.5, -12], [-4.5, -17], [17, -17], [17, -17], [17, 17], [-17, 17]])
}

/**
 * Generate boxes collisions
 */
let collisionBoxes
const updateCollisionBoxes = () =>
{
    collisionBoxes = getCollisionBoxes(objects)
    controls.setCollisionBoxes(collisionBoxes)
}

let particulesInstances = []

/**
 * Create renderer
 */
let renderer
const createRenderer = () =>
{
    renderer = new THREE.WebGLRenderer({ antialias: false })
    renderer.setSize(windowWidth, windowHeight)
    document.querySelector('.canvas-container').appendChild(renderer.domElement)

    /**
     * Listen rezize window
     */
    window.addEventListener('resize', () =>
    {
        windowWidth = window.innerWidth
        windowHeight = window.innerHeight
    
        camera.aspect = windowWidth / windowHeight
        camera.updateProjectionMatrix()
    
        renderer.setSize(windowWidth, windowHeight)
        if(pause)
        {
            render()
        }
    })
}
/**
 * Create postprocessing with bloom effect
 */
let composer
const createPostprocessing = () =>
{
    composer = new THREE.EffectComposer(renderer)
    composer.addPass(new THREE.RenderPass(scene, camera))

    const copyPass = new THREE.ShaderPass(THREE.CopyShader)
    composer.addPass(copyPass)

    const bloomPass = new THREE.BloomBlendPass(1.0, 0.8, new THREE.Vector2(1024, 1024))
    composer.addPass(bloomPass)
    bloomPass.renderToScreen = true
}
/**
 * Render function
 */
const render = () =>
{
    for(let particulesInstance of particulesInstances)
    {
        particulesInstance.update()
    }
    controls.controls.update(clock.getDelta())
    TWEEN.update()
    composer.render()
}

/**
 * Loop function call on windowAnimationFrame
 */
let pause = false
const loop = () =>
{
    window.requestAnimationFrame(loop)
    if(!pause)
    {
        raycasting.raycasterUpdate()
        render()        
    }
}

/**
 * Main init function
 */
let scene, clock, raycasting
const init = () =>
{
    scene = new THREE.Scene()
    clock = new THREE.Clock()
    createLoader()
    createCamera()
    createAudioManager()
    createUI()
    createHand()
    createRoom()
    addObjects()
    createControls()
    updateCollisionBoxes()
    createRenderer()
    createPostprocessing()
    raycasting = new Raycasting(camera, objects)
    loop()
}

init()