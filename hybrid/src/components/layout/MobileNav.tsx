import { useState } from 'react';
import NavBar from './NavBar';

export default function MobileNav() {
  const [openNav, setOpenNav] = useState(false);
  const [openMore, setOpenMore] = useState(false);

  return (
    <div>
      <div onClick={() => (setOpenNav(!openNav), setOpenMore(false))}>🍔</div>
      {openNav && <NavBar openMore={openMore} setOpenMore={setOpenMore} />}
    </div>
  );
}
