class Chest extends CustomObject {
    constructor(position, name) {
        super(position, name)
        this.pivot = this.createPivot()
        this.head = this.createHead()
        this.createLocker()
        this.createBody()
        this.hasAction = true
        this.actionInProgress = false
        this.opened = false
        this.slots = [
            {position: {x: 8, y: 2.6, z: 2.5}, rotation: {x: 0, y: Math.PI*0.5, z: 0}},
            {position: {x: 5, y: 2.6, z: 2.5}, rotation: {x: 0, y: Math.PI*0.5, z: 0}},
            {position: {x: 2, y: 2.6, z: 2.5}, rotation: {x: 0, y: Math.PI*0.5, z: 0}}
        ]
    }

    /**
     * Create the hinge part of the chest
     */
    createPivot()
    {
        const pivot = new THREE.Object3D();
        pivot.position.y = 2.5
        pivot.position.z = 5
        pivot.rotation.x = Math.PI

        this.threeObject.add(pivot)

        return pivot
    }

    /**
     * Create the head of the chest
     */
    createHead()
    {
        const materialsHead = faceTexture('chest/side', 'chest/side', 'chest/up', 'chest/side', 'chest/front', 'chest/side')

        const head = new THREE.Mesh(
            new THREE.BoxBufferGeometry(10, 1, 5),
            materialsHead
        )
        head.position.x = 5
        head.position.y = -0.5
        head.position.z = 2.5

        this.pivot.add(head)

        return head
    }

    /**
     * Create the locker link to the head of the chest
     */
    createLocker()
    {
        const materialsLocker = faceTexture('chest/locker')

        const locker = new THREE.Mesh(
            new THREE.BoxBufferGeometry(0.6, 0.9, 0.2),
            materialsLocker
        )
        locker.position.x = 0
        locker.position.y = 0.6
        locker.position.z = 2.6

        this.head.add(locker)
    }

    /**
     * Create the body of the chest
     */
    createBody()
    {
        const materialsBody = faceTexture('chest/side', 'chest/side', 'chest/up', 'chest/side', 'chest/side', 'chest/front')

        const body = new THREE.Mesh(
            new THREE.BoxBufferGeometry(10, 2.5, 5),
            materialsBody
        )
        body.position.x = 5
        body.position.y = 1.25
        body.position.z = 2.5

        this.threeObject.add(body)
    }

    /**
     * Switch state of the chest (opened/closed)
     */
    switch()
    {
        if(!this.actionInProgress)
        {
            this.actionInProgress = true

            let targetRotation = Math.PI

            if(this.pivot.rotation.x == Math.PI)
            {
                targetRotation = Math.PI*1.5
            }
            audio.playSound(this, this.opened ? 'chest_closed' : 'chest_open', false, 0.7)
            new TWEEN.Tween(this.pivot.rotation)
            .to({x: targetRotation}, 300)
            .onComplete(() =>
            {
                this.actionInProgress = false
                this.opened = !this.opened
            })
            .start()
        }
    }

    /**
     * Return if the chest is enough opened to place some items in it
     */
    enoughOpened()
    {
        return this.pivot.rotation.x >= Math.PI * 1.10
    }
}