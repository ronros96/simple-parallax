var animate = true;
var anim,curAction = 0;
var nav = [].slice.call(document.querySelector(".anchors").firstElementChild.children);
var anchors = [].slice.call(document.querySelectorAll("[data-anim-stat]"));
var sectL = anchors.length;

// get current hash
animationDone();
window.onload = function(){
	window.location.href='#';
}

// on nav click
nav.forEach(function(link,i){
	link.addEventListener("click",function(e){
		var id = this.firstElementChild.href.split("#")[1];
		gotoPanel(id)
		e.preventDefault()
	});
});

// hamburger
btn = document.querySelector(".hamburger");
navContent = document.querySelector(".anchors");
btn.addEventListener("click",function(){
	var trigger = this.getAttribute("data-trigger");
	if(trigger === "closed"){
		navContent.style.left = 0;
		this.setAttribute("data-trigger","open");
	}else{
		navContent.style.left = "100%";
		this.setAttribute("data-trigger","closed");
	}
	
});

function gotoPanel(id){
	var checkDOM = !!document.getElementById(id);

	if(checkDOM){
		var getSection = document.getElementById(id).getAttribute("class");
		curAction = parseInt(getSection.split("-")[1]);
		setIndicator(curAction);
	}
}

// on mouse wheel
window.addEventListener("wheel", function(e){
	if(animate){
		if(e.deltaY < 0){
			curAction--;
			if(curAction <= 0){curAction = 0}
			setIndicator(curAction);	
		}else{
			curAction++;
			if(curAction >= sectL){curAction = sectL}
			setIndicator(curAction);
		}
		animate = false;
	}
});

//nav indicator
function setIndicator(i){
	var x = i-1;
	anchors.forEach(function(section, i) {
		if(i === x){
			window.history.replaceState({}, '','#'+section.id);
			section.setAttribute("data-anim-stat","active");
		}else if(x > i){
			section.setAttribute("data-anim-stat","passed");
		}else if(i > x){
			section.setAttribute("data-anim-stat","init");
		}else if(x === -1){
			window.history.replaceState({}, '','#');
		}
	});
	document.querySelector("body").setAttribute("data-anim-stage",i) 
	anim = setTimeout(function(){
		animate = true;
		animationDone();
	},1500);
}

function animationDone(){
	clearTimeout(anim);
}

// image slider
var slider = document.querySelector(".slider-container");
var innerSlider = document.querySelector(".slider-content");
var pressed = false;
var mx;
var sx;

slider.addEventListener("mousedown", function(e){
	pressed = true;
	mx = e.offsetX - innerSlider.offsetLeft;
	slider.style.cursor = "resize";
});

window.addEventListener("mouseup", function(e){
	pressed = false;
});

slider.addEventListener("mousemove",function(e){
	if(!pressed) return;
	e.preventDefault();
	moverSlide(e.offsetX);
});

slider.addEventListener("touchstart", function(e){
	pressed = true;
	mx = e.targetTouches[0].pageX - innerSlider.offsetLeft;
	slider.style.cursor = "resize";
});

window.addEventListener("touchend", function(e){
	pressed = false;
});

slider.addEventListener("touchmove",function(e){
	if(!pressed) return;
	moverSlide(e.targetTouches[0].pageX);
});

function moverSlide(x){
	sx = x
	innerSlider.style.left = `${sx - mx}px`;
	checkBoundary();
}

function checkBoundary(){
	var outer = slider.getBoundingClientRect();
	var inner = innerSlider.getBoundingClientRect();

	if(parseInt(innerSlider.style.left) > 0){
		innerSlider.style.left = "0px";
	}else if(inner.right < outer.right){
		innerSlider.style.left = `-${inner.width - outer.width}px`;
	}
}

let contact = document.querySelector('.contact-me');
if(contact){
	contact.addEventListener('click',()=>{
		window.open('https://ronros96.github.io/');
	})
}