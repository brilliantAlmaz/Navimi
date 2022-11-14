


function burgerClose(){
	document.querySelector('.burger').classList.remove('active');
	document.querySelector('.header__menu').classList.remove('active');
	document.querySelector('body').classList.remove('lock');
	document.querySelector('html').classList.remove('lock');
}
function burgerOpen(){
	document.querySelector('.burger').classList.add('active');
	document.querySelector('.header__menu').classList.add('active');
	document.querySelector('body').classList.add('lock');
	document.querySelector('html').classList.add('lock');

}
function burgerToggle(){
	document.querySelector('.burger').classList.toggle('active');
	document.querySelector('.header__menu').classList.toggle('active');
	document.querySelector('body').classList.toggle('lock');
	document.querySelector('html').classList.toggle('lock');

}

const burger = document.querySelector('.burger');
burger.addEventListener('click', burgerToggle);


//main slider
const mainSlider = document.querySelector('.main__slider');
const mainSliderItems = mainSlider.querySelectorAll('.slider-item');
const mainTracker = document.querySelector('.main__slider-tracker');
let mainTrackerCheck = true;
let mainSliderCount = 0;

//quote slider
const quoteSlider = document.querySelector('.quote__slider');
const quoteSliderItems = quoteSlider.querySelectorAll('.slider__item');
console.log(quoteSliderItems)
const quoteTracker = document.querySelector('.quote__slider-tracker');
let quoteTrackerCheck = true;
let quoteSliderCount = 0;

//for main idle animation
let idleBool = true;
let mainInterval = setInterval(()=>{
	idleBool = false;
	mainSliderCount = slideNext(mainSlider,mainSliderItems,mainSliderCount,mainTracker)
}, 5000);

quoteSlider.addEventListener('click', function(){
	quoteSliderCount = slideNext(quoteSlider,quoteSliderItems,quoteSliderCount,quoteTracker);
});
quoteSlider.addEventListener('dblclick', function(){
	quoteSliderCount = slidePrev(quoteSlider,quoteSliderItems,quoteSliderCount,quoteTracker);
});

mainSlider.addEventListener('click', function(){
	clearInterval(mainInterval);
	let mainTimeout = setTimeout(()=>{
		idleBool = true;
	},10000);
	if (mainTracker){
		mainInterval = setInterval(()=>{
			mainSliderCount = slideNext(mainSlider,mainSliderItems,mainSliderCount,mainTracker)
			idleBool = false;
		}, 5000);
	}
});


function sliderInit(slider, items, tracker, trackerCheck, count){
	let itemWidth = items[0].clientWidth;
	//console.log(itemWidth)
	if (trackerCheck){
		for (let i = 0; i < items.length; i++){
			tracker.insertAdjacentHTML(
				'beforeend',
				'<li></li>');
		}
		trackerCheck = false;
	}
	for (let i of items){
		i.style.width = slider.parentElement.clientWidth + 'px';
	}
	if (slider.classList.contains('main__slider'))
		slider.style.width = (window.innerWidth * items.length)+'px';
	else
		slider.style.width = (slider.parentElement.clientWidth * items.length)+'px';
	slider.style.transform = `translate(-${count * itemWidth}px)`;
	return trackerCheck;
}
function slideNext(slider, items, count, tracker){
	tracker.children[count].classList.remove('active');
	if (count < items.length-1){
		count++;
		slider.style.transform = `translate(-${count * items[0].clientWidth}px)`;
	}
	else{
		count = 0;
		slider.style.transform = `translate(-${count * items[0].clientWidth}px)`;
	}
	tracker.children[count].classList.add('active');
	return count;
}
function slidePrev(slider, items, count, tracker){
	tracker.children[count].classList.remove('active');
	if (count > 0){
		count--;
		slider.style.transform = `translate(-${count * items[0].clientWidth}px)`;
	}
	else{
		count = items.length-1;
		slider.style.transform = `translate(-${count * items[0].clientWidth}px)`;
	}
	tracker.children[count].classList.add('active');
	return count;
}
let firstIter = true;
init();
window.addEventListener('resize', init);
function init(){
	document.querySelector('main').style.margin = `${document.querySelector('header').clientHeight}px 0 0 0`;
	mainTrackerCheck = sliderInit(mainSlider,mainSliderItems, mainTracker,mainTrackerCheck, mainSliderCount) //main slider init
	quoteTrackerCheck = sliderInit(quoteSlider,quoteSliderItems, quoteTracker,quoteTrackerCheck, quoteSliderCount) 
	if (firstIter){
		mainTracker.children[0].classList.add('active');
		quoteTracker.children[0].classList.add('active');
		firstIter = false;
	}

	document.querySelector('.main-sliderblock').style.height = Math.floor(window.screen.availHeight - document.querySelector('main').style.margin) + 'px';
	mainSliderItems.forEach(function(i){
		i.style.height = document.querySelector('.main-sliderblock').style.height = Math.floor(window.screen.availHeight - document.querySelector('header').clientHeight) + 'px';
	})
}
