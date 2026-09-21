const nextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.SUPABASE_URL_PUBLIC || "",
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.SUPABASE_PUBLISHABLE || "",
  },
};

export default nextConfig;
