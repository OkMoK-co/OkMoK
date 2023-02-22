import { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import NavBar from './NavBar';

export default function DesktopNav() {
  const [openMore, setOpenMore] = useState(false);

  return (
    <nav>
      <NavBar openMore={openMore} setOpenMore={setOpenMore} />
      <FaUserAlt />
    </nav>
  );
}
