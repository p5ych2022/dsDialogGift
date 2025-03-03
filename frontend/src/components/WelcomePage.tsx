import React , { useState }from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';
import './WelcomePage.css';
import ImageScroll from './ImageScroll';
import ChatDialog from './ChatDialog';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const WelcomePage: React.FC = () => {
  // 定义状态，用于切换欢迎页面和聊天对话框
  const [chatOpen, setChatOpen] = useState(false);

  
  return (
    <div className="welcome-container">
      { !chatOpen ? (
        // 欢迎页面内容
        <>
          
        {/* 欢迎大标题 */}
        <motion.h1
          className="gift-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          This is a gift
        </motion.h1>

        {/* “Open it” 文字 */}
        <motion.div
          className="open-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.3 }}
        >
          Open it
          </motion.div>

      {/* 按钮 */}
      <motion.button
          className="open-button"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2, duration: 0.2 }}
          onClick={() => setChatOpen(true)}
        >
          Open
        </motion.button>

      {/* 按钮下方图片滚动区域 */}
      <div className="image-scroll-container">
          <ImageScroll />
        </div>
        </>
      ) : (
        // 聊天对话框内容
         // 传入 onReturn 回调，点击返回按钮后将 chatOpen 设置为 false
         <ChatDialog onReturn={() => setChatOpen(false)} />
      )}
    </div>
  );
};

export default WelcomePage;
