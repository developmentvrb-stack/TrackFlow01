
import React, { useState, useEffect } from 'react';
import { Trip, User } from './types.ts';
import DriverView from './components/DriverView.tsx';
import ManagerDashboard from './components/ManagerDashboard.tsx';
import Login from './components/Login.tsx';
import { Car, LogOut } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('trackflow_session');
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('trackflow_users');
    return saved ? JSON.parse(saved) : [];
  });

  const [trips, setTrips] = useState<Trip[]>(() => {
    const saved = localStorage.getItem('conveyance_trips');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('conveyance_trips', JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem('trackflow_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('trackflow_session', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('trackflow_session');
    }
  }, [currentUser]);

  const handleLogout = () => setCurrentUser(null);

  if (!currentUser) {
    return <Login onLogin={setCurrentUser} users={users} setUsers={setUsers} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Car className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">TrackFlow</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-bold text-slate-900">{currentUser.name}</span>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{currentUser.role} • {currentUser.id}</span>
              </div>
              <div className="h-8 w-px bg-slate-200 mx-2"></div>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {currentUser.role === 'EMPLOYEE' ? (
          <DriverView user={currentUser} trips={trips} onTripsUpdate={setTrips} />
        ) : (
          <ManagerDashboard user={currentUser} trips={trips} onTripsUpdate={setTrips} />
        )}
      </main>

      <footer className="bg-white border-t py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
          Secure Conveyance Tracking &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default App;
