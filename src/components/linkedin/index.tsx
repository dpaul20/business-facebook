import { Linkedin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import LinkedInFeed from "./LinkedInFeed";

export default function LinkedInSideBar() {
  return (
    <div className="w-full lg:w-1/4">
      <Card className="sticky top-4">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Linkedin className="mr-2 h-5 w-5" />
            Publicaciones de LinkedIn
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LinkedInFeed />
        </CardContent>
      </Card>
    </div>
  );
}
