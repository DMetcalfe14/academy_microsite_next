"use client"; // Declare this as a Client Component

import React, { forwardRef } from "react";

const Button = forwardRef(
  (
    {
      as: Component = "button",
      type = "button",
      href,
      variant = "primary",
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "flex-none rounded-md px-3.5 py-2.5 text-sm font-semibold " +
      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

    const variantStyles = {
      primary:
        "bg-primary text-white hover:bg-primary_hover " +
        "focus-visible:outline-primary",
      white:
        "bg-white text-primary hover:bg-gray-50 " +
        "border-2 border-gray-100 focus-visible:outline-primary",
    };

    // Accessibility props for links styled as buttons
    const accessibilityProps =
      Component === "a"
        ? {
            role: "button",
            tabIndex: 0,
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.target.click(); // Simulate a button click for keyboard users
              }
            },
          }
        : {};

    return (
      <Component
        ref={ref}
        type={Component === "button" ? type : undefined}
        href={href}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        {...accessibilityProps}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

export default Button;