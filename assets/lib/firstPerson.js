/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author paulirish / http://paulirish.com/
 */

 /**
  * Modificated by Pierre GRDl
  * For Collisions, lock camera on Y and update deprecated key events
  * 
  */

THREE.FirstPersonControls = function ( object, domElement ) {

	this.object = object;
	this.target = new THREE.Vector3( 0, 0, 0 );

	this.domElement = ( domElement !== undefined ) ? domElement : document;

	this.enabled = true;

	this.movementSpeed = 1.0;
	this.lookSpeed = 0.005;

	this.lookVertical = true;
	this.autoForward = false;

	this.activeLook = true;

	this.heightSpeed = false;
	this.heightCoef = 1.0;
	this.heightMin = 0.0;
	this.heightMax = 1.0;

	this.constrainVertical = false;
	this.verticalMin = 0;
	this.verticalMax = Math.PI;

	this.autoSpeedFactor = 0.0;

	this.mouseX = 0;
	this.mouseY = 0;

	this.lat = 0;
	this.lon = 0;
	this.phi = 0;
	this.theta = 0;

	this.moveForward = false;
	this.moveBackward = false;
	this.moveLeft = false;
	this.moveRight = false;

	this.mouseDragOn = false;

	this.viewHalfX = 0;
	this.viewHalfY = 0;

	/**
	 * Add by me
	 */
	this.lockY = false
	this.moveWithMouse = false
	this.activeCollision = true
	this.roomPolygon = null
	this.collisionBoxes = null

	/**
	 * Update : Replace keyCode (deprecated) by key
	 */

	if ( this.domElement !== document ) {

		this.domElement.setAttribute( 'tabindex', - 1 );

	}

	//

	this.handleResize = function () {

		if ( this.domElement === document ) {

			this.viewHalfX = window.innerWidth / 2;
			this.viewHalfY = window.innerHeight / 2;

		} else {

			this.viewHalfX = this.domElement.offsetWidth / 2;
			this.viewHalfY = this.domElement.offsetHeight / 2;

		}

	};

	this.onMouseDown = function ( event ) {

		if ( this.domElement !== document ) {

			this.domElement.focus();

		}

		event.preventDefault();
		event.stopPropagation();

		if ( this.activeLook ) {

			switch ( event.button ) {

				case 0: this.moveForward = true; break;
				case 2: this.moveBackward = true; break;

			}

		}

		this.mouseDragOn = true;

	};

	this.onMouseUp = function ( event ) {

		event.preventDefault();
		event.stopPropagation();

		if ( this.activeLook ) {

			switch ( event.button ) {

				case 0: this.moveForward = false; break;
				case 2: this.moveBackward = false; break;

			}

		}

		this.mouseDragOn = false;

	};

	this.onMouseMove = function ( event ) {

		if ( this.domElement === document ) {

			this.mouseX = event.pageX - this.viewHalfX;
			this.mouseY = event.pageY - this.viewHalfY;

		} else {

			this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;
			this.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY;

		}

	};

	this.onKeyDown = function ( event ) {

		//event.preventDefault();
		// Update event.keyCode to event.code
		switch ( event.code ) {

			case 'ArrowUp': /*up*/
			case 'KeyW': /*Z*/ this.moveForward = true; break;

			case 'ArrowLeft': /*left*/
			case 'KeyA': /*Q*/ this.moveLeft = true; break;

			case 'ArrowDown': /*down*/
			case 'KeyS': /*S*/ this.moveBackward = true; break;

			case 'ArrowRight': /*right*/
			case 'KeyD': /*D*/ this.moveRight = true; break;

			case 'KeyQ': /*A*/ 
				if(!Number.isInteger(this.lockY)) this.moveUp = true
				break

			case 'KeyE': /*E*/ 
				if(!Number.isInteger(this.lockY)) this.moveDown = true
				break

		}

	};

	this.onKeyUp = function ( event ) {

		// Update event.keyCode to event.code
		switch ( event.code ) {

			case 'ArrowUp': /*up*/
			case 'KeyW': /*Z*/ this.moveForward = false; break;

			case 'ArrowLeft': /*left*/
			case 'KeyA': /*Q*/ this.moveLeft = false; break;

			case 'ArrowDown': /*down*/
			case 'KeyS': /*S*/ this.moveBackward = false; break;

			case 'ArrowRight': /*right*/
			case 'KeyD': /*D*/ this.moveRight = false; break;

			case 'KeyQ': /*A*/ 
				if(!Number.isInteger(this.lockY)) this.moveUp = false
				break

			case 'KeyE': /*E*/ 
				if(!Number.isInteger(this.lockY)) this.moveDown = false
				break

		}

	};

	this.update = function ( delta ) {

		if ( this.enabled === false ) return;

		if ( this.heightSpeed ) {

			var y = THREE.Math.clamp( this.object.position.y, this.heightMin, this.heightMax );
			var heightDelta = y - this.heightMin;

			this.autoSpeedFactor = delta * ( heightDelta * this.heightCoef );

		} else {

			this.autoSpeedFactor = 0.0;

		}

		var actualMoveSpeed = delta * this.movementSpeed;

		/**
		 * Add by me
		 * Collisions check with a clone of the camera
		 * Lock camera on Y axis
		 */
		if(this.activeCollision)
		{
			if(this.checkWithClone(actualMoveSpeed))
			{
				this.move(this.object, actualMoveSpeed)
				if(Number.isInteger(this.lockY))
				{
					this.object.position.y = this.lockY
				}
			}
		}
		else
		{
			this.move(this.object, actualMoveSpeed)
			if(Number.isInteger(this.lockY))
			{
				this.object.position.y = this.lockY
			}
		}

		var actualLookSpeed = delta * this.lookSpeed;

		if ( ! this.activeLook ) {

			actualLookSpeed = 0;

		}

		var verticalLookRatio = 1;

		if ( this.constrainVertical ) {

			verticalLookRatio = Math.PI / ( this.verticalMax - this.verticalMin );

		}

		this.lon += this.mouseX * actualLookSpeed;
		if ( this.lookVertical ) this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio;

		this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
        this.phi = THREE.Math.degToRad( 90 - this.lat );

		this.theta = THREE.Math.degToRad( this.lon );

		if ( this.constrainVertical ) {

			this.phi = THREE.Math.mapLinear( this.phi, 0, Math.PI, this.verticalMin, this.verticalMax );

		}

		var targetPosition = this.target,
			position = this.object.position;

		targetPosition.x = position.x + 100 * Math.sin( this.phi ) * Math.cos( this.theta );
		targetPosition.y = position.y + 100 * Math.cos( this.phi );
		targetPosition.z = position.z + 100 * Math.sin( this.phi ) * Math.sin( this.theta );

		this.object.lookAt( targetPosition );

	};

	/**
	 * Add by me
	 * Do a clone of the current camera for test
	 */
	this.checkWithClone = function(moveSpeed)
	{
		const clone = this.object.clone(false)
		this.move(clone, moveSpeed)
        return this.testInsideRoom(clone.position) && !this.testInsideCollisionBoxes(clone.position)
	}

	/**
	 * Test if a position is inside a polygon
	 * inside function available in utils.js
	 * @param {[number, number]} positions 
	 */
	this.testInsideRoom = function(positions)
	{
		return inside([positions.x, positions.z], this.roomPolygon)
	}

	/**
	 * Test if a position is inside a box collision of an object in the room
	 * @param {[number, number]} positions 
	 */
	this.testInsideCollisionBoxes = function(positions)
	{
		for(let box of this.collisionBoxes)
		{
			if(box.containsPoint(new THREE.Vector3(positions.x, 7, positions.z)))
			{
				return true
			}
		}
		return false
	}

	
	/**
	 * Edited by me
	 * Move the camera
	 */
	this.move = function (object, actualMoveSpeed)
	{
		if ( this.moveForward || ( this.autoForward && ! this.moveBackward ) ) object.translateZ( - ( actualMoveSpeed + this.autoSpeedFactor ) );
		if ( this.moveBackward ) object.translateZ( actualMoveSpeed );

		if ( this.moveLeft ) object.translateX( - actualMoveSpeed );
		if ( this.moveRight ) object.translateX( actualMoveSpeed );

		if ( this.moveUp ) object.translateY( actualMoveSpeed );
		if ( this.moveDown ) object.translateY( - actualMoveSpeed );
	}

	function contextmenu( event ) {

		event.preventDefault();

	}

	this.dispose = function () {

		this.domElement.removeEventListener( 'contextmenu', contextmenu, false );
		this.domElement.removeEventListener( 'mousedown', _onMouseDown, false );
		this.domElement.removeEventListener( 'mousemove', _onMouseMove, false );
		this.domElement.removeEventListener( 'mouseup', _onMouseUp, false );

		window.removeEventListener( 'keydown', _onKeyDown, false );
		window.removeEventListener( 'keyup', _onKeyUp, false );

	};

	var _onMouseMove = bind( this, this.onMouseMove );
	var _onMouseDown = bind( this, this.onMouseDown );
	var _onMouseUp = bind( this, this.onMouseUp );
	var _onKeyDown = bind( this, this.onKeyDown );
	var _onKeyUp = bind( this, this.onKeyUp );

	this.domElement.addEventListener( 'contextmenu', contextmenu, false );
	this.domElement.addEventListener( 'mousemove', _onMouseMove, false );
	/**
	 * Add by me
	 */
	if(this.moveWithMouse)
	{
		this.domElement.addEventListener( 'mousedown', _onMouseDown, false );
		this.domElement.addEventListener( 'mouseup', _onMouseUp, false );
	}

	window.addEventListener( 'keydown', _onKeyDown, false );
	window.addEventListener( 'keyup', _onKeyUp, false );

	function bind( scope, fn ) {

		return function () {

			fn.apply( scope, arguments );

		};

	}

	this.handleResize();

};