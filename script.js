const Url = 'https://ar-muzej.herokuapp.com/';
const instructions = ["Usmeri kamero v marker, za prikaz 3D modela.", "3D model lahko vrtite s prsti po zaslonu.", "S klikom na gumb i se Vam prikažejo dodatne informacije o objektu.", "S klikom na gumb play se Vam prikaže animiran voz s kolesom."];
var instructionsCount = 0;
var instructionsText;

function backBtnClicked() {
	if (this.instructionsCount == 3) {
		document.getElementById("forwardBtn").innerHtml = "Nazaj";
	}
	if (this.instructionsCount > 0) {
		document.getElementById("instructionsText").innerHTML = instructions[this.instructionsCount-1];
		console.log(document.getElementById("instructionsText"));
		this.instructionsCount -= 1;
		if (this.instructionsCount == 0) {
			document.getElementById("backBtn").style.display = "none";
		}
	}
}

function forwardBtnClicked() {
	if (this.instructionsCount == 0) {
		document.getElementById("backBtn").style.display="block";
	}
	if (this.instructionsCount == 3) {
		this.closeInstructions();
	}
	if (this.instructionsCount < 3) {
		document.getElementById("instructionsText").innerHTML = instructions[this.instructionsCount+1];
		this.instructionsCount += 1;
		if (this.instructionsCount == 3) {
			document.getElementById("forwardBtn").innerHTML = "Zapri";
		}
	}
}

function closeInstructions() {
	document.getElementById("myModal").style.display = "none";
	this.instructionsCount = 0;
}

function openNav() {
	var xmlhttp = new XMLHttpRequest();
	const data = {
		clicked: "Info",
		date: new Date().toLocaleString()
	}
	xmlhttp.open("POST", Url);
	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlhttp.send(JSON.stringify(data));
	document.getElementById("overlay").style.display = "block";
}

function closeNav() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", Url);
	xmlhttp.send();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState==4 && this.status==200){
			console.log(this.responseText)
		}
	}
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
