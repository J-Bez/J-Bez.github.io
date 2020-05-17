function openNav() {
	document.getElementById("overlay").style.display = "block";
}

function closeNav() {
  	document.getElementById("overlay").style.display = "none";
}

function startAnimation() {
	let model = document.getElementById("model");
	let secModel = document.getElementById("secModel");
	if (this.model) {
		this.model.setAttribute('position', "100 0 0");
		this.secModel.removeAttribute('position');
		this.secModel.setAttribute('animation-mixer', {loop: "once"});
		setTimeout(function(){
			this.secModel.removeAttribute('animation-mixer');
			this.secModel.setAttribute('position', "100 0 0");
			this.model.removeAttribute('position');
		}, 5000);
	}
	
}

AFRAME.registerComponent('drag-rotate-component',{
      schema : { speed : {default:1}},
      init : function(){
        this.ifMouseDown = false;
        this.x_cord = 0;
        this.y_cord = 0;
        document.addEventListener('touchstart',this.OnDocumentMouseDown.bind(this));
        document.addEventListener('touchend',this.OnDocumentMouseUp.bind(this));
        document.addEventListener('touchmove',this.OnDocumentMouseMove.bind(this));
      },
      OnDocumentMouseDown : function(event){
        this.ifMouseDown = true;
        this.x_cord = event.touches[0].pageX;
        this.y_cord = event.touches[0].pageY;
      },
      OnDocumentMouseUp : function(){
	      
        this.ifMouseDown = false;
	      
      },
      OnDocumentMouseMove : function(event)
      {
        if(this.ifMouseDown)
        {
		
          var temp_x = event.touches[0].pageX-this.x_cord;
          var temp_y = event.touches[0].pageY-this.y_cord;
          if(Math.abs(temp_y)<Math.abs(temp_x))
          {
            this.el.object3D.rotateY(temp_x*this.data.speed/100);
		  
          }
          else
          {
            this.el.object3D.rotateX(temp_y*this.data.speed/100);
          }
          this.x_cord = event.touches[0].pageX;
          this.y_cord = event.touches[0].pageY;
        }
      }
    });
