import { useState } from 'react';
import NavBar from './NavBar';

export default function DesktopNav() {
  const [openMore, setOpenMore] = useState(false);

  return <NavBar openMore={openMore} setOpenMore={setOpenMore} />;
}
