import { useEffect } from 'react';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

const Tour = () => {
  useEffect(() => {
    const tour = new Shepherd.Tour({
      useModalOverlay: false,
      defaultStepOptions: {
        classes: 'p-6 rounded-lg z-50',
        scrollTo: true,
      },
    });

    // Define steps
    const steps = [
      {
        title: `<span class="text-2xl font-semibold text-gray-800 break-words">Welcome</span>`,
        text: `
          <p>Here is a message from the director of Leadership and Management.</p>
          <div class="mt-4">
            <video controls class="w-full rounded-md shadow-md" aria-label="Message from the director">
              <source src="your-video-url.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
        `,
        buttons: [
          {
            action() {
              return this.cancel();
            },
            text: 'Cancel',
            classes: 'shepherd-button-secondary',
          },
          {
            action() {
              return this.next();
            },
            text: 'Next',
            classes: 'shepherd-button-primary',
          },
        ],
      },
      {
        title: `<span class="text-1xl font-semibold text-gray-800 break-words">Search</span>`,
        text: 'Search for articles, learning, and more using the search bar.',
        attachTo: {
          element: '#search',
          on: 'bottom'
        },
        buttons: [
          {
            action() {
              return this.back();
            },
            text: 'Prev',
            classes: 'shepherd-button-secondary',
          },
          {
            action() {
              return this.next();
            },
            text: 'Next',
            classes: 'shepherd-button-primary',
          },
        ],
      },
      {
        title: `<span class="text-1xl font-semibold text-gray-800 break-words">Slider</span>`,
        text: 'View campaigns, news and articles related to Leadership and Management.',
        attachTo: {
          element: '#rotator',
          on: 'bottom'
        },
        buttons: [
          {
            action() {
              return this.back();
            },
            text: 'Prev',
            classes: 'shepherd-button-secondary',
          },
          {
            action() {
              return this.next();
            },
            text: 'Next',
            classes: 'shepherd-button-primary',
          },
        ],
      },
      {
        title: `<span class="text-1xl font-semibold text-gray-800 break-words">Featured</span>`,
        text: 'View featured resources.',
        attachTo: {
          element: '#featured',
          on: 'bottom'
        },
        buttons: [
          {
            action() {
              return this.back();
            },
            text: 'Prev',
            classes: 'shepherd-button-secondary',
          },
          {
            action() {
              return this.next();
            },
            text: 'Next',
            classes: 'shepherd-button-primary',
          },
        ],
      },
      {
        title: `<span class="text-1xl font-semibold text-gray-800 break-words">Spotlight</span>`,
        text: 'View spotlight resources.',
        attachTo: {
          element: '#spotlight',
          on: 'bottom'
        },
        buttons: [
          {
            action() {
              return this.back();
            },
            text: 'Prev',
            classes: 'shepherd-button-secondary',
          },
          {
            action() {
              return this.next();
            },
            text: 'Next',
            classes: 'shepherd-button-primary',
          },
        ],
      },
      {
        title: `<span class="text-1xl font-semibold text-gray-800 break-words">Events</span>`,
        text: 'View upcoming events.',
        attachTo: {
          element: '#events',
          on: 'bottom'
        },
        buttons: [
          {
            action() {
              return this.back();
            },
            text: 'Prev',
            classes: 'shepherd-button-secondary',
          },
          {
            action() {
              return this.next();
            },
            text: 'Next',
            classes: 'shepherd-button-primary',
          },
        ],
      },
      {
        title: `<span class="text-1xl font-semibold text-gray-800 break-words">Quick Links</span>`,
        text: 'View quick links.',
        attachTo: {
          element: '#links',
          on: 'bottom'
        },
        buttons: [
          {
            action() {
              return this.back();
            },
            text: 'Prev',
            classes: 'shepherd-button-secondary',
          },
          {
            action() {
              return this.next();
            },
            text: 'Done',
            classes: 'shepherd-button-primary',
          },
        ],
      },
    ];

    // Add steps to the tour
    steps.forEach(step => tour.addStep(step));

    // Start the tour
    tour.start();
  }, []);

  return null;
};

export default Tour;
