import React from 'react';
import { motion } from 'framer-motion';
import './ImageScroll.css';

// 使用 import 导入静态图片
import img0 from '../assets/0.jpg';
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.jpg';
import img6 from '../assets/6.jpg';
import img7 from '../assets/7.jpg';
import img8 from '../assets/8.jpg';
import img9 from '../assets/9.jpg';
import img10 from '../assets/10.jpg';
import img11 from '../assets/11.jpg';
import img12 from '../assets/12.jpg';
import img13 from '../assets/13.jpg';
import img14 from '../assets/14.jpg';

const images = [img0, img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14];

const ImageScroll: React.FC = () => {
// 定义滚动动画：整个容器从 x="0%" 平滑移动到 x="-50%"，重复循环（重复图片后50%正好循环）
const scrollAnimation = {
    animate: {
      x: ['0%', '-50%'],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear"
        }
      }
    }
  };

  return (
    <div className="scroll-wrapper">
      <motion.div 
        className="scroll-container"
        variants={scrollAnimation}
        animate="animate"
      >
        {/* 为实现无限滚动效果，将数组复制一次 */}
        {[...images, ...images].map((imgSrc, index) => (
          <motion.div
            key={index}
            className="image-wrapper"
            initial={{ scale: 1 }}
            // 当图片进入视口时放大至 1.35 倍，离开时恢复
            whileInView={{ scale: 1.35 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, amount: 0.5 }}
          >
            <img src={imgSrc} alt={`Gift ${index + 1}`} className="scroll-image" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ImageScroll;
