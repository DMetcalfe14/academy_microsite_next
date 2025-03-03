/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    images: { unoptimized: true },
    async redirects() {
        return [
          {
            source: "/:path+/",
            destination: "/:path+.html",
            permanent: true,
          },
        ];
      },
};

export default nextConfig;
