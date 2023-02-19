'use client';

import Link from 'next/link';

interface NavBarProps {
  openMore: boolean;
  setOpenMore: (openMore: boolean) => void;
}

export default function NavBar({ openMore, setOpenMore }: NavBarProps) {
  const menu = [
    {
      label: 'Home/',
      path: '/',
      clickHandler: () => setOpenMore(false),
    },
    {
      label: 'Ranking/',
      path: '/rank',
      clickHandler: () => setOpenMore(false),
    },
    {
      label: 'Record/',
      path: '/record',
      clickHandler: () => setOpenMore(false),
    },
    {
      label: 'More/...',
      path: {},
      clickHandler: (e: React.MouseEvent<HTMLElement>) => (
        e.preventDefault(), setOpenMore(!openMore)
      ),
    },
  ];

  const menuMore = ['setting', 'menual', 'report', 'logout'];

  return (
    <nav>
      {menu.map(({ label, path, clickHandler }, index) => (
        <Link href={path} key={index} onClick={(e) => clickHandler(e)}>
          {label}
        </Link>
      ))}
      {openMore &&
        menuMore.map((label, index) => <div key={index}>{label}</div>)}
    </nav>
  );
}
