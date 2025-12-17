/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { User } from "@/types/user";

type Props = {
  open: boolean;
  initial?: User | null;
  onClose: () => void;
  onSubmit: (data: any) => void;
};

export default function UserFormDialog({
  open,
  initial,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "customer",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name,
        email: initial.email,
        role: initial.role,
        password: "",
      });
    } else {
      setForm({
        name: "",
        email: "",
        role: "customer",
        password: "",
      });
    }
    setErrors({});
  }, [initial, open]);

  const validate = () => {
    const e: Record<string, string> = {};

    if (!form.name.trim()) {
      e.name = "Name is required";
    }

    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Invalid email format";
    }

    if (!form.role) {
      e.role = "Role is required";
    }

    if (!initial) {
      if (!form.password) {
        e.password = "Password is required";
      } else if (form.password.length < 6) {
        e.password = "Password must be at least 6 characters";
      }
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

 
  const handleSubmit = () => {
    if (!validate()) return;

    const payload = {
      name: form.name,
      email: form.email,
      role: form.role,
      ...(form.password ? { password: form.password } : {}),
    };

    onSubmit(payload);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{initial ? "Edit User" : "Create User"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="mb-2">Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <Label className="mb-2">Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Label className="mb-2">Role</Label>
            <Select
              value={form.role}
              onValueChange={(v) => setForm({ ...form, role: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-red-500 mt-1">{errors.role}</p>
            )}
          </div>

          <div>
            <Label className="mb-2">Password</Label>
            <Input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <Button className="w-full" onClick={handleSubmit}>
            Save User
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
