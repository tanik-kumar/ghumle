import { SectionHeading } from '@ghumle/ui';

import { PlannerStudio } from '../../components/planner-studio';

export default function PlannerPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Planner"
        title="Generate a day-wise itinerary and refine the pace"
        description="The Phase 1 planner is designed as an interactive studio, not a static template list. It supports multiple pacing modes, editable structure, and later backend persistence."
      />
      <div className="mt-8">
        <PlannerStudio />
      </div>
    </div>
  );
}
