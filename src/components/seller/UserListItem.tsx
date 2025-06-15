import type { Prisma } from '@prisma/client';
import { EditRoleAction } from './EditRoleAction';

export function UserListItem({
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

export function UserListItemSkeleton() {
  return Array.from({ length: 10 }).map((_, idx) => (
    <tr key={idx} className='animate-pulse border-t border-gray-500/20'>
      <td className='px-4 py-3 max-sm:hidden'>
        <div className='h-4 w-24 rounded bg-gray-300' />
      </td>
      <td className='px-4 py-3 max-sm:hidden'>
        <div className='h-4 w-32 rounded bg-gray-300' />
      </td>
      <td className='px-4 py-3 max-sm:hidden'>
        <div className='h-4 w-20 rounded bg-gray-300' />
      </td>
    </tr>
  ));
}
