import Button from "@/components/button";

export default function Custom404() {
  return (
    <main
      className="grid h-[calc(100vh-90px)] place-items-center px-10"
      aria-labelledby="error-heading"
    >
      <div className="text-center">
        {/* Error Code */}
        <p
          className="font-semibold text-primary text-7xl"
          aria-hidden="true" // Marked as decorative since the heading conveys the error
        >
          404
        </p>

        {/* Error Heading */}
        <h1
          id="error-heading"
          className="mt-4 text-3xl font-semibold tracking-tight text-balance text-gray-900"
        >
          Resource not found
        </h1>

        {/* Error Description */}
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Sorry, we couldn’t find the resource you’re looking for.
        </p>

        {/* Navigation Button */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button
            className="text-center"
            as="a"
            href="index.html"
            aria-label="Go back to the homepage"
          >
            Go back home
          </Button>
        </div>
      </div>
    </main>
  );
}
