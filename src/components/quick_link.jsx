import * as Iconoir from "iconoir-react";
import { createElement } from "react";

const DynamicIcon = ({ name }) => {
    const IconComponent = Iconoir[`${name}`];
    return IconComponent ? createElement(IconComponent) : <Iconoir.QuestionMark aria-hidden="true" />;
};

const QuickLink = ({ title, href, icon }) => {
    return (
        <a 
            href={href} 
            aria-label={title} 
            className="focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
            target="_blank" 
            rel="noopener noreferrer"
        >
            <div className="flex gap-4 items-center group font-semibold">
                <span 
                    className="p-4 rounded-xl bg-gray-100 group-hover:bg-gray-200 text-3xl" 
                    role="presentation"
                >
                    <DynamicIcon name={icon} />
                </span>
                <span className="text-gray-800 group-hover:text-gray-900">{title}</span>
            </div>
        </a>
    );
};

export default QuickLink;