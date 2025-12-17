import type { User } from "@/types/user"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"

type Props = {
  users: User[]
  onEdit: (u: User) => void
  onDelete: (id: number) => void
}

export default function UserTable({ users, onEdit, onDelete }: Props) {
  return (
    <div className="border rounded-lg overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th>Email</th>
            <th>Role</th>
            <th className="w-32">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-2">{u.name}</td>
              <td>{u.email}</td>
              <td className="capitalize">{u.role}</td>
              <td className="flex gap-2 p-2 justify-center">
                <Button size="icon" variant="outline" onClick={() => onEdit(u)}>
                  <Pencil size={16} />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => onDelete(u.id)}
                >
                  <Trash size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
