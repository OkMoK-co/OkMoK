import styled from 'styled-components';
import Link from 'next/link';

interface ShinningButtonProps {
  value: any;
}

export default function ShiningButton({ value }: ShinningButtonProps) {
  return (
    <ShinningEffect>
      <Link href='/login'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {value}
      </Link>
    </ShinningEffect>
  );
}

const ShinningEffect = styled.div`
  a {
    color: #fefefe;
    text-decoration: none;
    text-transform: uppercase;
    text-shadow: 0 0 0.5rem #fefefe;
    transition: 0.5s;
    overflow: hidden;
    position: relative;
    display: inline-block;
    padding: 30px 50px;
    margin: 90px 50;
  }

  a:hover {
    background: #fefefe;
    color: #050801;
    box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
      0 0 200px #03e9f4;
    -webkit-box-reflect: below 1px linear-gradient(transition, #0005);
  }

  a:nth-child(2) {
    filter: hue-rotate(270deg);
  }

  a span {
    position: absolute;
    display: block;
  }

  a span:nth-child(1) {
    top: 0;
    background: linear-gradient(90deg, transparent, #ff0000);
    animation: top-animate 2s linear infinite;
    left: 0;
    width: 100%;
    height: 2px;
  }

  a span:nth-child(2) {
    top: -100%;
    background: linear-gradient(180deg, transparent, #00ff00);
    animation: right-animate 1.5s linear infinite;
    right: 0;
    width: 2px;
    height: 100%;
    animation-delay: 0.25s;
  }

  a span:nth-child(3) {
    bottom: 0;
    right: 0;
    background: linear-gradient(270deg, transparent, #0000ff);
    animation: bottom-animate 2s linear infinite;
    width: 100%;
    height: 2px;
  }

  a span:nth-child(4) {
    bottom: -100%;
    left: 0;
    background: linear-gradient(360deg, transparent, #ffff00);
    animation: left-animate 1.5s linear infinite;
    width: 2px;
    height: 100%;
    animation-delay: 0.75s;
  }

  @keyframes top-animate {
    0% {
      left: -100%;
    }
    50%,
    100% {
      left: 100%;
    }
  }

  @keyframes right-animate {
    0% {
      top: -100%;
    }
    50%,
    100% {
      top: 100%;
    }
  }

  @keyframes bottom-animate {
    0% {
      right: -100%;
    }
    50%,
    100% {
      right: 100%;
    }
  }

  @keyframes left-animate {
    0% {
      bottom: -100%;
    }
    50%,
    100% {
      bottom: 100%;
    }
  }
`;
