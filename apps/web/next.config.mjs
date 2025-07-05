const nextConfig = {
  transpilePackages: ["@repo/ui"],
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/self-care-routine" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
