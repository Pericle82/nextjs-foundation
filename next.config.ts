import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';


const nextConfig: NextConfig = {
   logging: {
      fetches: {
        fullUrl: process.env.NODE_ENV === 'development'
      }
    }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
