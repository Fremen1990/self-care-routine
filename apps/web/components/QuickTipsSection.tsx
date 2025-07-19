import { RoutineTipCard } from "@repo/ui/components/ui/routine-tip-card";
import { Separator } from "@repo/ui/components/ui/separator";
import { RoutineService } from "@repo/services/routine-service";

export function QuickTipsSection() {
  return (
    <>
      <Separator className="my-8" />
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Quick Tips</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {RoutineService.ROUTINE_TIPS.map((tip) => (
            <RoutineTipCard key={tip.id} tip={tip} />
          ))}
        </div>
      </div>
    </>
  );
}
