"use client";
import { useState } from "react";

export default function Home() {
  const [credit, setCredit] = useState(0);
  const [cashReceived, setCashReceived] = useState(0);
  const [step, setStep] = useState("home");
  const [selectedBank, setSelectedBank] = useState<string | null>(null); // Specify type
  const [enteredCredit, setEnteredCredit] = useState(0);
  const [selectedGame, setSelectedGame] = useState<string | null>(null); // Specify type
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null); // Specify type

  const bankRates = {
    "true wallet": {
      rate: -1,
      imageUrl: "https://img5.pic.in.th/file/secure-sv1/unnamed-29866a35efe6922cd.md.png",  
    },
    "true money": {
      rate: -2,
      imageUrl: "https://img5.pic.in.th/file/secure-sv1/1200x600wa35b12779c143ae01.png",  
    },
    "scb": {
      rate: 0,
      imageUrl: "https://img2.pic.in.th/pic/truemoneywallet-scb-fund-in-fundin-logo.webp",  
    },
    "qr": {
      rate: 1,
      imageUrl: "https://img5.pic.in.th/file/secure-sv1/60c7a04174f88feb212e680c70c507b6.jpg",  
    },
  };

  const gameRates = {
    "game1": { rate: 7, imageUrl: "https://img2.pic.in.th/pic/unnamed8660e8ce694be1d5.webp" },  
    "game2": { rate: 12, imageUrl: "https://img5.pic.in.th/file/secure-sv1/unnamed-1c95d6d717253979d.md.png" },  
    "game3": { rate: 2, imageUrl: "https://img5.pic.in.th/file/secure-sv1/unnamed5e5f09c0f100d304.md.png" },  
    "game4": { rate: 50, imageUrl: "https://img2.pic.in.th/pic/unnamed-1c04b94cdde38d722.webp" },  
  };

  const handleDeposit = () => {
    setStep("selectBank");
  };

  const handleBankSelect = (bank: string) => { // Specify type for 'bank'
    setSelectedBank(bank);
    setEnteredCredit(0);
    setStep("enterCredit");
  };

  const handleCreditInput = (value: number) => { // Specify type for 'value'
    if (value >= 1 && value <= 15) {
      setEnteredCredit(value);
    }
  };

  const confirmDeposit = () => {
    if (selectedBank) {
      setCredit((prev) => prev + enteredCredit + bankRates[selectedBank].rate);
    }
    setStep("home");
  };

  const handleExchange = () => {
    setStep("selectGame");
  };

  const handleGameSelect = (game: string) => { // Specify type for 'game'
    setSelectedGame(game);
    setStep("selectAmount");
  };

  const handleAmountSelect = (amount: number) => { // Specify type for 'amount'
    const requiredCredit = amount;
    if (credit >= requiredCredit) {
      setCredit((prev) => prev - requiredCredit);
      const totalCash = requiredCredit + gameRates[selectedGame as string].rate;
      setCashReceived(totalCash);
      alert(`แลกแคชสำเร็จ! ได้รับแคช: ${totalCash}`);
      setStep("showCash");
    } else {
      alert("เครติดไม่พอสำหรับการแลกแคช!");
      setStep("home");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-4 rounded-xl shadow-md mb-4 text-center">
        <h2 className="text-xl font-bold">เครติดที่มี: {credit}</h2>
      </div>
      {step === "home" && (
        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md text-center">
          <div className="flex gap-4 mb-4">
            <button onClick={handleDeposit} className="w-1/2 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600">
              เติมเงิน
            </button>
            <button onClick={handleExchange} className="w-1/2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
              แลกแคช
            </button>
          </div>
        </div>
      )}
      {step === "selectBank" && (
        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md text-center">
          <h2 className="text-xl font-bold mb-4">เลือกธนาคาร</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {Object.keys(bankRates).map((bank) => (
              <button key={bank} onClick={() => handleBankSelect(bank)} className="bg-gray-300 p-2 rounded-lg">
                <img src={bankRates[bank].imageUrl} alt={bank} className="w-6 h-6 mr-2 inline-block" />
                {bank}
              </button>
            ))}
          </div>
          <button onClick={() => setStep("home")} className="mt-4 bg-red-500 text-white p-2 rounded-lg">
            ย้อนกลับ
          </button>
        </div>
      )}
      {step === "enterCredit" && (
        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md text-center">
          <h2 className="text-xl font-bold mb-4">ใส่จำนวนเครติด: {enteredCredit}</h2>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {[...Array(10).keys()].map((num) => (
              <button key={num} onClick={() => handleCreditInput(num)} className="bg-gray-300 p-2 rounded-lg">
                {num}
              </button>
            ))}
          </div>
          <div className="flex gap-4">
            <button onClick={confirmDeposit} className="bg-green-500 text-white p-2 rounded-lg">
              ยืนยัน
            </button>
            <button onClick={() => setStep("home")} className="bg-red-500 text-white p-2 rounded-lg">
              ยกเลิก
            </button>
          </div>
        </div>
      )}
      {step === "selectGame" && (
        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md text-center">
          <h2 className="text-xl font-bold mb-4">เลือกเกมเพื่อแลกแคช</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {Object.keys(gameRates).map((game) => (
              <button key={game} onClick={() => handleGameSelect(game)} className="bg-gray-300 p-2 rounded-lg">
                <img src={gameRates[game].imageUrl} alt={game} className="w-auto h-auto mr-2 inline-block" />
                {game} (+{gameRates[game].rate})
              </button>
            ))}
          </div>
          <button onClick={() => setStep("home")} className="mt-4 bg-red-500 text-white p-2 rounded-lg">
            ย้อนกลับ
          </button>
        </div>
      )}
      {step === "selectAmount" && (
        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md text-center">
          <h2 className="text-xl font-bold mb-4">เลือกจำนวนเครติด</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[20, 35, 50, 90].map((amount) => (
              <button
                key={amount}
                onClick={() => handleAmountSelect(amount)}
                className="bg-gray-300 p-2 rounded-lg"
              >
                {amount} เครติด
              </button>
            ))}
          </div>
          <button onClick={() => setStep("home")} className="mt-4 bg-red-500 text-white p-2 rounded-lg">
            ย้อนกลับ
          </button>
        </div>
      )}
      {step === "showCash" && (
        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md text-center">
          <h2 className="text-xl font-bold mb-4">แลกแคชสำเร็จ!</h2>
          <p className="text-lg">แคชที่ได้รับสุทธิ: {cashReceived}</p>
          <button onClick={() => setStep("home")} className="mt-4 bg-green-500 text-white p-2 rounded-lg">
            กลับหน้าหลัก
          </button>
        </div>
      )}
    </div>
  );
}
