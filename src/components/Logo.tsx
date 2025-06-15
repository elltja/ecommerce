import clsx from 'clsx';
import Image from 'next/image';
import { Link } from '~/i18n/navigation';

export function Logo({
  className,
  src = '/logo.svg',
  width = 100,
  height = 40,
}: {
  className?: string;
  src?: string;
  width?: number;
  height?: number;
}) {
  return (
    <Link href='/' className={clsx('', className)}>
      <Image
        src={src}
        alt='Logo'
        width={width}
        height={height}
        className='h-[40px] min-w-[50px] object-contain'
      />
    </Link>
  );
}
