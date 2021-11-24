import {Outlet} from 'react-router-dom'
import ContextProvider from './context/index'
import AppProvider from './context/AppProvider';

function App() {
  return (
    <ContextProvider>
      <AppProvider>
        <Outlet/>
      </AppProvider>
    </ContextProvider>
  );
}


export default App;
