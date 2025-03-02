const Banner = ({ heading, body, image, cta, fullScreen }) => {
    const html = (
        <div className={`relative overflow-hidden ${fullScreen ? '' : "rounded-lg"} max-h-[400px]`}>
            <div className="w-full h-full bg-gradient-to-t from-black to-transparent absolute px-10 py-10 flex flex-col justify-end">
                <div className="mx-auto max-w-7xl w-full px-8">
                    <h2 className="text-4xl font-semibold tracking-tight text-white">
                        {heading}
                    </h2>
                    <p className="mt-4 text-lg text-white">{body}</p>
                    {cta && (
                        <button className="mt-6 max-w-fit rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                            {cta}
                        </button>
                    )}
                </div>
            </div>
            <img
                className="object-cover object-center w-full aspect-16/9"
                src={image}
                alt=""
            />
        </div>
    );

    return fullScreen ? (
        <div className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 overflow-hidden">
            <div className="relative h-full">
                <img
                    alt=""
                    src={image}
                    className="absolute inset-0 w-full h-full object-cover object-center brightness-50"
                />
                    <div className="relative z-20 pt-40 pb-10 h-full flex flex-col justify-end bg-gradient-to-t from-black to-transparent">
                        <div className="mx-auto max-w-7xl px-8 w-full">
                            <h2 className="text-4xl font-semibold tracking-tight text-white">{heading}</h2>
                        </div>
                    </div>
            </div>
        </div>

    ) : (
        html
    );
};

export default Banner;
