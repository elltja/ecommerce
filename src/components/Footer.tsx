import { ArrowRightIcon, Mail } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '@headlessui/react';
import type { ReactNode } from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className='bg-bg'>
      <div className='flex flex-col gap-5 p-10 sm:flex-row sm:justify-between'>
        <Logo />
        <div className='flex gap-2'>
          <Mail />
          <p className='font-semibold'>Email us</p>
          <p className='underline'>mail@example.com</p>
        </div>
      </div>
      <hr className='h-[1px] w-full border-none bg-gray-300' />
      <div className='flex flex-wrap p-10'>
        <SignUpAction />
        <NavList />
        <SocialMediaLinks />
      </div>
    </footer>
  );
}

function SignUpAction() {
  return (
    <div className='flex w-full flex-col gap-2 sm:w-96'>
      <h2 className='text-xl font-semibold'>Lorem ipsum dolor sit amet.</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga
        consequatur dicta, laboriosam est voluptatum sapiente?
      </p>
      <Button className='bg-primary hover:bg-primary-hover my-5 flex w-fit cursor-pointer items-center gap-2 rounded-full px-10 py-3 font-semibold text-white transition-colors duration-300 lg:px-25'>
        Sign Up
        <ArrowRightIcon className='size-5' />
      </Button>
    </div>
  );
}

function NavList() {
  return (
    <nav className='flex flex-wrap gap-10'>
      <ul className='mx-5'>
        <NavItem href=''>Home</NavItem>
        <NavItem href=''>About us</NavItem>
        <NavItem href=''>Contact</NavItem>
        <NavItem href=''>Blog</NavItem>
        <NavItem href=''>Careers</NavItem>
      </ul>
      <ul className='mx-5'>
        <NavItem href=''>Shipping & Returns</NavItem>
        <NavItem href=''>Support</NavItem>
        <NavItem href=''>FAQ</NavItem>
        <NavItem href=''>Order Tracking</NavItem>
      </ul>
      <ul className='mx-5'>
        <NavItem href=''>Privacy Policy</NavItem>
        <NavItem href=''>Terms of Service</NavItem>
        <NavItem href=''>Accessibility</NavItem>
        <NavItem href=''>Sitemap</NavItem>
      </ul>
    </nav>
  );
}

function NavItem({ children, href }: { children: ReactNode; href: string }) {
  return (
    <li>
      <Link href={href}>{children}</Link>
    </li>
  );
}

function SocialMediaLinks() {
  return (
    <div className='flex gap-5'>
      <a
        href='https://instagram.com/'
        target='_blank'
        rel='noopener noreferrer'
        aria-label='Instagram'
        className='inline-flex items-center'
      ></a>
    </div>
  );
}
