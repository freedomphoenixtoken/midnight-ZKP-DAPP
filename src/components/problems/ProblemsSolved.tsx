import { AlertTriangle, CheckCircle, Shield, Zap, TrendingUp } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface Problem {
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
}

interface ProblemsSolvedProps {
  featureName: string;
  problems: Problem[];
}

export function ProblemsSolved({ featureName, problems }: ProblemsSolvedProps) {
  const { theme } = useTheme();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return theme === 'dark' ? 'bg-red-900/20 border-red-700 text-red-100' : 'bg-red-50 border-red-200 text-red-900';
      case 'medium':
        return theme === 'dark' ? 'bg-orange-900/20 border-orange-700 text-orange-100' : 'bg-orange-50 border-orange-200 text-orange-900';
      case 'low':
        return theme === 'dark' ? 'bg-yellow-900/20 border-yellow-700 text-yellow-100' : 'bg-yellow-50 border-yellow-200 text-yellow-900';
      default:
        return theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-gray-50 border-gray-200 text-gray-900';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return AlertTriangle;
      case 'medium':
        return Shield;
      case 'low':
        return TrendingUp;
      default:
        return Zap;
    }
  };

  return (
    <div className={`rounded-2xl p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} mb-6`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-purple-900' : 'bg-purple-100'}`}>
          <Shield className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Problems {featureName} Solves</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Real-world issues addressed by this feature</p>
        </div>
      </div>

      <div className="space-y-4">
        {problems.map((problem, index) => {
          const Icon = getSeverityIcon(problem.severity);
          return (
            <div
              key={index}
              className={`p-4 rounded-xl border ${getSeverityColor(problem.severity)} flex items-start gap-4`}
            >
              <div className="p-2 rounded-lg bg-current bg-opacity-20 flex-shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">{problem.title}</h4>
                <p className="text-sm opacity-90">{problem.description}</p>
              </div>
              <div className="flex-shrink-0">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  problem.severity === 'high' ? 'bg-red-500 text-white' :
                  problem.severity === 'medium' ? 'bg-orange-500 text-white' :
                  'bg-yellow-500 text-white'
                }`}>
                  {problem.severity.toUpperCase()}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`mt-4 p-4 rounded-xl flex items-start gap-3 ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-green-900 dark:text-green-100">
          <span className="font-semibold">Solution:</span> Zero-knowledge proofs solve these problems by verifying statements without revealing the underlying data, enabling privacy-first interactions on the blockchain.
        </p>
      </div>
    </div>
  );
}
