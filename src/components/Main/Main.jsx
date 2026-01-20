import React, { useContext, useEffect, useRef } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const cardData = [
  { text: "Suggest some beautiful places...", icon: assets.compass_icon, alt: "Compass Icon" },
  { text: "Brief this concept...", icon: assets.bulb_icon, alt: "Bulb Icon" },
  { text: "Brainstorm team bonding ideas...", icon: assets.message_icon, alt: "Message Icon" },
  { text: "Improve readability of code...", icon: assets.code_icon, alt: "Code Icon" },
];

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const bottomRef = useRef(null);

  const handleSend = () => {
    if (input.trim() !== '') {
      onSent(input);
      setInput(""); // clear input after send
    }
  };

  const handleCardClick = (cardText) => {
    onSent(cardText);
    setInput("");
  };

  // ✅ Auto scroll to bottom when result updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [resultData, loading]);

  return (
    <div className='main'>
      {/* Top Navbar */}
      <div className="nav">
        <p>Gemini Demo</p>
        <img className='nav-avatar' src={assets.man_icon} alt="User Icon" />
      </div>

      {/* Main Content */}
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="geet">
              <p><span>Hello, Sir.</span></p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              {cardData.map((card, index) => (
                <div
                  className="card"
                  key={index}
                  onClick={() => handleCardClick(card.text)}
                >
                  <p>{card.text}</p>
                  <img src={card.icon} alt={card.alt} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className='result'>
            <div className="result-title">
              <img src={assets.code_icon} alt="Prompt Icon" />
              <p>{recentPrompt}</p>
            </div>

            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <div className='loader'>
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        {/* ✅ Scroll target */}
        <div ref={bottomRef}></div>

        {/* Input Section */}
        <div className="main-bottom">
          <div className="search-box">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              type="text"
              placeholder='Enter your question here'
            />
            <div>
              <img src={assets.gallery_icon} alt="Gallery Icon" />
              <img src={assets.mic_icon} alt="Mic Icon" />
              <img onClick={handleSend} src={assets.send_icon} alt="Send Icon" />
            </div>
          </div>

          {loading && <p className="loading">Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default Main;
