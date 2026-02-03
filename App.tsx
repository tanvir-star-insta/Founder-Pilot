
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import IdeaForm from './components/IdeaForm';
import PlanDashboard from './components/PlanDashboard';
import ResourcesPage from './components/ResourcesPage';
import CommunityPage from './components/CommunityPage';
import DeepReadiness from './components/DeepReadiness';
import { generateStartupPlan } from './services/gemini';
import { StartupPlan, AppState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>('idle');
  const [idea, setIdea] = useState<string>('');
  const [plan, setPlan] = useState<StartupPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (userIdea: string) => {
    setIdea(userIdea);
    setState('analyzing');
    setError(null);
    try {
      const generatedPlan = await generateStartupPlan(userIdea);
      setPlan(generatedPlan);
      setState('viewing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setError('Neural processing failed. Try simplifying your prompt.');
      setState('idle');
    }
  };

  const startReadiness = () => {
    setState('readiness-check');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (newState: AppState) => {
    setState(newState);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const reset = () => {
    setState('idle');
    setPlan(null);
    setIdea('');
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white">
      <Navbar currentState={state} onNavigate={handleNavigate} onReset={reset} />
      
      <main className="flex-grow">
        {state === 'idle' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full"></div>
            </div>

            <div className="inline-flex items-center space-x-2 px-4 py-2 mb-10 text-xs font-black tracking-widest text-cyan-400 uppercase bg-cyan-400/10 border border-cyan-400/20 rounded-full">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></span>
              <span>v4.0 Dynamic Intelligence</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
              BUILD FOR <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-500">BHARAT.</span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
              FounderPilot AI is the execution co-founder for the next generation of Indian student entrepreneurs. High-precision roadmaps, curated tools, and real-world stress tests.
            </p>
            
            <IdeaForm onAnalyze={handleAnalyze} loading={false} />

            {error && (
              <div className="mt-10 p-6 glass border-red-500/20 text-red-400 rounded-2xl max-w-xl mx-auto flex items-center">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                <span className="font-bold">{error}</span>
              </div>
            )}
          </div>
        )}

        {state === 'analyzing' && (
          <div className="flex flex-col items-center justify-center py-40 px-4">
            <div className="w-24 h-24 border-[4px] border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <h2 className="text-4xl font-black text-white mt-12 mb-4 tracking-tighter">Forging Your Roadmap...</h2>
            <p className="text-slate-400 text-center max-w-sm font-medium">Analyzing campus-specific operational realities for your idea.</p>
          </div>
        )}

        {state === 'viewing' && plan && (
          <PlanDashboard plan={plan} onCheckReadiness={startReadiness} />
        )}

        {state === 'readiness-check' && idea && (
          <DeepReadiness idea={idea} onFinish={() => setState('viewing')} />
        )}

        {state === 'resources' && <ResourcesPage />}
        {state === 'community' && <CommunityPage />}
      </main>

      <footer className="bg-navy-950 border-t border-white/5 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <p className="text-[10px] font-black text-slate-700 tracking-widest uppercase italic">Made with ❤️ for Indian Student Founders // Precision v4.0</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
