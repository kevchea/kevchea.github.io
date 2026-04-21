import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import desktop_background from "./assets/home.mp4";
import mobile_background from "./assets/home_mobile.mp4";
import Index from './Index'
import ResumePage from './ResumePage'
import PageTransition from './PageTransition'
import Blogs from './Blogs'
import AboutMe from './AboutMe'
import Projects from './Projects'
import './App.css'

function getBackground() {
  return (window.innerWidth <= 768 || window.innerHeight > window.innerWidth)
    ? mobile_background
    : desktop_background
}

function MenuScreen() {
  const navigate = useNavigate()
  const [background, setBg] = useState(getBackground())

  useEffect(() => {
    const onResize = () => setBg(getBackground())
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return (
    <div id="menu-screen">
      <video key={background} src={background} autoPlay loop muted playsInline />
      <Index isMobile={background === mobile_background} onNavigate={(page) => navigate(`/${page}`)} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition><MenuScreen /></PageTransition>} />
        <Route path="/about" element={
          <PageTransition variant="about"><AboutMe /></PageTransition>} />
        <Route path="/resume" element={
          <PageTransition><ResumePage src={getBackground()} /></PageTransition>} />
        <Route path="/blogs" element={
          <PageTransition variant="blogs"><Blogs /></PageTransition>} />
          <Route path="/projects" element={
          <PageTransition variant="projects"><Projects /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return <AnimatedRoutes />
}