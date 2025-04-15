import Button from "./button";

const Banner = ({ heading, body, image, alt, cta, fullScreen }) => {
  const html = (
    <section
      className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8"
      aria-labelledby="banner-heading"
    >
      <div className="relative h-full rounded-lg overflow-hidden">
        <img
          alt={alt || "Banner background"}
          src={image}
          className="absolute inset-0 w-full h-full object-cover object-center brightness-50"
          role="presentation" // Marks the image as decorative if it has no meaningful alt text
        />
        <div className="relative z-20 pt-40 pb-10 h-full flex flex-col justify-end bg-gradient-to-t from-black to-transparent">
          <div className="mx-auto max-w-7xl px-8 w-full">
            <h2
              id="banner-heading"
              className="text-4xl font-semibold tracking-tight text-white"
            >
              {heading}
            </h2>
            {body && <p className="text-white mt-4 mb-6">{body}</p>}
            {cta && (
              <Button
                as="a"
                href={cta.href}
                aria-label={`Call to action: ${cta.label}`}
              >
                {cta.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );

  return fullScreen ? (
    <section
      className="relative w-full left-1/2 right-1/2 -translate-x-1/2 overflow-hidden"
      aria-labelledby="full-banner-heading"
    >
      <div className="relative h-full">
        <img
          alt={alt || "Full-screen banner background"}
          src={image}
          className="absolute inset-0 w-full h-full object-cover object-center brightness-50"
          role="presentation" // Marks the image as decorative if it has no meaningful alt text
        />
        <div className="relative z-20 pt-40 pb-10 h-full flex flex-col justify-end bg-gradient-to-t from-black to-transparent">
          <div className="mx-auto max-w-7xl px-8 w-full">
            <h2
              id="full-banner-heading"
              className="text-4xl font-semibold tracking-tight text-white"
            >
              {heading}
            </h2>
          </div>
        </div>
      </div>
    </section>
  ) : (
    html
  );
};

export default Banner;