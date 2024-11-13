// src/components/common/MetaTags.tsx
import Head from 'next/head';
import { FC } from 'react';

interface MetaTagsProps {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
}

export const MetaTags: FC<MetaTagsProps> = ({
  title,
  description,
  keywords,
  ogImage = '/og-image.jpg'
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  );
};