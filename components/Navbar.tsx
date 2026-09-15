"use client";

import { Command, Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeEclipseToggle from "./ThemeEclipseToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ["work", "experience", "creative", "contact"];

  return <header className="nav">
    <a className="logo" href="#top">AK<span>.</span></a>
    <nav>{links.map((link) => <a key={link} href={`#${link}`}>{link}</a>)}</nav>
    <button className="command" onClick={() => setOpen(!open)} aria-label="Open navigation"><Command size={16} /><span>⌘ K</span></button>
    <button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
    <ThemeEclipseToggle />
    {open && <div className="drawer">{links.map((link) => <a key={link} onClick={() => setOpen(false)} href={`#${link}`}>{link}<span>↗</span></a>)}</div>}
  </header>;
}
