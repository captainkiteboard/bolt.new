import { useState, useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { UploadSection } from '../components/upload/UploadSection';
import { toast } from 'react-toastify';
import { performJobMatch } from '../middleware/jobmatch';
import { validateFile } from '../utils/filevalidation';
import nextI18NextConfig from '../../next-i18next.config';
import QASection from '../components/jobmatch/qasection';


interface MatchResult {
  CandidateEvaluation: {
    Position: string;
    OverallRecommendation: string;
    Summary: {
      TotalJobFitScore: number;
    };
    KeyCriteriaEvaluation: {
      TechnicalSkillsMatch: {
        Score: number;
        Reasoning: string;
      };
      YearsOfExperience: {
        Score: number;
        Reasoning: string;
      };
      EducationalBackground: {
        Score: number;
        Reasoning: string;
      };
      IndustrySpecificKnowledge: {
        Score: number;
        Reasoning: string;
      };
      ProjectExperience: {
        Score: number;
        Reasoning: string;
      };
      SoftSkillsAndCulturalFit: {
        Score: number;
        Reasoning: string;
      };
    };
    FollowUpQuestions: string[];
  };
}

const HomePage = () => {
  const { t } = useTranslation();
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDraggingResume, setIsDraggingResume] = useState(false);
  const [isDraggingJob, setIsDraggingJob] = useState(false);

  const handleFileUpload = useCallback(async (file: File, type: 'resume' | 'jobDescription') => {
    const validation = validateFile(file);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        if (type === 'resume') {
          setResume(text);
        } else {
          setJobDescription(text);
        }
        toast.success(t('upload.success'));
      };
      reader.readAsText(file);
    } catch (error) {
      toast.error(t('upload.error'));
    }
  }, [t]);

  const handleDrop = useCallback((e: React.DragEvent, type: 'resume' | 'jobDescription') => {
    e.preventDefault();
    setIsDraggingResume(false);
    setIsDraggingJob(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file, type);
    }
  }, [handleFileUpload]);

  const handleMatch = async () => {
    if (!resume || !jobDescription) {
      toast.warning(t('match.missingFields'));
      return;
    }

    setIsProcessing(true);
    try {
      const result = await performJobMatch(resume, jobDescription);
      setMatchResult(result);
      toast.success(t('match.success'));
    } catch (error) {
      console.error('Match error:', error);
      toast.error(t('match.error'));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">{t('home.title')}</h1>
        <h3 className="text-center text-xl font-semibold mb-1">{t('home.subtitle')}</h3>
        <p className="text-center text-sm italic text-gray-600 mb-4 mt-1">*{t('home.ats')}</p>
   
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <UploadSection
            title={t('home.uploadSection.resume.title')}
            value={resume}
            onChange={setResume}
            isDragging={isDraggingResume}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingResume(true);
            }}
            onDragLeave={() => setIsDraggingResume(false)}
            onDrop={(e) => handleDrop(e, 'resume')}
            onFileSelect={(file) => handleFileUpload(file, 'resume')}
            uploadId="resumeUpload"
            dragDropLabel={t('home.uploadSection.resume.dragDrop')}
            placeholder={t('home.uploadSection.resume.placeholder')}
            orLabel={t('home.uploadSection.resume.or')}
          />

          <UploadSection
            title={t('home.uploadSection.jobDescription.title')}
            value={jobDescription}
            onChange={setJobDescription}
            isDragging={isDraggingJob}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingJob(true);
            }}
            onDragLeave={() => setIsDraggingJob(false)}
            onDrop={(e) => handleDrop(e, 'jobDescription')}
            onFileSelect={(file) => handleFileUpload(file, 'jobDescription')}
            uploadId="jobUpload"
            dragDropLabel={t('home.uploadSection.jobDescription.dragDrop')}
            placeholder={t('home.uploadSection.jobDescription.placeholder')}
            orLabel={t('home.uploadSection.resume.or')}
          />
        </div>

        <div className="text-center mb-8">
          <button
            onClick={handleMatch}
            disabled={isProcessing}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('home.processing')}
              </span>
            ) : (
              t('home.matchButton')
            )}
          </button>
        </div>

        {matchResult && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">{t('results.title')}</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">{matchResult.CandidateEvaluation.Position}</h3>
                <p className="text-gray-600">{matchResult.CandidateEvaluation.OverallRecommendation}</p>
              </div>
              <div>
                <h4 className="font-semibold">{t('results.overallScore')}</h4>
                <p className="text-2xl font-bold text-blue-600">
                  {matchResult.CandidateEvaluation.Summary.TotalJobFitScore}%
                </p>
              </div>
            </div>
          </div>
        )}
        <QASection />
      </div>

  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
};

export default HomePage;