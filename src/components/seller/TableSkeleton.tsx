export function TableSkeleton() {
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
