import { useState } from 'react';

export interface AIAnalysisResult {
  conditionScore: number;
  isAuthentic: boolean;
  analyzing: boolean;
}

export function useAIAnalysis() {
  const [result, setResult] = useState<AIAnalysisResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const analyzeShoe = async (_imageBytes: Uint8Array): Promise<AIAnalysisResult> => {
    setAnalyzing(true);
    setResult(null);

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2200));

    // Simulate AI results: condition score 40-98, authenticity weighted toward authentic
    const conditionScore = Math.floor(Math.random() * 59) + 40;
    const isAuthentic = Math.random() > 0.25; // 75% chance authentic

    const analysisResult: AIAnalysisResult = {
      conditionScore,
      isAuthentic,
      analyzing: false,
    };

    setResult(analysisResult);
    setAnalyzing(false);
    return analysisResult;
  };

  const reset = () => {
    setResult(null);
    setAnalyzing(false);
  };

  return { analyzeShoe, result, analyzing, reset };
}
