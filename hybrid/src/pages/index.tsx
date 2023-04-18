import { Inter } from 'next/font/google';
import { socketVar } from '@/socket/variable';
import useEnterPage from '@/hooks/useEnterPage';
import Rooms from '@/components/main/Rooms';
import SearchBar from '@/components/main/SearchBar';
import PlayButton from '@/components/main/PlayButton';
import styled from 'styled-components';
import { ContentContainer } from '@/styles/common-style';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  useEnterPage({ id: socketVar.ROOM_MAIN_REQUEST });

  return (
    <Container>
      <MainTools>
        <SearchBar />
        <PlayButton />
      </MainTools>
      <Rooms />
    </Container>
  );
}

const Container = styled(ContentContainer)``;

const MainTools = styled.div`
  ${({ theme }) => theme.flexs.spaceBetween};
  height: 8rem;
  padding: 2rem 0;
  @media (${({ theme: { device } }) => device.mobile}) {
    height: 4rem;
    padding: 0.7rem 0;
  }
`;
