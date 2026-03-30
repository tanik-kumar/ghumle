import { Card, SectionHeading } from '@ghumle/ui';

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Profile"
        title="Preferences, privacy, base currency, and travel identity"
        description="The profile model is designed to support future personalization, matching, multi-currency preferences, and audit-sensitive settings."
      />
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card className="bg-white">
          <p className="font-[family-name:var(--font-sora)] text-2xl font-semibold text-slate-950">Demo Traveler</p>
          <p className="mt-2 text-sm text-slate-500">traveler@ghumle.app</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {['beach', 'couple', 'family', 'budget-aware'].map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {tag}
              </span>
            ))}
          </div>
        </Card>
        <Card className="bg-white">
          <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-slate-950">Settings snapshot</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>Base currency</span>
              <strong>INR</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Timezone</span>
              <strong>Asia/Kolkata</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Partner visibility</span>
              <strong>Matchable</strong>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
