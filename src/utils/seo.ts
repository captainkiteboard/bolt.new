type PageSEO = {
  [key: string]: {
    title: string;
    description: string;
    keywords: string;
  };
};

export const getSEOTags = (page: keyof PageSEO) => {
    const baseKeywords = 'resume matching tool, job description match, ATS optimization';
    
    const pageSEO: PageSEO = {
      home: {
        title: 'Job Match - Resume Matching Tool | Optimize Your Resume',
        description: 'Match your resume to job descriptions instantly. Optimize for ATS and improve your chances of landing the job.',
        keywords: `${baseKeywords}, resume score checker, CV enhancement tool`
      },
      // ... other pages
    };
  
    return pageSEO[page];
  };