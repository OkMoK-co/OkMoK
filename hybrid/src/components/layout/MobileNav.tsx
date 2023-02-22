import { useState } from 'react';
import { TfiMenu } from 'react-icons/tfi';
import NavBar from './NavBar';

export default function MobileNav() {
  const [openNav, setOpenNav] = useState(false);
  const [openMore, setOpenMore] = useState(false);

  return (
    <div>
      <div onClick={() => (setOpenNav(!openNav), setOpenMore(false))}>
        <TfiMenu />
      </div>
      {openNav && <NavBar openMore={openMore} setOpenMore={setOpenMore} />}
    </div>
  );
}
