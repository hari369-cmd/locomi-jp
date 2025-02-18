class ImageCarousel {
  constructor(containerId) {
      this.container = document.getElementById(containerId);
      this.currentIndex = 0;
      this.images = [
        {
            src: "assets/images/hike.jpg",
            alt: "Person celebrating at mountain summit after completing a hike",
            caption: "Turn hiking goals into achievements"
        },
        {
            src: "assets/images/friends.jpg",
            alt: "Group of friends enjoying a picnic together",
            caption: "Make social plans that stick"
        },
        {
            src: "assets/images/run.jpg",
            alt: "Father arriving home early to spend time with his daughter",
            caption: "Build better work-life balance"
        }
      ];
      
      this.init();
  }

  init() {
      // Create carousel structure
      /*this.container.innerHTML = `
          <div class="carousel-container relative w-full h-96 overflow-hidden rounded-lg shadow-xl">
              ${this.images.map((image, index) => `
                  <div class="carousel-item absolute w-full h-full transition-opacity duration-1000 ${index === 0 ? 'opacity-100' : 'opacity-0'}">
                      <img src="${image.src}" alt="${image.alt}" class="w-full h-full object-cover">
                      <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                          <p>${image.caption}</p>
                      </div>
                  </div>
              `).join('')}
              <div class="absolute bottom-16 left-0 right-0 flex justify-center gap-2">
                  ${this.images.map((_, index) => `
                      <button class="carousel-dot w-2 h-2 rounded-full bg-white ${index === 0 ? 'opacity-100 w-4' : 'opacity-50'}"
                              data-index="${index}">
                      </button>
                  `).join('')}
              </div>
          </div>
      `;*/

      this.container.innerHTML = `
        <div class="carousel-container relative w-full h-full">
            ${this.images.map((image, index) => `
                <div class="carousel-item absolute inset-0 transition-opacity duration-1000 ${index === 0 ? 'opacity-100' : 'opacity-0'}">
                    <img src="${image.src}" alt="${image.alt}" class="w-full h-full object-cover object-center">
                </div>
            `).join('')}
            <div class="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
                ${this.images.map((_, index) => `
                    <button class="carousel-dot w-2 h-2 rounded-full bg-white ${index === 0 ? 'opacity-100 w-4' : 'opacity-50'}"
                            data-index="${index}">
                    </button>
                `).join('')}
            </div>
        </div>
    `;

      // Add event listeners for dots
      const dots = this.container.querySelectorAll('.carousel-dot');
      dots.forEach(dot => {
          dot.addEventListener('click', () => {
              this.goToSlide(parseInt(dot.dataset.index));
          });
      });

      // Start auto-rotation
      this.startAutoRotation();
  }

  goToSlide(index) {
      const items = this.container.querySelectorAll('.carousel-item');
      const dots = this.container.querySelectorAll('.carousel-dot');
      
      // Update slides
      items.forEach((item, i) => {
          item.classList.toggle('opacity-0', i !== index);
          item.classList.toggle('opacity-100', i === index);
      });

      // Update dots
      dots.forEach((dot, i) => {
          dot.classList.toggle('opacity-50', i !== index);
          dot.classList.toggle('opacity-100', i === index);
          dot.classList.toggle('w-4', i === index);
          dot.classList.toggle('w-2', i !== index);
      });

      this.currentIndex = index;
  }

  startAutoRotation() {
      setInterval(() => {
          const nextIndex = (this.currentIndex + 1) % this.images.length;
          this.goToSlide(nextIndex);
      }, 5000);
  }
}

window.ImageCarousel = ImageCarousel;