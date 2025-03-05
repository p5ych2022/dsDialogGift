import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './ChatDialog.css';

// 定义消息数据类型
interface Message {
  sender: 'user' | 'bot';
  content: string;
}

interface ChatDialogProps {
    onReturn: () => void;
  }

const ChatDialog: React.FC<ChatDialogProps> = ({ onReturn }) => {
  // 状态：消息列表
  const [messages, setMessages] = useState<Message[]>([]);
  // 状态：输入框文本
  const [input, setInput] = useState<string>('');
  // 用于自动滚动到最新消息的引用
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 当消息列表更新时，自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 处理消息提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 如果输入为空，则不处理
    if (!input.trim()) return;
    // 添加用户消息
    const newMessage: Message = { sender: 'user', content: input.trim() };
    setMessages(prev => [...prev, newMessage]);
    // 清空输入框
    setInput('');

    // 模拟后端响应，延时 1 秒返回
    // setTimeout(() => {
    //   const botMessage: Message = { sender: 'bot', content: `收到: ${newMessage.content}` };
    //   setMessages(prev => [...prev, botMessage]);
    // }, 1000);

    // 调用后端 API 进行处理
    try {
      const response = await fetch('http://localhost:56001/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newMessage.content }),
      });
      const data = await response.json();
      const botMessage: Message = { sender: 'bot', content: data.content };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className="chat-dialog-container">
        {/* 顶部返回按钮区域 */}
      <div className="chat-header">
        <button className="return-button" onClick={onReturn}>
          返回
        </button>
      </div>

      {/* 消息显示区域 */}
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <motion.div 
            key={index}
            className={`chat-message ${msg.sender}`}
            // 使用淡入动画显示消息
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {msg.content}
          </motion.div>
        ))}

        {/* 占位 div，用于自动滚动到底部 */}
        <div ref={messagesEndRef} />
      </div>

      {/* 消息输入区域 */}
      <form className="chat-input-area" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="输入消息..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          // 支持按 Enter 键提交（阻止 Shift+Enter 换行）
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              handleSubmit(e);
            }
          }}
        />
        <button type="submit" className="send-button">发送</button>
      </form>
    </div>
  );
};

export default ChatDialog;
