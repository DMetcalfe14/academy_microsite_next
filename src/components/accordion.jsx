import { NavArrowUp, NavArrowDown } from "iconoir-react";
import { useState } from "react";

const AccordionItem = ({ index, question, answer, activeIndex, toggleAccordion }) => (
    <div className="border-b border-slate-200">
        <button
            onClick={() => toggleAccordion(index)}
            className="w-full flex justify-between items-center py-5 text-slate-800"
            aria-expanded={activeIndex === index}
            aria-controls={`content-${index}`}
            id={`accordion-button-${index}`}
        >
            <span>{question}</span>
            <span
                id={`icon-${index}`}
                className="text-slate-800 transition-transform duration-200 ease-in-out"
            >
                {activeIndex === index ? <NavArrowUp /> : <NavArrowDown />}
            </span>
        </button>
        <div
            id={`content-${index}`}
            role="region"
            aria-labelledby={`accordion-button-${index}`}
            className={`overflow-hidden transition-all duration-200 ease-in-out ${
                activeIndex === index ? "max-h-screen" : "max-h-0"
            }`}
        >
            <div className="pb-5 text-sm text-slate-500">
                {answer}
            </div>
        </div>
    </div>
);

const Accordion = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    function toggleAccordion(index) {
        setActiveIndex(activeIndex === index ? null : index);
    }

    return (
        <>
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    index={index}
                    question={item.question}
                    answer={item.answer}
                    activeIndex={activeIndex}
                    toggleAccordion={toggleAccordion}
                />
            ))}
        </>
    );
};

export default Accordion;
