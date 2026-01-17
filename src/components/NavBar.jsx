import { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function NavBar() {
  const [active, setActive] = useState('hero');
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.theme || 'light';

  useEffect(() => {
    const onScroll = () => {
      const offsets = sections.map(s => {
        const el = document.getElementById(s.id);
        return el ? el.getBoundingClientRect().top : Infinity;
      });
      const idx = offsets.findIndex(v => v > 60);
      const activeIndex = idx === -1 ? sections.length - 1 : Math.max(0, idx - 1);
      setActive(sections[activeIndex].id);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isLight = theme === 'light';
  const navBg = isLight ? 'rgba(255,255,255,0.95)' : 'rgba(15, 15, 15, 0.95)';
  const navBorder = isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.15)';
  const navShadow = isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0.8)';
  const activeColor = isLight ? '#1a1a1a' : '#ffffff';
  const inactiveColor = isLight ? '#888888' : '#666666';
  const activeBg = isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)';

  return (
    <motion.nav
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        width: 90,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10,
        background: navBg,
        borderRight: `2px solid ${navBorder}`,
        boxShadow: `2px 0 12px 0 ${navShadow}`,
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ height: 48 }} />
      {sections.map((s, idx) => (
        <motion.a
          key={s.id}
          href={`#${s.id}`}
          onClick={(e) => handleClick(e, s.id)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 + idx * 0.05 }}
          whileHover={{ scale: 1.1, x: 5 }}
          style={{
            color: active === s.id ? activeColor : inactiveColor,
            fontWeight: active === s.id ? 600 : 400,
            fontSize: active === s.id ? 20 : 17,
            margin: '0.65em 0',
            padding: '6px 10px',
            borderRadius: 8,
            textDecoration: 'none',
            background: active === s.id ? activeBg : 'none',
            transition: 'all 0.23s',
            position: 'relative',
          }}
        >
          {active === s.id && (
            <motion.div
              layoutId="activeIndicator"
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 4,
                height: '80%',
                background: activeColor,
                borderRadius: '0 4px 4px 0',
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          {s.label}
        </motion.a>
      ))}
    </motion.nav>
  );
}
