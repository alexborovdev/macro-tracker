import type { Metadata } from "next";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = { title: "Foods" };

export default function FoodsPage() {
  return (
    <Card>
      <h1 className="text-2xl font-semibold tracking-tight">Foods</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Saved foods and their nutrition per 100 g will appear here.
      </p>
    </Card>
  );
}
