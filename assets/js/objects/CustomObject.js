class CustomObject {
    constructor(position, name) {
        this.threeObject = new THREE.Object3D()
        this.threeObject.position.set(position.x, position.y, position.z)
        this.name = name
        this.threeObject.name = name
        this.slots = []
        this.type = 'object'
        this.sounds = {}
    }

    /**
     * Apply a rotation to this block
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    rotation(x = 0, y = 0, z = 0)
    {
        this.threeObject.rotation.set(x, y, z)
    }

    /**
     * Apply a scale to this block
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    scale(x = 1, y = 1, z = 1)
    {
        this.threeObject.scale.set(x, y, z)
    }

    /**
     * Put an item in a available slot of this block
     * @param {Object} item 
     */
    keepItem(item)
    {
        const slot = this.freeSlot()
        if(slot >= 0)
        {
            this.slots[slot].item = item

            if(this.slots[slot].position)
            {
                item.threeObject.position.set(this.slots[slot].position.x, this.slots[slot].position.y, this.slots[slot].position.z)
            }
            else
            {
                item.threeObject.position.set(0, 0, 0)
            }

            if(this.slots[slot].scale)
            {
                item.threeObject.scale.set(this.slots[slot].scale, this.slots[slot].scale, this.slots[slot].scale)
            }
            else
            {
                item.threeObject.scale.set(1, 1, 1)
            }

            if(this.slots[slot].rotation)
            {
                item.threeObject.rotation.set(this.slots[slot].rotation.x, this.slots[slot].rotation.y, this.slots[slot].rotation.z)
            }
            else
            {
                item.threeObject.rotation.set(0, 0, 0)
            }
            
            this.threeObject.add(item.getThreeObject())
            item.associatedObject = this
            return true
        }
        return false
    }

    /**
     * Take this item from hand to an available slot of this block
     */
    putFromHand()
    {
        if(this.keepItem(hand.take))
        {
            hand.removeItem()
        }
    }

    /**
     * Remove an item from its slot on this block and delete link with this block and item
     * @param {Object} item 
     */
    removeItem(item)
    {
        this.removeFromSlot(item)
        this.threeObject.remove(item.getThreeObject())
        item.associatedObject = null
    }

    /**
     * Return if there is an available slot on this block
     */
    freeSlot()
    {
        for(let i = 0; i < this.slots.length; i++)
        {
            if(!this.slots[i].item)
            {
                return i
            }
        }
        return -1
    }

    /**
     * Remove an item from its slot on this block
     * @param {Object} item 
     */
    removeFromSlot(item)
    {
        this.slots.forEach((elem) =>
        {
            if(elem.item === item)
            {
                elem.item = null
                return true
            }
        })
        return false
    }
    
    /**
     * Return Three js container of this block
     */
    getThreeObject()
    {
        return this.threeObject
    }
}