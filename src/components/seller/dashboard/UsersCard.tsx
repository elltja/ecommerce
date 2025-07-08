import { db } from '~/server/db';
import { DashboardCard } from './DashboardCard';
import type { UserRole } from '@prisma/client';
import { User } from 'lucide-react';

export async function UsersCard() {
  const [countsByRole, totalCount] = await Promise.all([
    db.user.groupBy({
      by: ['role'],
      _count: { role: true },
    }),
    db.user.count(),
  ]);

  const counts = Object.fromEntries(
    countsByRole.map(({ role, _count }) => [role, _count.role]),
  ) as Record<UserRole, number>;

  return (
    <DashboardCard
      title={` ${totalCount} users`}
      link={{ href: '/seller/users', text: 'View all users' }}
      Icon={User}
    >
      <div className='flex gap-5'>
        <p>
          <span className='font-semibold'>{counts.ADMIN}</span> Admin users
        </p>
        <p>
          <span className='font-semibold'>{counts.USER}</span> Normal users
        </p>
      </div>
    </DashboardCard>
  );
}
