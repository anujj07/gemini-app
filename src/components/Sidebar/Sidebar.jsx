import { useContext, useState } from 'react';
import "./Sidebar.css";
import { assets } from '../../assets/assets'; 
import { Context } from '../../Context/context';
import { useTheme } from '../../Context/useTheme';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, resetChat } = useContext(Context);
  const { isDarkMode, toggleTheme } = useTheme();

  const handleRecentClick = (prompt) => {
    onSent(prompt, { savePrompt: false });
  };

  return (
    <div className='sidebar'>
      <div className="top">
        <img
          onClick={() => setExtended(prev => !prev)}
          className='menu'
          src={assets.menu_icon}
          alt="Menu Icon"
        />

        <div className="new-chat" onClick={resetChat}>
          <img src={assets.plus_icon} alt="New Chat" />
          {extended ? <p>New Chat</p> : null}
        </div>

        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div
                className="recent-entry"
                key={index}
                onClick={() => handleRecentClick(item)}
              >
                <img src={assets.message_icon} alt="Message Icon" />
                <p>{item.slice(0, 18)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Help Icon" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="History Icon" />
          {extended ? <p>History</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Settings Icon" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>

      <button
        onClick={toggleTheme}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
          background: 'var(--bg-secondary)',
          color: 'var(--text-primary)'
        }}
      >
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
};

export default Sidebar;
