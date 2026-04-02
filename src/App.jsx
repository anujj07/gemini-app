import { ThemeProvider } from './Context/ThemeContext';
import { useTheme } from './Context/useTheme';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import './styles/theme.css';

const AppContent = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Sidebar />
      <Main />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
