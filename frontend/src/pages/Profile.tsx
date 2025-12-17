import { useEffect, useState } from "react";
import { getMe, updateProfile } from "@/api/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
// import { toast } from "sonner"

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);


  useEffect(() => {
    getMe()
      .then((res) => {
        const u = res.data.data;
        setUser(u);
        setForm({
          name: u.name,
          email: u.email,
          password: "",
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile({
        name: form.name,
        email: form.email,
        password: form.password || undefined,
      });

      setUser((prev) =>
        prev ? { ...prev, name: form.name, email: form.email } : prev
      );

      setEditing(false);
      setForm((f) => ({ ...f, password: "" }));
      alert("Profile updated");
    } catch {
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-1">
            <Label>Name</Label>
            {editing ? (
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            ) : (
              <p className="text-sm">{user.name}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label>Email</Label>
            {editing ? (
              <Input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            ) : (
              <p className="text-sm">{user.email}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label>Role</Label>
            <p className="text-sm capitalize">{user.role}</p>
          </div>

          {editing && (
            <>
              <Separator />
              <div className="space-y-1">
                <Label>New Password</Label>
                <Input
                  type="password"
                  placeholder="Leave empty to keep password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>
            </>
          )}

          <Separator />

          <div className="flex justify-end gap-3">
            {editing ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditing(false);
                    setForm({
                      name: user.name,
                      email: user.email,
                      password: "",
                    });
                  }}>
                  Cancel
                </Button>

                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save"}
                </Button>
              </>
            ) : (
              <Button onClick={() => setEditing(true)}>Edit Profile</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
