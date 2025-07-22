import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Progress } from "@repo/ui/components/ui/progress";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <Card className="max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-purple-700">
            👋 Welcome, Explorer!
          </CardTitle>
          <CardDescription>
            Your journey starts here. Built with Turborepo and shadcn/ui.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-lg font-medium text-gray-700">
            Ready to build something amazing today?
          </div>
          <Progress value={33} className="w-full" />
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/routine/morning">Go to Routine 🚀</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
