import { FC, useState } from 'react';
import { useTranslation } from 'next-i18next';

export const UploadForm: FC = () => {
  const { t } = useTranslation();
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Call middleware function here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label>{t('resume.upload')}</label>
        <textarea
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label>{t('job.description')}</label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {t('match.button')}
      </button>
    </form>
  );
};