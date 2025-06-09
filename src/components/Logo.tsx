import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

export function Logo({
  className,
  src = '/logo.svg',
}: {
  className?: string;
  src?: string;
}) {
  return (
    <Link href='/' className={clsx('relative w-25', className)}>
      <Image fill src={src} alt='Logo' />
    </Link>
  );
}
