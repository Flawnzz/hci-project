let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const sliderWrapper = document.querySelector('.slider-wrapper');

function showSlides(n) {
  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;
  
  sliderWrapper.style.transform = `translateX(-${slideIndex * 100}%)`;
  
  slides.forEach(slide => slide.classList.remove('active'));
  
  slides[slideIndex].classList.add('active');
}

let autoSlide = setInterval(() => {
  slideIndex++;
  showSlides(slideIndex);
}, 3000);

document.querySelector('.next').addEventListener('click', () => {
  slideIndex++;
  showSlides(slideIndex);
  clearInterval(autoSlide);
  autoSlide = setInterval(() => {
    slideIndex++;
    showSlides(slideIndex);
  }, 3000);
});

document.querySelector('.prev').addEventListener('click', () => {
  slideIndex--;
  showSlides(slideIndex);
  clearInterval(autoSlide);
  autoSlide = setInterval(() => { 
    slideIndex++; 
    showSlides(slideIndex); 
  }, 3000);
});


showSlides(slideIndex);

