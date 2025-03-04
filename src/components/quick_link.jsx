import * as Iconoir from "iconoir-react";

import {createElement} from "react";

const DynamicIcon = ({ name }) => {
    const IconComponent = Iconoir[`${name}`];
    return IconComponent ? createElement(IconComponent) : <Iconoir.QuestionMark />;
};

const QuickLink = ({ title, href, icon }) => {
  return (
    <a href={href} aria-label={title}>
      <div className="flex gap-4 items-center group font-semibold">
        <span className="p-4 rounded-xl bg-gray-100 group-hover:bg-gray-200 text-3xl">
            <DynamicIcon name={icon} />
        </span>
        {title}
      </div>
    </a>
  );
};

export default QuickLink;
