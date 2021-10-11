import styled, { createGlobalStyle } from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { colors, fontFaces, typography, fontFamily } from '@podiumhq/podium-ui';

export const Nav = styled.nav`
  background: ${colors.black};
  color: ${colors.white};
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 4px 24px;

  h1 {
    font-size: 24px;
    margin-left: 8px;
  }

  p {
  }
`;

export const StyledLink = styled(Link)`
  color: black;

  &:hover {
    color: black;
    text-decoration: none;
  }
`;

export const NavGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    margin: 8px 0 24px 0;
  }
`;

export const Card = styled.li`
  padding: 10px 15px;
  background-color: ${colors.whiteSmoke};
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.25);
  margin-bottom: 16px;
  transition: box-shadow 0.3s ease-in-out;
  list-style: none;
  max-width: 420px;

  &:hover {
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.25);
  }

  h2 {
    font-size: 14px;
    margin-bottom: 8px;
  }
`;

export const Stars = styled.div`
  margin-bottom: 8px;
`

export const FormDiv = styled.div`
  margin: 12px;
`

export const GlobalStyles = createGlobalStyle`
  ${fontFaces}
  ${typography}
  html, body, #root {
    height: 100vh;
    background-color: ${colors.whiteSmoke};
    position: relative;
  }

  * {
    margin: 0;
    box-sizing: border-box;
  }

  p,h1,h2,h3,ul {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    overflow-y: auto !important;
    overscroll-behavior: none;
  }

  html, body {
    font-family: ${fontFamily};
    color: ${colors.mineShaft};
    z-index: 0;
  }

  body {
    max-width: 100vw; /* ie is super weird and this might fix it */
    overflow: auto !important; /* Something is setting overflow on the body element itself */
  }

  #lightbox-root {
    position: fixed;
    z-index: 1002;
    left: 0;
  }

  .dragged-over > div[role="button"]{
    background-color: ${colors.cobaltBlue};
  }

  ::-moz-selection {
    color: inherit;
  }

  ::selection {
    color: inherit;
  }

  ul {
    list-style: none;
  }

  a {
    cursor: pointer;
    color: ${colors.cobaltBlue};
  }

  ::-ms-clear {
    display: none;
  }

  @media print {
    #nav,
    #conversation-list,
    #side-nav,
    #chat-composer,
    #conversation-composer,
    #enable-notis-banner,
    #install-webchat-banner
    { display: none !important; }

    #conversation-page * {
      height: auto !important
    }

    body {
      overflow: visible !important;
    }
    
    html, body, #root, #app-container {
      background-color: White;
    }

    .ReactVirtualized__Grid {
      width: 750px !important;
    }
   }
`;
