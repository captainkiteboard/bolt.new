import type { NextConfig } from "next";
import { i18n } from './next-i18next.config';

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  i18n,
    images: {
    domains: ['localhost'],
  },
};

export default nextConfig;
