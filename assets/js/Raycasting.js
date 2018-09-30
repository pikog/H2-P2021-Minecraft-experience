class Raycasting {
    constructor(camera, objects) {
        this.camera = camera
        this.raycaster = new THREE.Raycaster()
        this.raycaster.far = 10
        this.mouse = new THREE.Vector2()
        this.listenMouseMove()
        this.listenClick()
        this.objectAction = null
    }

    /**
     * listen when mouse move to get the focus point
     */
    listenMouseMove()
    {
        document.addEventListener('mousemove', (event) =>
        {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
            this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1
        })
    }

    /**
     * Function call on loop
     * Get the object focused
     */
    raycasterUpdate()
    {
        this.raycaster.setFromCamera(this.mouse, this.camera)

        const intersects = this.raycaster.intersectObjects(scene.children, true)

        if(intersects.length == 0)
        {
            this.preActionManager()
            return
        }

        const object = this.getNearbyFocusedObject(intersects)
        if(object)
        {
            this.preActionManager(object)
        }
        else
        {
            this.preActionManager()
        }
    }

    /**
     * Return only object declared in room (in objects) and have an action
     * @param {object} intersects 
     */
    getNearbyFocusedObject(intersects)
    {
        for (let i = 0; i < intersects.length; i++) {
            const object = isInObjects(intersects[i].object, ['particules'])
            if(object && (object.hasAction || (object.slots && object.slots.length > 0)))
            {
                return object
            }
        }
    }

    /**
     *  Display help text at bottom and get the action in function to the context (ex: object in hand, focused block)
     * @param {object} object 
     */
    preActionManager(object = null)
    {
        if(object && !hand.eating)
        {
            if(object.type === 'object')
            {
                if(object instanceof Chest)
                {
                    if(hand.take && object.enoughOpened() && object.freeSlot() >= 0)
                    {
                        this.objectAction = {object, action: 'putFromHand'}
                        ui.display(`Click to place the ${hand.take.getTitle()}`)                       
                    }
                    else if(!object.actionInProgress)
                    {
                        this.objectAction = {object, action: 'switch'}
                        ui.display(`Click to ${object.opened ? 'close' : 'open'} the chest`)
                    }
                    return
                }
                else if(object instanceof Bed)
                {
                    if(!object.actionInProgress)
                    {
                        this.objectAction = {object, action: 'sleep'}
                        ui.display('Click to sleep')
                    }
                    return
                }
                else if(object instanceof Torch)
                {
                    if(!object.actionInProgress)
                    {
                        this.objectAction = {object, action: 'switch'}
                        ui.display(`Click to turn ${object.state ? 'off' : 'on'}`)
                    }
                    return
                }
                else if(object instanceof Furnace)
                {
                    if(hand.take && hand.take.getTitle() == 'charcoal')
                    {
                        this.objectAction = {object, action: 'burn'}
                        ui.display('Click to create a fire')
                        return
                    }
                }
                else if(object instanceof Juxebox)
                {
                    if((hand.take instanceof Disc) && object.freeSlot() >= 0)
                    {
                        this.objectAction = {object, action: 'putFromHand'}
                        ui.display(`Listen ${hand.take.getTitle()}`)
                        return
                    }
                }

                if(hand.take && object.freeSlot() >= 0)
                {
                    this.objectAction = {object, action: 'putFromHand'}
                    ui.display(`Click to place the ${hand.take.getTitle()}`)
                    return
                }

            }
            else if(object.type === 'item')
            {
                if(!hand.take)
                {
                    if((object instanceof Steak) && object.isCooked())
                    {
                        this.objectAction = {object, action: 'eat'}
                        ui.display(`Click to eat the ${object.getTitle()}`)
                        return
                    }
                    else if(object.getTitle() == 'apple')
                    {
                        this.objectAction = {object, action: 'eat'}
                        ui.display(`Click to eat the ${object.getTitle()}`)
                        return
                    }
                    else
                    {
                        this.objectAction = {object, action: 'take'}
                        ui.display(`Click to take the ${object.getTitle()}`)
                        return
                    }
                }
                else if(hand.take !== object)
                {
                    ui.display('You already have an item')
                    return
                }
            }
        }
        this.objectAction = null
        ui.display()
    }

    /**
     * Listen when right or left click and if an action is set by preActionManager
     */
    listenClick()
    {
        document.addEventListener('mousedown', (e) =>
        {
            e.preventDefault()
            e.stopPropagation()

            if(this.objectAction && (e.button === 0 || e.button === 2) && !pause)
            {
                this.actionManager()
            }
        })
    }

    /**
     * Do the action set by preActionManager
     */
    actionManager()
    {
        this.objectAction.object[this.objectAction.action]()
        this.objectAction = null
        ui.display()
    }
}