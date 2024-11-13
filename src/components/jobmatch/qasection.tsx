import { useState } from 'react';
import { useTranslation } from 'next-i18next';

const QASection = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const questionsAndAnswers = [
    { question: t('qa.q1'), answer: t('qa.a1') },
    { question: t('qa.q2'), answer: t('qa.a2') },
    { question: t('qa.q3'), answer: t('qa.a3') },
    { question: t('qa.q4'), answer: t('qa.a4') },
    { question: t('qa.q5'), answer: t('qa.a5') },
    { question: t('qa.q6'), answer: t('qa.a6') },
    { question: t('qa.q7'), answer: t('qa.a7') },
    { question: t('qa.q8'), answer: t('qa.a8') },
    { question: t('qa.q9'), answer: t('qa.a9') },
    { question: t('qa.q10'), answer: t('qa.a10') },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">{t('qa.title')}</h2>
      {questionsAndAnswers.map((qa, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection(index)}
          >
            <h3 className="text-lg font-semibold">{qa.question}</h3>
            <span className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </div>
          {openIndex === index && (
            <div className="mt-2 p-2 bg-gray-100 rounded">
              <p className="text-gray-700">{qa.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QASection;