import type { Metadata } from "next";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = { title: "Goals" };

export default function GoalsPage() {
  return (
    <Card>
      <h1 className="text-2xl font-semibold tracking-tight">Goals</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Daily calorie and macronutrient targets will appear here.
      </p>
    </Card>
  );
}
