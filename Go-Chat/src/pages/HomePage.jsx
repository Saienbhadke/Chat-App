import React, { useState, useRef, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Badge } from 'react-bootstrap'
import Header from '../components/Header'
import Footer from '../components/Footer'

// ─── Mock Data ────────────────────────────────────────────────────────────────
const CONTACTS = [
  { id: 1, name: 'Alex Rivera',   avatar: 'AR', status: 'online',  lastMsg: 'Hey, are you free?',          time: '2m',  unread: 3 },
  { id: 2, name: 'Sam Chen',      avatar: 'SC', status: 'online',  lastMsg: 'Pushed the fix 🚀',            time: '15m', unread: 0 },
  { id: 3, name: 'Jordan Lee',    avatar: 'JL', status: 'away',    lastMsg: 'Let me check that for you',   time: '1h',  unread: 1 },
  { id: 4, name: 'Morgan Smith',  avatar: 'MS', status: 'offline', lastMsg: 'Good night!',                  time: '8h',  unread: 0 },
  { id: 5, name: 'Taylor Brown',  avatar: 'TB', status: 'online',  lastMsg: 'Did you see the PR?',         time: '1d',  unread: 0 },
]

const INITIAL_MESSAGES = {
  1: [
    { id: 1, from: 'them', text: 'Hey! How\'s the project going?', time: '10:01 AM' },
    { id: 2, from: 'me',   text: 'Pretty well! Just finishing the chat UI :)', time: '10:02 AM' },
    { id: 3, from: 'them', text: 'Looks amazing btw.', time: '10:03 AM' },
    { id: 4, from: 'them', text: 'Hey, are you free?', time: '10:04 AM' },
  ],
  2: [
    { id: 1, from: 'them', text: 'Found the bug (bug)', time: '9:30 AM' },
    { id: 2, from: 'me',   text: 'Nice! What was it?', time: '9:32 AM' },
    { id: 3, from: 'them', text: 'Pushed the fix (rocket)', time: '9:45 AM' },
  ],
  3: [{ id: 1, from: 'them', text: 'Let me check that for you', time: 'Yesterday' }],
  4: [{ id: 1, from: 'them', text: 'Good night!', time: 'Yesterday' }],
  5: [{ id: 1, from: 'them', text: 'Did you see the PR?', time: '2d ago' }],
}

const STATUS_COLORS = { online: '#22c55e', away: '#f59e0b', offline: '#6b7280' }

// ─── Component ────────────────────────────────────────────────────────────────
const HomePage = () => {
  const [activeId, setActiveId]     = useState(1)
  const [messages, setMessages]     = useState(INITIAL_MESSAGES)
  const [input, setInput]           = useState('')
  const [search, setSearch]         = useState('')
  const [typing, setTyping]         = useState(false)
  const bottomRef = useRef(null)
  const prevActiveIdRef = useRef(activeId)

  const active = CONTACTS.find(c => c.id === activeId)
  const filtered = CONTACTS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, activeId])

  const [typingTimeout, setTypingTimeout] = useState(null)

  // Simulate "typing…" indicator on contact switch
  useEffect(() => {
    if (prevActiveIdRef.current !== activeId) {
      if (active?.status === 'online') {
        setTyping(true)
        const timeout = setTimeout(() => setTyping(false), 2500)
        setTypingTimeout(timeout)
      } else {
        setTyping(false)
        if (typingTimeout) {
          clearTimeout(typingTimeout)
          setTypingTimeout(null)
        }
      }
      prevActiveIdRef.current = activeId
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, active?.status])

  const sendMessage = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    const newMsg = { id: Date.now(), from: 'me', text: input.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setMessages(prev => ({ ...prev, [activeId]: [...(prev[activeId] || []), newMsg] }))
    setInput('')
  }

  return (
    <div className="home-root">
      <Header />

      <Container fluid className="chat-shell px-0">
        <Row className="g-0 h-100">

          {/* ── Sidebar ── */}
          <Col xs={12} md={4} lg={3} className="sidebar">
            <div className="sidebar-header">
              <h2 className="sidebar-title">Messages</h2>
              <button className="new-chat-btn" title="New chat">＋</button>
            </div>

            <div className="search-wrap">
              <span className="search-icon">🔍</span>
              <input
                className="search-input"
                placeholder="Search conversations…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="contact-list">
              {filtered.map(c => (
                <button
                  key={c.id}
                  className={`contact-item ${activeId === c.id ? 'active' : ''}`}
                  onClick={() => setActiveId(c.id)}
                >
                  <div className="avatar-wrap">
                    <div className="avatar">{c.avatar}</div>
                    <span className="status-dot" style={{ background: STATUS_COLORS[c.status] }} />
                  </div>
                  <div className="contact-info">
                    <div className="contact-top">
                      <span className="contact-name">{c.name}</span>
                      <span className="contact-time">{c.time}</span>
                    </div>
                    <div className="contact-bottom">
                      <span className="contact-last">{c.lastMsg}</span>
                      {c.unread > 0 && <Badge className="unread-badge">{c.unread}</Badge>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Col>

          {/* ── Chat Panel ── */}
          <Col xs={12} md={8} lg={9} className="chat-panel">
            {/* Chat header */}
            <div className="chat-header">
              <div className="avatar-wrap">
                <div className="avatar avatar-lg">{active?.avatar}</div>
                <span className="status-dot" style={{ background: STATUS_COLORS[active?.status] }} />
              </div>
              <div className="chat-info">
                <p className="chat-contact-name">{active?.name}</p>
                <p className="chat-status">{typing ? '✍️ typing…' : active?.status}</p>
              </div>
              <div className="chat-actions ms-auto">
                <button className="icon-btn" title="Call">📞</button>
                <button className="icon-btn" title="Video">📹</button>
                <button className="icon-btn" title="Info">ℹ️</button>
              </div>
            </div>

            {/* Messages */}
            <div className="messages-area">
              {(messages[activeId] || []).map((msg) => (
                <div key={msg.id} className={`msg-row ${msg.from === 'me' ? 'msg-me' : 'msg-them'}`}>
                  {msg.from === 'them' && <div className="msg-avatar">{active?.avatar}</div>}
                  <div className="bubble-wrap">
                    <div className={`bubble ${msg.from === 'me' ? 'bubble-me' : 'bubble-them'}`}>
                      {msg.text}
                    </div>
                    <span className="msg-time">{msg.time}</span>
                  </div>
                </div>
              ))}
              {typing && (
                <div className="msg-row msg-them">
                  <div className="msg-avatar">{active?.avatar}</div>
                  <div className="bubble bubble-them typing-bubble">
                    <span /><span /><span />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <Form onSubmit={sendMessage} className="input-bar">
              <button type="button" className="icon-btn attach-btn" title="Attach">📎</button>
              <input
                className="msg-input"
                placeholder="Type a message…"
                value={input}
                onChange={e => setInput(e.target.value)}
              />
              <button type="button" className="icon-btn" title="Emoji">😊</button>
              <button type="submit" className="send-btn" disabled={!input.trim()}>
                ➤
              </button>
            </Form>
          </Col>
        </Row>
      </Container>

      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; }

        .home-root {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: #0d0d1a;
          font-family: 'DM Sans', sans-serif;
          color: #e8e8f0;
        }

        .chat-shell {
          flex: 1;
          display: flex;
          height: calc(100vh - 112px); /* adjust for header+footer */
        }
        .chat-shell .row { height: 100%; }

        /* ── Sidebar ── */
        .sidebar {
          background: #111124;
          border-right: 1px solid rgba(255,255,255,0.07);
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
        }
        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.25rem 0.75rem;
          gap: 1rem;
        }
        .sidebar-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.2rem;
          font-weight: 800;
          color: #fff;
          margin: 0;
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .new-chat-btn {
          background: linear-gradient(135deg,#6c3de8,#a855f7);
          border: none;
          border-radius: 50%;
          width: 32px; height: 32px;
          color: #fff;
          font-size: 1.1rem;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .new-chat-btn:hover { transform: scale(1.1); box-shadow: 0 4px 16px rgba(108,61,232,0.5); }

        .search-wrap {
          position: relative;
          padding: 0.5rem 1.25rem 0.75rem;
        }
        .search-icon { position: absolute; left: 2rem; top: 50%; transform: translateY(-50%); font-size: 0.8rem; opacity: 0.5; }
        .search-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 0.5rem 0.75rem 0.5rem 2.2rem;
          color: #e8e8f0;
          font-size: 0.85rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .search-input:focus { border-color: #6c3de8; }
        .search-input::placeholder { color: rgba(255,255,255,0.25); }

        .contact-list { flex: 1; overflow-y: auto; padding-bottom: 1rem; }
        .contact-list::-webkit-scrollbar { width: 4px; }
        .contact-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }

        .contact-item {
          display: flex; align-items: center; gap: 0.85rem;
          width: 100%; background: none; border: none;
          padding: 1rem 1.25rem;
          cursor: pointer; text-align: left;
          transition: background 0.15s;
          border-left: 3px solid transparent;
        }
        .contact-item:hover { background: rgba(255,255,255,0.04); }
        .contact-item.active { background: rgba(108,61,232,0.15); border-left-color: #6c3de8; }

        .avatar-wrap { position: relative; flex-shrink: 0; }
        .avatar {
          width: 42px; height: 42px; border-radius: 50%;
          background: linear-gradient(135deg,#6c3de8,#a855f7);
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 0.75rem; color: #fff; letter-spacing: 0.05em;
        }
        .avatar-lg { width: 40px; height: 40px; font-size: 0.8rem; }
        .status-dot {
          position: absolute; bottom: 1px; right: 1px;
          width: 10px; height: 10px;
          border-radius: 50%;
          border: 2px solid #111124;
        }
        .contact-info { flex: 1; min-width: 0; }
        .contact-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
        .contact-name { font-weight: 600; font-size: 0.95rem; color: #e8e8f0; }
        .contact-time { font-size: 0.72rem; color: rgba(255,255,255,0.45); flex-shrink: 0; }
        .contact-bottom { display: flex; justify-content: space-between; align-items: center; }
        .contact-last { font-size: 0.82rem; color: rgba(255,255,255,0.55); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px; }
        .unread-badge { background: #6c3de8 !important; font-size: 0.65rem !important; border-radius: 10px !important; padding: 2px 6px !important; }

        /* ── Chat Panel ── */
        .chat-panel {
          display: flex; flex-direction: column;
          height: 100%; background: #0d0d1a;
          overflow: hidden;
        }
        .chat-header {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          flex-shrink: 0;
        }
        .chat-header .status-dot { border-color: #0d0d1a; }
        .chat-info { flex: 1; min-width: 0; }
        .chat-contact-name { font-family: 'Syne',sans-serif; font-weight: 700; font-size: 1rem; color: #fff; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .chat-status { font-size: 0.75rem; color: rgba(255,255,255,0.4); margin: 0; text-transform: capitalize; }
        .chat-actions { display: flex; gap: 0.5rem; }
        .icon-btn {
          background: rgba(255,255,255,0.06); border: none;
          border-radius: 10px; width: 36px; height: 36px;
          cursor: pointer; font-size: 1rem;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
        }
        .icon-btn:hover { background: rgba(255,255,255,0.12); }

        .messages-area {
          flex: 1; overflow-y: auto;
          padding: 1.5rem;
          display: flex; flex-direction: column; gap: 0.75rem;
        }
        .messages-area::-webkit-scrollbar { width: 4px; }
        .messages-area::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }

        .msg-row { display: flex; align-items: flex-end; gap: 0.5rem; }
        .msg-me { flex-direction: row-reverse; }
        .msg-avatar {
          width: 30px; height: 30px; border-radius: 50%;
          background: linear-gradient(135deg,#6c3de8,#a855f7);
          font-size: 0.6rem; font-weight: 700; color: #fff;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .bubble-wrap { display: flex; flex-direction: column; max-width: 65%; }
        .msg-me .bubble-wrap { align-items: flex-end; }
        .bubble {
          padding: 0.65rem 1rem; border-radius: 18px;
          font-size: 0.9rem; line-height: 1.5;
          animation: popIn 0.2s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
        .bubble-them {
          background: rgba(255,255,255,0.08);
          color: #e8e8f0;
          border-bottom-left-radius: 4px;
        }
        .bubble-me {
          background: linear-gradient(135deg,#6c3de8,#a855f7);
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        .msg-time { font-size: 0.68rem; color: rgba(255,255,255,0.25); margin-top: 3px; padding: 0 4px; }

        /* Typing indicator */
        .typing-bubble { display: flex; align-items: center; gap: 4px; padding: 0.75rem 1rem; }
        .typing-bubble span {
          width: 7px; height: 7px; border-radius: 50%;
          background: rgba(255,255,255,0.5);
          animation: bounce 1.2s infinite;
        }
        .typing-bubble span:nth-child(2) { animation-delay: 0.2s; }
        .typing-bubble span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce { 0%,80%,100% { transform: translateY(0); } 40% { transform: translateY(-6px); } }

        /* Input bar */
        .input-bar {
          display: flex; align-items: center; gap: 0.5rem;
          padding: 1rem 1.25rem;
          border-top: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          flex-shrink: 0;
        }
        .msg-input {
          flex: 1;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 0.65rem 1rem;
          color: #e8e8f0;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .msg-input:focus { border-color: #6c3de8; }
        .msg-input::placeholder { color: rgba(255,255,255,0.25); }
        .attach-btn { font-size: 1.1rem; }
        .send-btn {
          background: linear-gradient(135deg,#6c3de8,#a855f7);
          border: none; border-radius: 50%;
          width: 40px; height: 40px;
          color: #fff; font-size: 1.1rem;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.15s, box-shadow 0.15s;
          flex-shrink: 0;
        }
        .send-btn:hover:not(:disabled) { transform: scale(1.08); box-shadow: 0 4px 16px rgba(108,61,232,0.5); }
        .send-btn:disabled { opacity: 0.4; cursor: default; }
      `}</style>
    </div>
  )
}

export default HomePage
