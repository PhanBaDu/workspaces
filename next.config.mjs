import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
