import Button from "./button";

const Banner = ({ heading, body, image, cta, fullScreen }) => {
    const html = (
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
                            {body && <p className="text-white mt-4 mb-6">{body}</p>}
                            {cta && <Button as="a" href="/discover">{cta}</Button>}
                        </div>
                    </div>
            </div>
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
