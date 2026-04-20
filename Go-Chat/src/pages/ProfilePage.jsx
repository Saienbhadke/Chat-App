import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import Header from '../components/Header'
import Footer from '../components/Footer'

const INITIAL_PROFILE = {
  name: 'Alex Rivera',
  username: 'alex.rivera',
  email: 'alex@example.com',
  bio: 'Full-stack developer. Building things in public. Coffee enthusiast (coffee)',
  status: 'online',
  avatar: 'AR',
}

const STATS = [
  { label: 'Messages', value: '3,412' },
  { label: 'Friends',  value: '128'   },
  { label: 'Groups',   value: '14'    },
]

const ProfilePage = () => {
  const [profile, setProfile]     = useState(INITIAL_PROFILE)
  const [editing, setEditing]     = useState(false)
  const [draft, setDraft]         = useState(INITIAL_PROFILE)
  const [saved, setSaved]         = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  const startEdit = () => { setDraft(profile); setEditing(true); setSaved(false) }
  const cancelEdit = () => setEditing(false)
  const saveEdit = () => {
    setProfile(draft)
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const STATUS_OPTS = ['online', 'away', 'busy', 'offline']
  const STATUS_COLORS = { online: '#22c55e', away: '#f59e0b', busy: '#ef4444', offline: '#6b7280' }

  return (
    <div className="profile-root">
      <Header />

      {/* Hero banner */}
      <div className="profile-banner">
        <div className="banner-gradient" />
        <Container className="banner-inner">
          <div className="avatar-section">
            <div className="profile-avatar">
              {profile.avatar}
              <span
                className="profile-status-dot"
                style={{ background: STATUS_COLORS[profile.status] }}
              />
            </div>
            <div className="profile-hero-info">
              <h1 className="profile-name">{profile.name}</h1>
              <p className="profile-handle">@{profile.username}</p>
              <p className="profile-bio-preview">{profile.bio}</p>
            </div>
          </div>

          <div className="profile-stats">
            {STATS.map(s => (
              <div key={s.label} className="stat-card">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Tab bar */}
      <div className="tab-bar">
        <Container>
          <div className="tab-list">
            {['profile', 'activity', 'settings'].map(t => (
              <button
                key={t}
                className={`tab-btn ${activeTab === t ? 'active' : ''}`}
                onClick={() => setActiveTab(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* Content */}
      <Container className="profile-content py-4">
        {saved && (
          <Alert variant="success" className="save-alert">
            ✅ Profile updated successfully!
          </Alert>
        )}

        {activeTab === 'profile' && (
          <Row className="g-4">
            {/* Left: Edit form */}
            <Col lg={7}>
              <div className="content-card">
                <div className="card-header-row">
                  <h2 className="card-title">Profile Information</h2>
                  {!editing
                    ? <button className="edit-btn" onClick={startEdit}>✏️ Edit</button>
                    : <div className="d-flex gap-2">
                        <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
                        <button className="save-btn" onClick={saveEdit}>Save Changes</button>
                      </div>
                  }
                </div>

                <Form>
                  <Row className="g-3">
                    <Col sm={6}>
                      <Form.Label className="f-label">Full Name</Form.Label>
                      <Form.Control
                        className="f-input"
                        value={editing ? draft.name : profile.name}
                        onChange={e => setDraft(d => ({...d, name: e.target.value}))}
                        readOnly={!editing}
                      />
                    </Col>
                    <Col sm={6}>
                      <Form.Label className="f-label">Username</Form.Label>
                      <Form.Control
                        className="f-input"
                        value={editing ? draft.username : profile.username}
                        onChange={e => setDraft(d => ({...d, username: e.target.value}))}
                        readOnly={!editing}
                      />
                    </Col>
                    <Col xs={12}>
                      <Form.Label className="f-label">Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        className="f-input"
                        value={editing ? draft.email : profile.email}
                        onChange={e => setDraft(d => ({...d, email: e.target.value}))}
                        readOnly={!editing}
                      />
                    </Col>
                    <Col xs={12}>
                      <Form.Label className="f-label">Bio</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        className="f-input"
                        value={editing ? draft.bio : profile.bio}
                        onChange={e => setDraft(d => ({...d, bio: e.target.value}))}
                        readOnly={!editing}
                      />
                    </Col>
                    <Col sm={6}>
                      <Form.Label className="f-label">Status</Form.Label>
                      <Form.Select
                        className="f-input"
                        value={editing ? draft.status : profile.status}
                        onChange={e => setDraft(d => ({...d, status: e.target.value}))}
                        disabled={!editing}
                      >
                        {STATUS_OPTS.map(s => (
                          <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>

            {/* Right: Quick info */}
            <Col lg={5}>
              <div className="content-card mb-4">
                <h2 className="card-title mb-3">Quick Actions</h2>
                <div className="quick-actions">
                  <button className="qa-btn">📤 Share Profile</button>
                  <button className="qa-btn">🔒 Privacy Settings</button>
                  <button className="qa-btn">🔔 Notifications</button>
                  <button className="qa-btn qa-danger">🚪 Sign Out</button>
                </div>
              </div>

              <div className="content-card">
                <h2 className="card-title mb-3">Current Status</h2>
                <div className="status-preview">
                  <span
                    className="big-status-dot"
                    style={{ background: STATUS_COLORS[profile.status] }}
                  />
                  <span className="status-text" style={{ color: STATUS_COLORS[profile.status] }}>
                    {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
                  </span>
                </div>
                <p className="status-hint">
                  People can see you as <strong>{profile.status}</strong> in their contact list.
                </p>
              </div>
            </Col>
          </Row>
        )}

        {activeTab === 'activity' && (
          <div className="content-card">
            <h2 className="card-title mb-4">Recent Activity</h2>
            <div className="activity-list">
              {[
                { icon: '💬', text: 'Sent a message to Sam Chen', time: '2 minutes ago' },
                { icon: '👥', text: 'Joined group "Dev Team Alpha"', time: '1 hour ago' },
                { icon: '✏️', text: 'Updated profile bio', time: '3 hours ago' },
                { icon: '📎', text: 'Shared a file with Jordan Lee', time: 'Yesterday' },
                { icon: '🔔', text: 'Changed notification settings', time: '2 days ago' },
              ].map((a, i) => (
                <div key={i} className="activity-item">
                  <span className="activity-icon">{a.icon}</span>
                  <div>
                    <p className="activity-text">{a.text}</p>
                    <p className="activity-time">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <Row className="g-4">
            <Col lg={6}>
              <div className="content-card">
                <h2 className="card-title mb-4">Security</h2>
                <div className="settings-list">
                  <div className="setting-row">
                    <div>
                      <p className="setting-name">Two-Factor Authentication</p>
                      <p className="setting-desc">Add an extra layer of security</p>
                    </div>
                    <button className="toggle-btn">Enable</button>
                  </div>
                  <div className="setting-row">
                    <div>
                      <p className="setting-name">Change Password</p>
                      <p className="setting-desc">Last changed 30 days ago</p>
                    </div>
                    <button className="toggle-btn">Update</button>
                  </div>
                  <div className="setting-row">
                    <div>
                      <p className="setting-name">Active Sessions</p>
                      <p className="setting-desc">2 devices logged in</p>
                    </div>
                    <button className="toggle-btn danger-toggle">Revoke</button>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="content-card">
                <h2 className="card-title mb-4">Notifications</h2>
                <div className="settings-list">
                  {[
                    { label: 'New Messages',      desc: 'Get notified for every message' },
                    { label: 'Friend Requests',   desc: 'When someone adds you' },
                    { label: 'Group Invites',     desc: 'When added to a group' },
                    { label: 'Email Digest',      desc: 'Daily activity summary' },
                  ].map((n, i) => (
                    <div key={i} className="setting-row">
                      <div>
                        <p className="setting-name">{n.label}</p>
                        <p className="setting-desc">{n.desc}</p>
                      </div>
                      <label className="toggle-switch">
                        <input type="checkbox" defaultChecked={i < 2} />
                        <span className="toggle-track" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Container>

      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; }
        .profile-root {
          min-height: 100vh;
          background: #0d0d1a;
          font-family: 'DM Sans', sans-serif;
          color: #e8e8f0;
          display: flex; flex-direction: column;
        }

        /* Banner */
        .profile-banner {
          position: relative;
          padding: 3rem 0 2rem;
          overflow: hidden;
        }
        .banner-gradient {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(108,61,232,0.4) 0%, rgba(168,85,247,0.2) 50%, rgba(26,143,232,0.2) 100%);
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .banner-inner { position: relative; z-index: 2; display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1.5rem; }

        .avatar-section { display: flex; align-items: center; gap: 1.5rem; }
        .profile-avatar {
          position: relative;
          width: 90px; height: 90px; border-radius: 50%;
          background: linear-gradient(135deg,#6c3de8,#a855f7);
          font-family: 'Syne',sans-serif;
          font-weight: 800; font-size: 1.6rem; color: #fff;
          display: flex; align-items: center; justify-content: center;
          border: 3px solid rgba(255,255,255,0.2);
          box-shadow: 0 8px 32px rgba(108,61,232,0.4);
        }
        .profile-status-dot {
          position: absolute; bottom: 4px; right: 4px;
          width: 14px; height: 14px; border-radius: 50%;
          border: 2px solid #0d0d1a;
        }
        .profile-name { font-family: 'Syne',sans-serif; font-size: 1.75rem; font-weight: 800; color: #fff; margin: 0; }
        .profile-handle { color: rgba(255,255,255,0.45); font-size: 0.9rem; margin: 2px 0; }
        .profile-bio-preview { color: rgba(255,255,255,0.6); font-size: 0.85rem; margin: 0; max-width: 360px; }

        .profile-stats { display: flex; gap: 1.5rem; }
        .stat-card { text-align: center; }
        .stat-value { display: block; font-family: 'Syne',sans-serif; font-size: 1.4rem; font-weight: 800; color: #fff; }
        .stat-label { display: block; font-size: 0.72rem; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.05em; }

        /* Tab bar */
        .tab-bar { background: #111124; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .tab-list { display: flex; gap: 0; padding: 0; }
        .tab-btn {
          background: none; border: none; color: rgba(255,255,255,0.45);
          padding: 1rem 1.5rem; font-size: 0.9rem; font-family: 'DM Sans',sans-serif;
          cursor: pointer; border-bottom: 2px solid transparent;
          transition: color 0.2s, border-color 0.2s;
          text-transform: capitalize;
        }
        .tab-btn:hover { color: #fff; }
        .tab-btn.active { color: #a78bfa; border-bottom-color: #6c3de8; }

        /* Cards */
        .profile-content { flex: 1; }
        .content-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 1.75rem;
        }
        .card-header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .card-title { font-family: 'Syne',sans-serif; font-weight: 700; font-size: 1.1rem; color: #fff; margin: 0; }

        /* Form */
        .f-label { color: rgba(255,255,255,0.55); font-size: 0.78rem; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 0.35rem; }
        .f-input {
          background: rgba(255,255,255,0.06) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          border-radius: 12px !important;
          color: #e8e8f0 !important;
          padding: 0.65rem 1rem !important;
          font-size: 0.9rem !important;
          transition: border-color 0.2s;
        }
        .f-input:focus { border-color: #6c3de8 !important; box-shadow: 0 0 0 3px rgba(108,61,232,0.25) !important; outline: none !important; }
        .f-input[readonly] { opacity: 0.7; cursor: default; }
        .f-input option { background: #1a1a2e; color: #e8e8f0; }

        /* Edit/Save buttons */
        .edit-btn {
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px; color: rgba(255,255,255,0.7); padding: 0.4rem 1rem;
          font-size: 0.85rem; cursor: pointer; transition: background 0.2s;
        }
        .edit-btn:hover { background: rgba(255,255,255,0.14); }
        .cancel-btn {
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; color: rgba(255,255,255,0.5); padding: 0.4rem 1rem;
          font-size: 0.85rem; cursor: pointer;
        }
        .save-btn {
          background: linear-gradient(135deg,#6c3de8,#a855f7);
          border: none; border-radius: 10px; color: #fff;
          padding: 0.4rem 1.2rem; font-size: 0.85rem; font-weight: 600;
          cursor: pointer; transition: transform 0.15s;
        }
        .save-btn:hover { transform: translateY(-1px); }

        /* Quick actions */
        .quick-actions { display: flex; flex-direction: column; gap: 0.6rem; }
        .qa-btn {
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; color: rgba(255,255,255,0.75);
          padding: 0.7rem 1rem; font-size: 0.88rem; text-align: left;
          cursor: pointer; transition: background 0.2s, color 0.2s;
        }
        .qa-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }
        .qa-danger { color: #f87171 !important; border-color: rgba(248,113,113,0.2) !important; }
        .qa-danger:hover { background: rgba(248,113,113,0.1) !important; }

        /* Status */
        .status-preview { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; }
        .big-status-dot { width: 16px; height: 16px; border-radius: 50%; flex-shrink: 0; }
        .status-text { font-family: 'Syne',sans-serif; font-weight: 700; font-size: 1.1rem; }
        .status-hint { color: rgba(255,255,255,0.4); font-size: 0.82rem; margin: 0; }
        .status-hint strong { color: rgba(255,255,255,0.65); }

        /* Activity */
        .activity-list { display: flex; flex-direction: column; gap: 0; }
        .activity-item {
          display: flex; align-items: flex-start; gap: 1rem;
          padding: 0.9rem 0; border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .activity-item:last-child { border-bottom: none; }
        .activity-icon { font-size: 1.3rem; flex-shrink: 0; }
        .activity-text { color: #e8e8f0; font-size: 0.88rem; margin: 0 0 2px; }
        .activity-time { color: rgba(255,255,255,0.3); font-size: 0.75rem; margin: 0; }

        /* Settings */
        .settings-list { display: flex; flex-direction: column; gap: 0; }
        .setting-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 0.9rem 0; border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .setting-row:last-child { border-bottom: none; }
        .setting-name { color: #e8e8f0; font-size: 0.88rem; margin: 0 0 2px; font-weight: 500; }
        .setting-desc { color: rgba(255,255,255,0.35); font-size: 0.75rem; margin: 0; }
        .toggle-btn {
          background: rgba(108,61,232,0.2); border: 1px solid rgba(108,61,232,0.4);
          border-radius: 8px; color: #a78bfa; padding: 0.3rem 0.8rem;
          font-size: 0.78rem; cursor: pointer; white-space: nowrap;
          transition: background 0.2s;
        }
        .toggle-btn:hover { background: rgba(108,61,232,0.35); }
        .danger-toggle { background: rgba(248,113,113,0.1) !important; border-color: rgba(248,113,113,0.3) !important; color: #f87171 !important; }

        /* Toggle switch */
        .toggle-switch { position: relative; display: inline-block; cursor: pointer; flex-shrink: 0; }
        .toggle-switch input { opacity: 0; width: 0; height: 0; }
        .toggle-track {
          position: relative; display: block;
          width: 40px; height: 22px; border-radius: 11px;
          background: rgba(255,255,255,0.1);
          transition: background 0.2s;
        }
        .toggle-track::after {
          content: ''; position: absolute;
          width: 16px; height: 16px; border-radius: 50%; background: #fff;
          top: 3px; left: 3px;
          transition: transform 0.2s;
        }
        .toggle-switch input:checked + .toggle-track { background: #6c3de8; }
        .toggle-switch input:checked + .toggle-track::after { transform: translateX(18px); }

        .save-alert { border-radius: 12px; font-size: 0.88rem; margin-bottom: 1.5rem; }
      `}</style>
    </div>
  )
}

export default ProfilePage
