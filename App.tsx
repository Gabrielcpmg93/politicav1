
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Parliament from './components/Parliament';
import Controls from './components/Controls';
import Footer from './components/Footer';
import Menu from './components/Menu';
import LawModal from './components/LawModal';
import ApprovedLawsModal from './components/ApprovedLawsModal';
import ImprovementModal from './components/ImprovementModal';
import TaxModal from './components/TaxModal';
import BalanceModal from './components/BalanceModal';
import CampaignModal from './components/CampaignModal';
import Notification from './components/Notification';
import { generateParliamentLayout } from './constants';
import type { ParliamentLayout, Law } from './types';
import { PersonColor } from './types';

type NotificationState = {
  message: string;
  type: 'success' | 'error';
} | null;

type Party = {
  name: string;
  seats: number;
  color: PersonColor;
};

const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedParty, setSelectedParty] = useState<string>('progressivists');
  
  // Top Header State
  const [publicBalance, setPublicBalance] = useState<number>(1000);
  const [population, setPopulation] = useState<number>(97);
  const [happiness, setHappiness] = useState<number>(1);
  
  // Party & Parliament State
  const [parties, setParties] = useState<Party[]>([
    { name: 'Progressistas', seats: 18, color: PersonColor.Orange }, // Player's party
    { name: 'Aliança Renovadora', seats: 12, color: PersonColor.Blue },
    { name: 'Frente Cívica', seats: 10, color: PersonColor.DarkGreen },
    { name: 'Independentes', seats: 8, color: PersonColor.Yellow },
  ]);
  const [parliamentLayout, setParliamentLayout] = useState<ParliamentLayout>(() => generateParliamentLayout(parties));
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);

  // Modal States
  const [isLawModalOpen, setIsLawModalOpen] = useState<boolean>(false);
  const [isApprovedLawsModalOpen, setIsApprovedLawsModalOpen] = useState<boolean>(false);
  const [isImprovementModalOpen, setIsImprovementModalOpen] = useState<boolean>(false);
  const [isTaxModalOpen, setIsTaxModalOpen] = useState<boolean>(false);
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState<boolean>(false);
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState<boolean>(false);

  // Game Logic State
  const [pendingLaws, setPendingLaws] = useState<Law[]>([]);
  const [approvedLaws, setApprovedLaws] = useState<Law[]>([]);
  const [notification, setNotification] = useState<NotificationState>(null);
  const [taxRates, setTaxRates] = useState({ income: 10, corporate: 15, sales: 5 });

  // Footer State
  const [supporters, setSupporters] = useState<number>(5);
  const [income, setIncome] = useState<number>(53);
  const [incomeChange, setIncomeChange] = useState<number>(1);
  const [expenses, setExpenses] = useState<number>(50);
  const [approval, setApproval] = useState<number>(8.68);
  const [lawsPassed, setLawsPassed] = useState<number>(7);
  const [year, setYear] = useState<number>(2026);
  const [month, setMonth] = useState<number>(1);
  const [day, setDay] = useState<number>(1);

  useEffect(() => {
    const baseIncome = 20; // Base income from other sources
    const incomeFromPopulation = population * (taxRates.income / 100) * 0.8;
    const incomeFromCorporate = 10 * (taxRates.corporate / 10);
    const incomeFromSales = population * (taxRates.sales / 100) * 1.5;
    const totalIncome = Math.round(baseIncome + incomeFromPopulation + incomeFromCorporate + incomeFromSales);
    setIncome(totalIncome);
  }, [taxRates, population]);

  const handleStartGame = (sYear: number, party: string) => {
    setYear(sYear);
    setSelectedParty(party);
    setGameStarted(true);
  };
  
  const handlePassDay = () => {
    const nextDay = day === 28 ? 1 : day + 1;
    
    if (nextDay === 10) {
      setIsCampaignModalOpen(true);
    }

    if (pendingLaws.length > 0) {
      const lawToProcess = pendingLaws[0];
      const remainingLaws = pendingLaws.slice(1);
      
      const isApproved = true;

      if (isApproved) {
          setLawsPassed(prev => prev + 1);
          setApprovedLaws(prev => [...prev, { ...lawToProcess, status: 'approved' }]);
          setPublicBalance(prev => prev + lawToProcess.budget);
          setNotification({ message: `Lei "${lawToProcess.name}" aprovada! Verba de ${lawToProcess.budget}M adicionada.`, type: 'success' });
      }
      setPendingLaws(remainingLaws);
    }

    if (day < 28) {
      setDay(prevDay => prevDay + 1);
    } else {
      setDay(1);
      // Monthly updates
      setPublicBalance(prev => prev + income - expenses);
      setPopulation(prev => Math.floor(prev * (1 + Math.random() * 0.005))); // monthly growth
      setHappiness(prev => Math.max(1, Math.min(100, Math.round(prev + (Math.random() - 0.48) * 2)))); // random fluctuation
      setApproval(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 1))); // random fluctuation

      if (month < 12) {
        setMonth(prevMonth => prevMonth + 1);
      } else { // End of year
        setMonth(1);
        setYear(prevYear => prevYear + 1);
      }
    }
  };

  const handleOpenLawModal = () => setIsLawModalOpen(true);
  const handleCloseLawModal = () => setIsLawModalOpen(false);
  const handleOpenApprovedLawsModal = () => setIsApprovedLawsModalOpen(true);
  const handleCloseApprovedLawsModal = () => setIsApprovedLawsModalOpen(false);
  const handleOpenImprovementModal = () => setIsImprovementModalOpen(true);
  const handleCloseImprovementModal = () => setIsImprovementModalOpen(false);
  const handleOpenTaxModal = () => setIsTaxModalOpen(true);
  const handleCloseTaxModal = () => setIsTaxModalOpen(false);
  const handleOpenBalanceModal = () => setIsBalanceModalOpen(true);
  const handleCloseBalanceModal = () => setIsBalanceModalOpen(false);
  const handleCloseCampaignModal = () => setIsCampaignModalOpen(false);

  const handleProposeLaw = (name: string, description: string, budget: number) => {
    const newLaw: Law = { id: crypto.randomUUID(), name, description, status: 'pending', budget };
    setPendingLaws(prev => [...prev, newLaw]);
    handleCloseLawModal();
    setNotification({ message: 'Lei enviada para votação!', type: 'success' });
  };

  const handlePersonClick = (personId: string) => setSelectedPersonId(prevId => (prevId === personId ? null : personId));
  
  const handleConvince = () => {
    setNotification({ message: 'Você tentou convencer o parlamentar.', type: 'success' });
    setSelectedPersonId(null);
  };

  const handleBribe = () => {
    setNotification({ message: 'Você tentou subornar o parlamentar.', type: 'error' });
    setSelectedPersonId(null);
  };

  const handlePurchaseImprovement = (cost: number, effects: { supporters?: number; happiness?: number; approval?: number; expenses?: number }, name: string) => {
    if (publicBalance >= cost) {
      setPublicBalance(prev => prev - cost);
      if (effects.supporters) setSupporters(prev => prev + effects.supporters!);
      if (effects.happiness) setHappiness(prev => Math.min(100, prev + effects.happiness!));
      if (effects.approval) setApproval(prev => Math.min(100, prev + effects.approval!));
      if (effects.expenses) setExpenses(prev => Math.max(0, prev + effects.expenses!));
      setNotification({ message: `${name} melhorado com sucesso!`, type: 'success' });
    } else {
      setNotification({ message: 'Saldo público insuficiente para melhoria.', type: 'error' });
    }
  };

  const handleTaxChange = (newRates: { income: number; corporate: number; sales: number }) => {
    const oldAverage = (taxRates.income + taxRates.corporate + taxRates.sales) / 3;
    const newAverage = (newRates.income + newRates.corporate + newRates.sales) / 3;
    const happinessChange = Math.round(oldAverage - newAverage);
    setHappiness(prev => Math.max(1, Math.min(100, prev + happinessChange)));

    setTaxRates(newRates);
    setNotification({ message: `Impostos atualizados! Felicidade ${happinessChange >= 0 ? '+' : ''}${happinessChange}.`, type: 'success' });
  };

  const handleRunCampaign = (cost: number, potentialGain: number) => {
    if (publicBalance < cost) {
        setNotification({ message: 'Saldo público insuficiente para esta campanha.', type: 'error' });
        return;
    }
    setPublicBalance(prev => prev - cost);

    const baseInfluence = (approval / 100) + (supporters / 50) - 0.5; // From -0.5 to ~1.5
    const randomFactor = (Math.random() - 0.5) * 0.5; // +/- 25% variance
    const totalInfluence = baseInfluence + potentialGain + randomFactor;
    
    let seatsFlipped = Math.round(totalInfluence * 5); // Max ~10 seats can flip

    setParties(currentParties => {
        const newParties = JSON.parse(JSON.stringify(currentParties));
        const playerParty = newParties[0];
        const oppositionParties = newParties.slice(1);

        playerParty.seats += seatsFlipped;

        // Distribute losses/gains among opposition
        let seatsToDistribute = -seatsFlipped;
        while(seatsToDistribute !== 0) {
            const partyToChange = oppositionParties[Math.floor(Math.random() * oppositionParties.length)];
            if(seatsToDistribute > 0 && partyToChange.seats < 48) { // opposition gains seats
                partyToChange.seats++;
                seatsToDistribute--;
            } else if (seatsToDistribute < 0 && partyToChange.seats > 0) { // opposition loses seats
                partyToChange.seats--;
                seatsToDistribute++;
            }
            // Break if in a deadlock
            if (!oppositionParties.some(p => (seatsToDistribute > 0 && p.seats < 48) || (seatsToDistribute < 0 && p.seats > 0))) {
                break;
            }
        }
        
        // Normalize seat counts to ensure they sum to 48
        const totalSeats = newParties.reduce((sum: number, p: Party) => sum + p.seats, 0);
        const discrepancy = 48 - totalSeats;
        if (discrepancy !== 0) {
            const partyToAdjust = newParties.find((p: Party) => p.seats > 0);
            if(partyToAdjust) partyToAdjust.seats += discrepancy;
        }
        newParties.forEach((p: Party) => p.seats = Math.max(0, p.seats));

        setParliamentLayout(generateParliamentLayout(newParties));
        setNotification({ message: `Campanha concluída! Você ${seatsFlipped >= 0 ? 'ganhou' : 'perdeu'} ${Math.abs(seatsFlipped)} assento(s).`, type: seatsFlipped >= 0 ? 'success' : 'error' });
        return newParties;
    });

    setSupporters(prev => prev + seatsFlipped);
  };


  if (!gameStarted) {
    return <Menu onStartGame={handleStartGame} />;
  }

  return (
    <div className="w-[420px] h-[850px] bg-gray-600 flex flex-col overflow-hidden shadow-2xl border-4 border-gray-700 rounded-2xl">
      <Header population={population} happiness={happiness} />
      <main className="flex-grow flex flex-col items-center justify-center p-4 bg-gray-500 relative">
        <div className="absolute bottom-36 w-24 h-16 bg-[#a0522d] border-2 border-[#6f391f] rounded-md shadow-inner flex items-center justify-center z-0">
            <div className="w-20 h-12 bg-[#d2b48c] border-2 border-[#a0522d] rounded-sm"></div>
        </div>
        <Parliament layout={parliamentLayout} selectedPersonId={selectedPersonId} onPersonClick={handlePersonClick} />
        {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      </main>
      <Controls
        selectedPersonId={selectedPersonId}
        onOpenLawModal={handleOpenLawModal}
        onPassDay={handlePassDay}
        onConvince={handleConvince}
        onBribe={handleBribe}
        onOpenApprovedLawsModal={handleOpenApprovedLawsModal}
        onOpenImprovementModal={handleOpenImprovementModal}
        onOpenTaxModal={handleOpenTaxModal}
        onOpenBalanceModal={handleOpenBalanceModal}
      />
      <Footer supporters={supporters} income={income} incomeChange={incomeChange} expenses={expenses} approval={approval} lawsPassed={lawsPassed} year={year} month={month} day={day} />
      <LawModal isOpen={isLawModalOpen} onClose={handleCloseLawModal} onProposeLaw={handleProposeLaw} />
      <ApprovedLawsModal isOpen={isApprovedLawsModalOpen} onClose={handleCloseApprovedLawsModal} laws={approvedLaws} />
      <ImprovementModal isOpen={isImprovementModalOpen} onClose={handleCloseImprovementModal} onPurchase={handlePurchaseImprovement} playerMoney={publicBalance} />
      <TaxModal isOpen={isTaxModalOpen} onClose={handleCloseTaxModal} onSave={handleTaxChange} currentRates={taxRates} />
      <BalanceModal isOpen={isBalanceModalOpen} onClose={handleCloseBalanceModal} balance={publicBalance} />
      <CampaignModal isOpen={isCampaignModalOpen} onClose={handleCloseCampaignModal} parties={parties} onRunCampaign={handleRunCampaign} />
    </div>
  );
};

export default App;
