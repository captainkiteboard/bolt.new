import Head from 'next/head';
import { FC } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords: string;
}

export const SEOHead: FC<SEOHeadProps> = ({ title, description, keywords }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <link rel="canonical" href="https://yourwebsite.com" />
    </Head>
  );
};