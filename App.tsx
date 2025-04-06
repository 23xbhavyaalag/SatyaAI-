import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Check, 
  FileQuestion, 
  MessageSquare, 
  Volume2, 
  Shield, 
  BarChart2,
  History,
  Settings,
  BookOpen,
  HelpCircle,
  Bell,
  User,
  LogOut
} from 'lucide-react';

function App() {
  const [newsText, setNewsText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeSection, setActiveSection] = useState('analyze');
  const [result, setResult] = useState<null | {
    verdict: 'true' | 'fake' | 'review';
    confidence: number;
    explanation: string;
  }>(null);
  const [communityVotes, setCommunityVotes] = useState({
    true: 87,
    fake: 29,
    review: 53,
  });

  const analysisResults = [
    {
      verdict: 'fake',
      confidence: 87,
      explanation: 'This article contains several inconsistencies and unverified claims. The sources mentioned are not credible, and key details contradict verified reports from reliable news outlets.',
    },
    {
      verdict: 'review',
      confidence: 50,
      explanation: 'The content shows mixed signals. While some claims are supported by evidence, others require additional verification. We recommend cross-referencing with other reliable sources before sharing.',
    },
    {
      verdict: 'true',
      confidence: 67,
      explanation: 'Most claims in this article appear to be accurate, though some details could benefit from additional context. The sources cited are generally reliable, but we recommend checking the latest updates on this topic.',
    },
     {
      verdict: 'fake',
      confidence: 27,
      explanation: 'This article contains information that appears to be misleading or false. Several claims lack credible sources or are taken out of context. We recommend verifying with trusted news outlets or official updates before accepting or sharing this content.',
    }
  ] as const;

  const handleAnalyze = async () => {
    if (!newsText.trim()) return;
    
    setIsAnalyzing(true);
    // Simulated API call with random result selection
    setTimeout(() => {
      const randomResult = analysisResults[Math.floor(Math.random() * analysisResults.length)];
      setResult(randomResult);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleVote = (type: 'true' | 'fake' | 'review') => {
    setCommunityVotes(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));
  };

  const handleTextToSpeech = () => {
    if (result?.explanation) {
      const speech = new SpeechSynthesisUtterance(result.explanation);
      window.speechSynthesis.speak(speech);
    }
  };

  const SidebarButton = ({ icon: Icon, label, section }: { icon: any, label: string, section: string }) => (
    <button
      onClick={() => setActiveSection(section)}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all
        ${activeSection === section 
          ? 'bg-indigo-100 text-indigo-700' 
          : 'text-gray-600 hover:bg-gray-100'}`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 px-4 py-6 flex flex-col">
        <div className="flex items-center justify-center mb-8">
          <Shield size={32} className="text-indigo-600" />
          <h1 className="ml-2 text-xl font-bold text-gray-800">SatyaAI</h1>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarButton icon={AlertTriangle} label="Analyze News" section="analyze" />
          <SidebarButton icon={History} label="History" section="history" />
          <SidebarButton icon={BarChart2} label="Statistics" section="stats" />
          <SidebarButton icon={BookOpen} label="Resources" section="resources" />
          <SidebarButton icon={HelpCircle} label="Help & Guide" section="help" />
          <SidebarButton icon={Settings} label="Settings" section="settings" />
        </nav>

        <div className="pt-6 border-t border-gray-200 space-y-2">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-all">
            <User size={20} />
            <span className="font-medium">Profile</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-2xl font-semibold text-gray-800">
            {activeSection === 'analyze' && 'Analyze News'}
            {activeSection === 'history' && 'Detection History'}
            {activeSection === 'stats' && 'Statistics'}
            {activeSection === 'resources' && 'Learning Resources'}
            {activeSection === 'help' && 'Help & Guide'}
            {activeSection === 'settings' && 'Settings'}
          </h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">
              <User size={20} className="text-gray-600" />
              <span className="font-medium text-gray-700">Sparsh Goyal</span>
            </button>
          </div>
        </header>

        <main className="p-8">
          {activeSection === 'analyze' && (
            <div className="space-y-8">
              {/* Stats Section */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
                  <div className="flex items-center justify-center mb-4">
                    <BarChart2 size={32} className="text-indigo-600" />
                  </div>
                  <h3 className="text-center text-2xl font-semibold text-gray-800">99.8%</h3>
                  <p className="text-center text-gray-600">Accuracy Rate</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
                  <div className="flex items-center justify-center mb-4">
                    <MessageSquare size={32} className="text-indigo-600" />
                  </div>
                  <h3 className="text-center text-2xl font-semibold text-gray-800">1M+</h3>
                  <p className="text-center text-gray-600">Articles Analyzed</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
                  <div className="flex items-center justify-center mb-4">
                    <Shield size={32} className="text-indigo-600" />
                  </div>
                  <h3 className="text-center text-2xl font-semibold text-gray-800">500K+</h3>
                  <p className="text-center text-gray-600">Users Protected</p>
                </div>
              </section>

              {/* Input Section */}
              <section className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Analyze News</h2>
                <textarea
                  value={newsText}
                  onChange={(e) => setNewsText(e.target.value)}
                  className="w-full h-40 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none bg-gray-50"
                  placeholder="Paste news article or message here..."
                />
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !newsText.trim()}
                  className={`mt-6 w-full py-4 px-6 rounded-lg text-white font-medium transition-all
                    ${isAnalyzing 
                      ? 'bg-indigo-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:transform active:scale-95'
                    }`}
                >
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Analyzing...
                    </div>
                  ) : 'Analyze News'}
                </button>
              </section>

              {/* Results Section */}
              {result && (
                <section className="bg-white rounded-xl shadow-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Analysis Results</h2>
                    <button
                      onClick={handleTextToSpeech}
                      className="p-2 text-gray-600 hover:text-indigo-600 transition-colors rounded-full hover:bg-indigo-50"
                      title="Read Results"
                    >
                      <Volume2 size={24} />
                    </button>
                  </div>

                  <div className="flex items-center mb-8">
                    {result.verdict === 'true' && (
                      <div className="flex items-center text-green-600 bg-green-50 px-4 py-2 rounded-full">
                        <Check size={24} className="mr-2" />
                        <span className="font-medium">Likely True</span>
                      </div>
                    )}
                    {result.verdict === 'fake' && (
                      <div className="flex items-center text-red-600 bg-red-50 px-4 py-2 rounded-full">
                        <AlertTriangle size={24} className="mr-2" />
                        <span className="font-medium">Likely Fake</span>
                      </div>
                    )}
                    {result.verdict === 'review' && (
                      <div className="flex items-center text-yellow-600 bg-yellow-50 px-4 py-2 rounded-full">
                        <FileQuestion size={24} className="mr-2" />
                        <span className="font-medium">Needs Review</span>
                      </div>
                    )}
                    <div className="ml-6 text-gray-600">
                      <span className="font-medium">{result.confidence}%</span> confidence
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Analysis Explanation</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {result.explanation}
                    </p>
                  </div>
                </section>
              )}

              {/* Community Verification */}
              <section className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <MessageSquare size={28} className="text-indigo-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-800">Community Verification</h2>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <button
                    onClick={() => handleVote('true')}
                    className="flex flex-col items-center p-6 rounded-xl border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all group"
                  >
                    <span className="text-3xl font-semibold mb-3 group-hover:text-green-600">{communityVotes.true}</span>
                    <span className="text-gray-600 group-hover:text-green-600">True</span>
                  </button>
                  <button
                    onClick={() => handleVote('fake')}
                    className="flex flex-col items-center p-6 rounded-xl border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 transition-all group"
                  >
                    <span className="text-3xl font-semibold mb-3 group-hover:text-red-600">{communityVotes.fake}</span>
                    <span className="text-gray-600 group-hover:text-red-600">Fake</span>
                  </button>
                  <button
                    onClick={() => handleVote('review')}
                    className="flex flex-col items-center p-6 rounded-xl border-2 border-gray-200 hover:border-yellow-500 hover:bg-yellow-50 transition-all group"
                  >
                    <span className="text-3xl font-semibold mb-3 group-hover:text-yellow-600">{communityVotes.review}</span>
                    <span className="text-gray-600 group-hover:text-yellow-600">Needs Review</span>
                  </button>
                </div>
              </section>
            </div>
          )}

          {activeSection === 'history' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Analysis History</h3>
                {/* Sample history items */}
                {[1, 2, 3].map((item) => (
                  <div key={item} className="border-b border-gray-100 py-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <AlertTriangle size={20} className="text-red-500 mr-2" />
                        <span className="font-medium text-gray-800">Fake News Detected</span>
                      </div>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                    <p className="text-gray-600 line-clamp-2">Sample news article excerpt that was analyzed...</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'stats' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Detection Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">75%</div>
                    <div className="text-sm text-green-700">True News Detected</div>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">25%</div>
                    <div className="text-sm text-red-700">Fake News Detected</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'resources' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Educational Resources</h3>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 transition-colors">
                    <h4 className="font-medium text-gray-800">How to Spot Fake News</h4>
                    <p className="text-gray-600 mt-2">Learn the key indicators of misinformation...</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 transition-colors">
                    <h4 className="font-medium text-gray-800">Fact-Checking Guidelines</h4>
                    <p className="text-gray-600 mt-2">Best practices for verifying information...</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;