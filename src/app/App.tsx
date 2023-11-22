import './styles/index.scss';
import ContrastSymbol from 'shared/assets/contrast-symbol.svg';
import contrastSymbolPNG from 'shared/assets/spidy.png';

export const App = () => {
   return <>
      <ContrastSymbol/>
      <h1 className={'header'}>Hello world from App!</h1>
      <img src={contrastSymbolPNG}/>
   </>
}
