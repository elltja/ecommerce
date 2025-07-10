import type { Prisma } from '@prisma/client';
import { EditRoleAction } from './EditRoleAction';

export function UserTableRow({
  user,
}: {
  user: Prisma.UserGetPayload<{
    select: {
      id: true;
      name: true;
      email: true;
      emailVerified: true;
      image: true;
      role: true;
    };
  }>;
}) {
  return (
    <tr className='border-t border-gray-500/20'>
      <td className='px-4 py-3 max-sm:hidden'>{user?.name ?? 'Unknown'}</td>
      <td className='px-4 py-3 max-sm:hidden'>{user.email}</td>
      <td className='px-4 py-3 max-sm:hidden'>
        <EditRoleAction initialRole={user.role} userId={user.id} />
      </td>
    </tr>
  );
}
