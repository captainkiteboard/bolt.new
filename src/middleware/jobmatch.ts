// src/middleware/jobMatch.ts

import { jobMatchRateLimiter } from './config';


interface JobMatchRequest {
    resume: string;
    jobDescription: string;
  }
  
  interface JobMatchResponse {
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
  
export const performJobMatch = async (
    resume: string,
    jobDescription: string
  ): Promise<JobMatchResponse> => {
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
  
      const response = await fetch('YOUR_BACKEND_API_URL/job-match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resume,
          jobDescription,
        }),
      });
  
      if (response.status === 429) {
        const data = await response.json();
        throw new Error(data.error);
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in job match middleware:', error);
      throw error;
    }
  };