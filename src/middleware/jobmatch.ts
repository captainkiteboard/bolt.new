import axios from 'axios';

  
export interface JobMatchResponse {
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
  
  export const performJobMatch = async (resume: File, jobDescription: File): Promise<JobMatchResponse> => {
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('jobDescription', jobDescription);
  
    try {
      // Check client-side rate limit
      const rateLimitKey = 'job-match-client';
      const rateLimitData = localStorage.getItem(rateLimitKey);
      
      if (rateLimitData) {
        const { count, resetTime } = JSON.parse(rateLimitData);
        const now = Date.now();
        
        if (now < resetTime && count >= 5) {
          throw new Error('Rate limit exceeded. Please try again later.');
        }
        
        if (now >= resetTime) {
          localStorage.setItem(rateLimitKey, JSON.stringify({
            count: 1,
            resetTime: now + 60000 // 1 minute
          }));
        } else {
          localStorage.setItem(rateLimitKey, JSON.stringify({
            count: count + 1,
            resetTime
          }));
        }
      } else {
        localStorage.setItem(rateLimitKey, JSON.stringify({
          count: 1,
          resetTime: Date.now() + 60000 // 1 minute
        }));
      }
      const matchUrl = 'https://n8n-rxew.onrender.com:443/webhook/9d235b66-2a42-4cb4-afd6-b0a84e380f38'
      try {
        const response = await axios.post(matchUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        return response.data as JobMatchResponse;
      } catch (error) {
        console.error('Error sending files to wokflow:', error);
        throw new Error('Failed to perform job match in Middleware');
      }
  
    } catch (error) {
      console.error('Error in job match middleware:', error);
      throw error;
    }
  };