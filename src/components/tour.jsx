import { useEffect } from 'react';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
import { useJsonData } from '@/context/json_context';

const Tour = () => {
  const { data } = useJsonData();
  const { steps = [] } = data;

  useEffect(() => {
    console.log('Steps:', steps);
  }, [steps]);

  useEffect(() => {
    const tour = new Shepherd.Tour({
      useModalOverlay: false,
      defaultStepOptions: {
        classes: 'p-6 rounded-lg z-50',
        scrollTo: true,
      },
    });

    // Validate and transform steps before adding
    if (Array.isArray(steps) && steps.length > 0) {
      steps.forEach((step, index) => {
        if (!step.id) step.id = `step-${index}`;

        // Convert string actions to functions
        step.buttons = step.buttons.map((button) => ({
          ...button,
          action: button.action === "next" ? tour.next :
                  button.action === "back" ? tour.back :
                  button.action === "cancel" ? tour.cancel :
                  undefined,
        }));

        tour.addStep(step);
      });

      // Start the tour
      tour.start();
    } else {
      console.warn('No valid steps found for Shepherd tour.');
    }
  }, [data, steps]);

  return null;
};

export default Tour;
