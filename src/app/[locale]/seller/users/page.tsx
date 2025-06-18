import { Suspense } from 'react';
import { TableSkeleton } from '~/components/seller/TableSkeleton';
import { UserTableRow } from '~/components/seller/UserTableRow';
import { db } from '~/server/db';

export default function UsersPage() {
  return (
    <>
      <table className='w-full table-fixed overflow-hidden'>
        <thead className='text-left text-sm text-gray-900'>
          <tr>
            <th className='w-2/3 truncate px-4 py-3 font-medium md:w-2/5'>
              Name
            </th>
            <th className='w-2/3 truncate px-4 py-3 font-medium md:w-2/5'>
              Email
            </th>
            <th className='w-2/3 truncate px-4 py-3 font-medium md:w-2/5'>
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          <Suspense fallback={<TableSkeleton />}>
            <SuspendedUsers />
          </Suspense>
        </tbody>
      </table>
    </>
  );
}

async function SuspendedUsers() {
  const users = await getUsers();
  return users.map((user) => <UserTableRow key={user.id} user={user} />);
}

function getUsers() {
  return db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      image: true,
      role: true,
    },
  });
}
