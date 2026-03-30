'use client';

import { useState } from 'react';

import { calculateSavingsPlan } from '@ghumle/contracts';
import { Button, Card, ProgressBar } from '@ghumle/ui';

import { formatCurrency } from '../lib/format';

export function SavingsPlannerWidget() {
  const [goalAmount, setGoalAmount] = useState(145000);
  const [savedAmount, setSavedAmount] = useState(42000);
  const [targetDate, setTargetDate] = useState('2027-03-01');
  const [result, setResult] = useState(
    calculateSavingsPlan({
      goalAmount: 145000,
      savedAmount: 42000,
      targetDate: '2027-03-01T00:00:00.000Z',
    }),
  );

  const run = () => {
    setResult(
      calculateSavingsPlan({
        goalAmount,
        savedAmount,
        targetDate: new Date(targetDate).toISOString(),
      }),
    );
  };

  return (
    <Card className="bg-white">
      <div className="grid gap-4 md:grid-cols-3">
        <label className="space-y-2 text-sm text-slate-600">
          <span>Trip goal amount</span>
          <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" type="number" value={goalAmount} onChange={(event) => setGoalAmount(Number(event.target.value))} />
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          <span>Saved amount</span>
          <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" type="number" value={savedAmount} onChange={(event) => setSavedAmount(Number(event.target.value))} />
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          <span>Target travel date</span>
          <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" type="date" value={targetDate} onChange={(event) => setTargetDate(event.target.value)} />
        </label>
      </div>
      <div className="mt-5 flex justify-end">
        <Button onClick={run}>Recalculate</Button>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.5rem] bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Monthly savings needed</p>
          <p className="mt-2 font-[family-name:var(--font-sora)] text-2xl font-semibold text-slate-950">
            {formatCurrency(result.monthlySavingsNeeded)}
          </p>
        </div>
        <div className="rounded-[1.5rem] bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Remaining months</p>
          <p className="mt-2 font-[family-name:var(--font-sora)] text-2xl font-semibold text-slate-950">
            {result.remainingMonths}
          </p>
        </div>
        <div className="rounded-[1.5rem] bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Progress</p>
          <p className="mt-2 font-[family-name:var(--font-sora)] text-2xl font-semibold text-slate-950">
            {result.progressPercent}%
          </p>
        </div>
      </div>
      <div className="mt-6">
        <ProgressBar value={result.progressPercent} />
      </div>
      <div className="mt-6 space-y-3 text-sm text-slate-600">
        {result.recommendations.map((item) => (
          <div key={item} className="rounded-2xl bg-[var(--ghumle-color-mist)]/50 px-4 py-3">
            {item}
          </div>
        ))}
      </div>
    </Card>
  );
}
