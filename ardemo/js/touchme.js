var soundentity = null;
var isTargetFound = false;
var interacted = false;
var dino = null;

AFRAME.registerComponent("markerhandler",{
	init:function() {
		console.log('markerhandler-init');
		
		 markerObj = document.querySelector('a-marker');
		 markerObj.hidden = true;

		 soundentity = document.querySelector('[sound]');

	     dino = document.querySelector('#animated-dino');
		 dino.object3D.visible = false;

		 //dino.setAttribute('animation-mixer', {clip: 'C4D Animation Take', loop: 'repeat'});
	},

	tick:function() {

			if (markerObj != null)
        	{
	          	if (markerObj.object3D.visible == true) {
	          		if (isTargetFound)
	          			return;

	          		isTargetFound = true;
	          		console.log ("marker visible");
					document.getElementById("banner-section").style.display = "none";

					dino.object3D.visible = true;
	          		if (interacted)
	          		{
	          			soundentity.components.sound.playSound();
		 				dino.setAttribute('animation-mixer', {clip: 'C4D Animation Take', loop: 'repeat'});
	          		}

	          	}
	          	else {
	          		if (!isTargetFound)
	          			return;

	          		isTargetFound = false;
					console.log ("marker invisible");
					document.getElementById("banner-section").style.display = "block";

	          		dino.object3D.visible = false;
					if (interacted)
					{
	          			soundentity.components.sound.stopSound();
					}

	          	}
	          }
		}
	});

AFRAME.registerComponent('dinoInteractionListener', {
	init: function () {
			if (dino == null)
				dino = document.querySelector('#animated-dino');
	        dino.addEventListener('mousedown', function(ev){
	        	console.log('touched at - ', ev.detail.intersection.object);
				interacted = true;

				soundentity.components.sound.playSound();
				dino.setAttribute('animation-mixer', {clip: 'C4D Animation Take', loop: 'repeat'});
	        });
	    }
	});