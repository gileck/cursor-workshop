document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  const slideNumber = document.getElementById('slide-number');
  const slideList = document.getElementById('slide-list');
  
  let currentSlideIndex = 0;
  
  // Populate slide panel with titles
  populateSlidePanel();
  
  // Initialize first slide
  slides[currentSlideIndex].classList.add('active');
  updateSlideNumber();
  updateActiveSlidePanelItem();
  
  // Event listeners for navigation buttons
  prevButton.addEventListener('click', showPreviousSlide);
  nextButton.addEventListener('click', showNextSlide);
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      showNextSlide();
    } else if (e.key === 'ArrowLeft') {
      showPreviousSlide();
    }
  });
  
  function showPreviousSlide() {
    if (currentSlideIndex > 0) {
      slides[currentSlideIndex].classList.remove('active');
      currentSlideIndex--;
      slides[currentSlideIndex].classList.add('active');
      updateSlideNumber();
      updateActiveSlidePanelItem();
    }
  }
  
  function showNextSlide() {
    if (currentSlideIndex < slides.length - 1) {
      slides[currentSlideIndex].classList.remove('active');
      currentSlideIndex++;
      slides[currentSlideIndex].classList.add('active');
      updateSlideNumber();
      updateActiveSlidePanelItem();
    }
  }
  
  function updateSlideNumber() {
    slideNumber.textContent = `${currentSlideIndex + 1}/${slides.length}`;
    
    // Update button states
    prevButton.disabled = currentSlideIndex === 0;
    nextButton.disabled = currentSlideIndex === slides.length - 1;
  }
  
  function populateSlidePanel() {
    slides.forEach((slide, index) => {
      const slideId = slide.id;
      let slideTitle = '';
      
      // Get slide title from h1 or h2 element
      const h1 = slide.querySelector('h1');
      const h2 = slide.querySelector('h2');
      
      if (h1) {
        slideTitle = h1.textContent;
      } else if (h2) {
        slideTitle = h2.textContent;
      } else {
        slideTitle = `Slide ${index + 1}`;
      }
      
      // Create list item for the slide panel
      const listItem = document.createElement('li');
      listItem.textContent = slideTitle;
      listItem.dataset.index = index;
      
      // Add click event to navigate to the slide
      listItem.addEventListener('click', () => {
        navigateToSlide(index);
      });
      
      slideList.appendChild(listItem);
    });
  }
  
  function navigateToSlide(index) {
    if (index >= 0 && index < slides.length) {
      slides[currentSlideIndex].classList.remove('active');
      currentSlideIndex = index;
      slides[currentSlideIndex].classList.add('active');
      updateSlideNumber();
      updateActiveSlidePanelItem();
    }
  }
  
  function updateActiveSlidePanelItem() {
    // Remove active class from all items
    const items = slideList.querySelectorAll('li');
    items.forEach(item => item.classList.remove('active'));
    
    // Add active class to current slide item
    const activeItem = slideList.querySelector(`li[data-index="${currentSlideIndex}"]`);
    if (activeItem) {
      activeItem.classList.add('active');
      
      // Scroll the active item into view if needed
      activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
});
