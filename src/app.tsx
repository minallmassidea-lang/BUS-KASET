const { useEffect, useRef, useState } = React;

const A = {
  hero: "/assets/hero.jpg", heroShade: "/assets/hero-shade.png", logo: "/assets/logo.png",
  storyA: "/assets/story-classroom.jpg", storyBg: "/assets/story-blue-bg.png", storyWoman: "/assets/story-woman.png", student: "/assets/student.png",
  deanBg: "/assets/dean-bg.jpg", dean: "/assets/dean.png",
  news: [
    "/assets/news-1.jpg", "/assets/news-2.jpg", "/assets/news-3.jpg"
  ],
  campus: [
    "/assets/campus-1.jpg", "/assets/campus-2.jpg", "/assets/campus-3.jpg"
  ],
  icons: [
    "/assets/quick-admissions.png", "/assets/quick-courses.png", "/assets/quick-knowledge.png",
    "/assets/quick-events-calendar.png", "/assets/quick-deans-direct-line.png", "/assets/quick-download.png",
    "/assets/quick-student-portal.png", "/assets/quick-personnel-portal.png", "/assets/quick-community.png",
    "/assets/quick-magazine.png"
  ],
  arrow: "/assets/arrow.svg",
  social: [
    "/assets/social-facebook.svg", "/assets/social-instagram.svg", "/assets/social-youtube.svg", "/assets/social-line.svg"
  ]
};

const quick = ["Admissions", "Courses", "Knowledge", "Events Calendar", "Dean's Direct Line", "Download", "Student Portal", "Personnel Portal", "Community", "Magazine"];
const nav = ["หน้าแรก", "การศึกษาและหลักสูตร", "ภาควิชา", "บุคลากร", "ข่าวสารและกิจกรรม", "เกี่ยวกับเรา"];

function Header() {
  const [open,setOpen]=useState(false);
  return <header className="site-header">
    <div className="top-links"><span>สำหรับนิสิต</span><i /> <span>สำหรับผู้ปกครอง</span><i /> <span>สำหรับบุคลากร</span><i /> <span>สำหรับนิสิตเก่า</span><button className="language" aria-label="Change language"><img className="language-globe" src="/assets/language-globe-figma.svg" alt=""/><span className="language-label">EN</span><img className="language-chevron" src="/assets/language-chevron-figma.svg" alt=""/></button><button className="search" aria-label="Search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="7.5"/><path d="m16 16 6 6"/></svg></button></div>
    <div className="main-nav"><img src={A.logo} alt="Kasetsart Business School logo" /><button className="menu-button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">☰</button><nav className={open?"open":""} aria-label="Main navigation">{nav.map((n,i)=><div className="nav-item" key={n}><a href={i===0?"#top":"#"} onClick={()=>setOpen(false)}>{n}{i===1||i===4?<span>⌄</span>:null}</a>{i===1?<div className="dropdown"><a href="#">หลักสูตรปริญญาตรี</a><a href="#">หลักสูตรบัณฑิตศึกษา</a><a href="#">หลักสูตรนานาชาติ</a></div>:i===4?<div className="dropdown"><a href="#news">ข่าวมหาวิทยาลัย</a><a href="#news">ข่าวนิสิต</a><a href="#news">กิจกรรมและสัมมนา</a></div>:null}</div>)}</nav></div>
  </header>
}

function Hero(){return <section className="hero" id="top"><Header/><h1>KASETSART <em>BUSINESS</em> SCHOOL</h1><div className="hero-image"><img src={A.hero} alt="Kasetsart University business school building"/><img className="hero-shade" src={A.heroShade} alt=""/></div><div className="hero-controls"><button aria-label="Previous slide"><img src="/assets/hero-arrow-left.svg" alt=""/></button><button aria-label="Next slide"><img src="/assets/hero-arrow-right.svg" alt=""/></button></div></section>}

function QuickLinks(){return <section className="quick"><div className="quick-grid">{quick.map((x,i)=><a href="#" className="quick-card" key={x}><span className={'icon-bg c'+i}><img loading="lazy" src={A.icons[i]} alt=""/></span><strong>{x}</strong></a>)}</div></section>}

function Story(){return <section className="story"><div className="orb"/><div className="story-inner"><h2>Our<br/>Story</h2><img loading="lazy" className="story-a" src={A.storyA} alt="Students learning in a business classroom"/><div className="about"><h3>About</h3><p>The Faculty of Business Administration at Kasetsart University empowers future business leaders through innovative education, industry collaboration, and global perspectives. We cultivate knowledge, leadership, and ethical values to prepare graduates for success in an ever-evolving business world.</p></div><div className="stats"><Stat n="3,200+" t="Current Students"/><Stat n="120+" t="Faculty Members"/><Stat n="12" t="Programs"/><Stat n="30+" t="Years of Excellence"/></div><div className="portrait"><img loading="lazy" className="portrait-bg" src={A.storyBg} alt=""/><img loading="lazy" className="portrait-person" src={A.storyWoman} alt="Kasetsart Business School student"/></div></div></section>}
function Stat(p){return <div className="stat"><strong>{p.n}</strong><span>{p.t}</span></div>}

function News(){const [tab,setTab]=useState(0);const [saved,setSaved]=useState(()=>new Set<number>());const toggleSaved=(i:number)=>setSaved(current=>{const next=new Set(current);next.has(i)?next.delete(i):next.add(i);return next});const tabs=["University News","Student News","Meetings/Seminars/Training","Study","Other"];return <section className="news-section" id="news"><h2>NEWS &amp; EVENT</h2><div className="tabs" role="tablist">{tabs.map((x,i)=><button role="tab" aria-selected={tab===i} className={tab===i?"active":""} onClick={()=>setTab(i)} key={x}>{x}</button>)}</div><div className="news-grid">{A.news.map((src,i)=><article className="news-card" key={src}><div className="news-image"><img loading="lazy" src={src} alt="Kasetsart Business School news"/><button className={saved.has(i)?"selected":""} aria-label="Save story" aria-pressed={saved.has(i)} onClick={()=>toggleSaved(i)}><img src="/assets/news-heart.svg" alt=""/></button></div><div className="news-meta"><span>Student News</span><time>07/05/2026</time></div><h3>Kasetsart University's Global Ranking Results From The QS World University Rankings.</h3></article>)}</div></section>}

function Campus(){const rail=useRef(null);const move=(d)=>rail.current?.scrollBy({left:d*394,behavior:"smooth"});const images=[A.campus[0],A.campus[1],A.campus[0],A.campus[2],A.campus[1]];return <section className="campus"><h2>Campus <em>Life</em></h2><p>Discover a vibrant student life filled with opportunities to learn, connect, and grow.</p><a className="campus-see-more" href="#">See more <img src="/assets/campus-see-more-arrow.svg" alt=""/></a><div className="campus-rail" ref={rail}>{images.map((src,i)=><img loading="lazy" src={src} alt="Campus life at Kasetsart University" key={i}/>)}</div><div className="slider-controls"><button onClick={()=>move(-1)} aria-label="Previous image"><img src="/assets/hero-arrow-left.svg" alt=""/></button><button onClick={()=>move(1)} aria-label="Next image"><img src="/assets/hero-arrow-right.svg" alt=""/></button></div></section>}

function CTA(){return <section className="cta"><div className="join"><div><h2>Join the Faculty of<br/><span>Business Administration</span></h2><p>Learn from real business experiences, build practical skills, and prepare yourself for the career you want.</p><a className="pill apply-now" href="#"><span className="arrow-sweep-icon" aria-hidden="true"><img className="arrow-current" src="/assets/apply-now-arrow-glyph.svg" alt=""/><img className="arrow-next" src="/assets/apply-now-arrow-glyph.svg" alt=""/></span><span className="apply-now-label">Apply Now</span></a></div><span className="student-shape" aria-hidden="true"><img src="/assets/join-student-shape.svg" alt=""/></span><figure className="student-image"><img src={A.student} alt="Business school student"/></figure></div><div className="dean" style={{backgroundImage:`linear-gradient(90deg,#00102f 0%,rgba(0,0,0,.1) 100%),url(${A.deanBg})`}}><span className="dean-shape" aria-hidden="true"><img src="/assets/dean-blue-shape.svg" alt=""/></span><img src={A.dean} alt="Dean of Kasetsart Business School"/><div><h2>Dean's Direct Line</h2><div className="dean-contact"><img className="dean-contact-logo" src="/assets/kbs-contact-logo.png" alt="KBS"/><span className="dean-contact-divider" aria-hidden="true"><img src="/assets/kbs-contact-divider.svg" alt=""/></span><p className="dean-contact-copy"><span>Email : fbussrs@ku.ac.th</span><span>Tel : 02-2942-8777 Ext. 721111</span></p></div><a className="pill yellow contact-button" href="#"><span className="arrow-sweep-icon" aria-hidden="true"><img className="arrow-current" src="/assets/contact-arrow-glyph.svg" alt=""/><img className="arrow-next" src="/assets/contact-arrow-glyph.svg" alt=""/></span><span className="contact-button-label">Contact</span></a></div></div></section>}

function Footer(){return <footer><div className="footer-main"><div className="address"><h3>KASETSART BUSINESS SCHOOL</h3><p>50 Ngam Wong Wan Rd, Ladyaow Chatuchak<br/>Bangkok 10900</p><div className="footer-contact"><div className="footer-contact-row email"><img src="/assets/footer-email-figma.svg" alt=""/><span>E-mail kbs@ku.th</span></div><div className="footer-contact-row phone"><span className="footer-phone-icon"><img src="/assets/footer-phone-figma.svg" alt=""/></span><span>Tel. +66 2 942 8777</span></div></div></div><div className="foot-links"><a href="#">For Students</a><a href="#">For Parents</a><a href="#">For Faculty &amp; Staff</a><a href="#">For Alumni</a></div><div className="foot-links"><a href="#">Programs &amp; Courses</a><a href="#">Departments</a><a href="#">Faculty &amp; Staff</a><a href="#news">News &amp; Events</a><a href="#">About Us</a></div><div className="follow"><h3>Follow us</h3><div>{A.social.map((x,i)=><span className="social-icon" key={x}><img className="social-icon-default" loading="lazy" src={x} alt={["Facebook","Instagram","YouTube","Line"][i]}/><img className="social-icon-hover" src={x.replace(".svg","-hover.svg")} alt=""/></span>)}</div></div></div><div className="copyright"><span className="legal-links"><a href="#">Terms of Use</a>　　<a href="#">License agreement</a>　　<a href="#">Privacy policy</a></span><span>Copyright © 2020 Kasetsart University</span></div></footer>}

function App(){return <><Hero/><QuickLinks/><Story/><News/><Campus/><CTA/><Footer/></>}
ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
