import { Button } from "@repo/ui/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@repo/ui/components/ui/card";
import {Progress} from "@repo/ui/components/ui/progress";

export default function Page() {
  return (
    <main className="p-8">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Docs</CardTitle>
          <CardDescription>Built with Turborepo and shadcn/ui</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={33} className="w-full" />

          <Button>Click me</Button>
        </CardContent>
      </Card>
    </main>
  );
}
