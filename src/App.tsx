import InteractiveDemo from './InteractiveDemo';
import { MonitorPlay } from 'lucide-react';

function App() {
  return (
    <div className="w-full h-screen bg-slate-50 flex flex-col overflow-hidden">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm z-50 relative">
        <h1 className="text-xl font-bold text-slate-800">Automatización Concurso Bluesouth</h1>
        
        <div className="flex items-center text-blue-600 font-medium">
          <MonitorPlay className="w-5 h-5 mr-2" />
          Demo Interactiva
        </div>
      </header>

      <main className="flex-1 w-full relative bg-slate-50 flex flex-col">
        <div className="flex-1 w-full overflow-y-auto overflow-x-hidden">
          <InteractiveDemo />
        </div>
      </main>
    </div>
  );
}

export default App;