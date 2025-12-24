
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Parliament from './components/Parliament';
import Controls from './components/Controls';
import Footer from './components/Footer';
import Menu from './components/Menu';
import LawModal from './components/LawModal';
import ApprovedLawsModal from './components/ApprovedLawsModal';
import Notification from './components/Notification';
import { initialParliamentLayout } from './constants';
import type { ParliamentLayout, Law } from './types';

type NotificationState = {
  message: string;
  type: 'success' | 'error';
} | null;

const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedParty, setSelectedParty] = useState<string>('progressivists');
  
  // Top Header State
  const [money, setMoney] = useState<number>(102);
  const [moneyChange, setMoneyChange] = useState<number>(7);
  const [population, setPopulation] = useState<number>(97);
  const [happiness, setHappiness] = useState<number>(1);

  // Parliament State
  const [parliamentLayout, setParliamentLayout] = useState<ParliamentLayout>(initialParliamentLayout);
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);

  // Lawmaking State
  const [isLawModalOpen, setIsLawModalOpen] = useState<boolean>(false);
  const [isApprovedLawsModalOpen, setIsApprovedLawsModalOpen] = useState<boolean>(false);
  const [pendingLaws, setPendingLaws] = useState<Law[]>([]);
  const [approvedLaws, setApprovedLaws] = useState<Law[]>([]);
  const [notification, setNotification] = useState<NotificationState>(null);

  // Footer State
  const [supporters, setSupporters] = useState<number>(5);
  const [income, setIncome] = useState<number>(53);
  const [incomeChange, setIncomeChange] = useState<number>(1);
  const [expenses, setExpenses] = useState<number>(50);
  const [approval, setApproval] = useState<number>(8.68);
  const [lawsPassed, setLawsPassed] = useState<number>(7);
  const [year, setYear] = useState<number>(2026);
  const [day, setDay] = useState<number>(1);

  const handleStartGame = (sYear: number, party: string) => {
    setYear(sYear);
    setSelectedParty(party);
    setGameStarted(true);
  };
  
  const handleNextTurn = useCallback(() => {
    setYear(prev => prev + 1);
    setMoney(prev => prev + income - expenses + moneyChange);
    setPopulation(prev => Math.floor(prev * (1 + Math.random() * 0.01)));
    setHappiness(prev => Math.max(1, Math.min(100, Math.round(prev + (Math.random() - 0.45) * 2))));
    setApproval(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 2)));

    // Randomly add a star to a person
    setParliamentLayout(prevLayout => {
      const newLayout = JSON.parse(JSON.stringify(prevLayout));
      const flatPeople = newLayout.flat();
      const nonStarPeople = flatPeople.filter((p: any) => p.color !== 'empty' && p.statusIcon !== 'star');
      if(nonStarPeople.length > 0) {
        const randomPerson = nonStarPeople[Math.floor(Math.random() * nonStarPeople.length)];
        
        for(let r = 0; r < newLayout.length; r++) {
            for(let c = 0; c < newLayout[r].length; c++) {
                if(newLayout[r][c].statusIcon === 'star') {
                    delete newLayout[r][c].statusIcon; // Remove old stars
                }
                if(newLayout[r][c].id === randomPerson.id) {
                    newLayout[r][c].statusIcon = 'star';
                }
            }
        }
      }
      return newLayout;
    });

  }, [income, expenses, moneyChange]);

  const handlePassDay = () => {
    // Process one pending law per day passed
    if (pendingLaws.length > 0) {
      const lawToProcess = pendingLaws[0];
      const remainingLaws = pendingLaws.slice(1);
      
      const isApproved = true; // All laws are now approved

      if (isApproved) {
          setLawsPassed(prev => prev + 1);
          setApprovedLaws(prev => [...prev, { ...lawToProcess, status: 'approved' }]);
          setNotification({ message: `Lei "${lawToProcess.name}" APROVADA!`, type: 'success' });
      }
      setPendingLaws(remainingLaws);
    }

    if (day < 28) {
      setDay(prevDay => prevDay + 1);
    } else {
      setDay(1);
      handleNextTurn(); // This increments the year
    }
  };

  const handleOpenLawModal = () => setIsLawModalOpen(true);
  const handleCloseLawModal = () => setIsLawModalOpen(false);
  const handleOpenApprovedLawsModal = () => setIsApprovedLawsModalOpen(true);
  const handleCloseApprovedLawsModal = () => setIsApprovedLawsModalOpen(false);

  const handleProposeLaw = (name: string, description: string, budget: number) => {
    const newLaw: Law = {
        id: crypto.randomUUID(),
        name,
        description,
        status: 'pending',
        budget,
    };
    // Player pays 70% of the budget, 30% is a kickback.
    const netCost = budget * 0.7;
    setMoney(prev => prev - Math.floor(netCost));
    setPendingLaws(prev => [...prev, newLaw]);
    handleCloseLawModal();
    setNotification({ message: 'Lei enviada para votação!', type: 'success' });
  };

  const handlePersonClick = (personId: string) => {
    setSelectedPersonId(prevId => (prevId === personId ? null : personId));
  };
  
  const handleConvince = () => {
    // Placeholder for convince logic
    console.log(`Convincing person ${selectedPersonId}`);
    setNotification({ message: 'Você tentou convencer o parlamentar.', type: 'success' });
    setSelectedPersonId(null); // Deselect after action
  };

  const handleBribe = () => {
    // Placeholder for bribe logic
    console.log(`Bribing person ${selectedPersonId}`);
    setNotification({ message: 'Você tentou subornar o parlamentar.', type: 'error' });
    setSelectedPersonId(null); // Deselect after action
  };

  const handleImproveBuildings = () => {
    const improvementCost = 50;
    if (money >= improvementCost) {
      setMoney(prev => prev - improvementCost);
      setSupporters(prev => prev + 1);
      setNotification({ message: 'Prédios e casas melhorados! +1 Apoiador.', type: 'success' });
    } else {
      setNotification({ message: 'Dinheiro insuficiente para melhorias.', type: 'error' });
    }
  };

  if (!gameStarted) {
    return <Menu onStartGame={handleStartGame} />;
  }

  return (
    <div className="w-[420px] h-[850px] bg-gray-600 flex flex-col overflow-hidden shadow-2xl border-4 border-gray-700 rounded-2xl">
      <Header
        money={money}
        moneyChange={moneyChange}
        population={population}
        happiness={happiness}
      />
      <main className="flex-grow flex flex-col items-center justify-center p-4 bg-gray-500 relative">
        <div className="absolute bottom-36 w-24 h-16 bg-[#a0522d] border-2 border-[#6f391f] rounded-md shadow-inner flex items-center justify-center z-0">
            <div className="w-20 h-12 bg-[#d2b48c] border-2 border-[#a0522d] rounded-sm"></div>
        </div>
        <Parliament 
          layout={parliamentLayout} 
          selectedPersonId={selectedPersonId}
          onPersonClick={handlePersonClick}
        />
        {notification && (
            <Notification 
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification(null)}
            />
        )}
      </main>
      <Controls 
        selectedPersonId={selectedPersonId}
        onOpenLawModal={handleOpenLawModal}
        onPassDay={handlePassDay}
        onConvince={handleConvince}
        onBribe={handleBribe}
        onOpenApprovedLawsModal={handleOpenApprovedLawsModal}
        onImproveBuildings={handleImproveBuildings}
      />
      <Footer
        supporters={supporters}
        income={income}
        incomeChange={incomeChange}
        expenses={expenses}
        approval={approval}
        lawsPassed={lawsPassed}
        year={year}
        day={day}
      />
      <LawModal 
        isOpen={isLawModalOpen}
        onClose={handleCloseLawModal}
        onProposeLaw={handleProposeLaw}
      />
      <ApprovedLawsModal 
        isOpen={isApprovedLawsModalOpen}
        onClose={handleCloseApprovedLawsModal}
        laws={approvedLaws}
      />
    </div>
  );
};

export default App;
