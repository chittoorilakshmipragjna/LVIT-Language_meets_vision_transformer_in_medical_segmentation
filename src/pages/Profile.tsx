import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { toast } from "sonner";

export default function Profile() {
  const handleSave = () => {
    toast.success("Profile updated successfully");
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your account information and preferences
          </p>
        </div>

        <Card className="p-6 border-primary/10 bg-card/50 backdrop-blur">
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24 border-2 border-primary/20">
                <AvatarFallback className="bg-primary/10">
                  <User className="h-12 w-12 text-primary" />
                </AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" className="border-primary/20">
                  Change Photo
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  defaultValue="John"
                  className="border-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  defaultValue="Doe"
                  className="border-primary/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue="doctor@hospital.com"
                className="border-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty</Label>
              <Input
                id="specialty"
                defaultValue="Radiology"
                className="border-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hospital">Hospital/Institution</Label>
              <Input
                id="hospital"
                defaultValue="General Hospital"
                className="border-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="license">Medical License Number</Label>
              <Input
                id="license"
                defaultValue="MD-123456"
                className="border-primary/20"
              />
            </div>

            <div className="pt-4">
              <Button onClick={handleSave} className="shadow-glow">
                Save Changes
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
