import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset};
    a {
        text-decoration: none;
        color: inherit;
    }
    * {
        box-sizing: border-box;
        font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
        -webkit-tap-highlight-color:rgba(255,255,255,0);
    }
    button {
        background: none;
        border: none;
        :focus {
            outline: none;
        }
    }
    input {
        :focus {
            outline: none;
        }
    }
`;

export default GlobalStyles;
