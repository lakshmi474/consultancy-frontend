/**
 * Intersection Observer utility for scroll-based animations
 * Adds fade-in, slide-up, and zoom-in animations on scroll
 */

export const initScrollAnimations = () => {
  // Create intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add animation class based on data attribute
          const animationType = entry.target.dataset.animation || 'fade-in-up';
          entry.target.classList.add(animationType);
          entry.target.style.opacity = '1';
          
          // Stop observing once animated
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  // Observe all elements with data-scroll attribute
  const elements = document.querySelectorAll('[data-scroll]');
  elements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
};

// Lazy load images
export const initLazyLoading = () => {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.dataset.src;
        if (src) {
          img.src = src;
          img.classList.remove('skeleton');
          img.classList.add('fade-in');
          observer.unobserve(img);
        }
      }
    });
  });

  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach((img) => {
    img.classList.add('skeleton');
    imageObserver.observe(img);
  });
};


