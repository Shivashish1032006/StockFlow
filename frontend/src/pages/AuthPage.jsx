import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Boxes, Eye, EyeOff, ArrowRight, ShieldCheck, PackageCheck, BarChart3 } from 'lucide-react'

export default function AuthPage({ mode = 'login', onAuthenticated }) {
  const isSignup = mode === 'signup'
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password) return setError('Please enter your email and password.')
    if (isSignup && !name.trim()) return setError('Please enter your full name.')
    if (password.length < 6) return setError('Password must contain at least 6 characters.')
    if (isSignup && password !== confirm) return setError('Passwords do not match.')
    const user = { name: name.trim() || email.split('@')[0], email: email.trim() }
    // Frontend demo only. Replace with a backend authentication API before production.
    localStorage.setItem('stockflow-demo-user', JSON.stringify(user))
    onAuthenticated(user)
    navigate('/')
  }

  return <div className="auth-page">
    <section className="auth-visual">
      <div className="auth-brand"><div className="auth-brand-mark"><Boxes size={23}/></div><span>stockflow<span>.</span></span></div>
      <div className="auth-visual-content">
        <div className="auth-kicker"><span/> INVENTORY INTELLIGENCE, REIMAGINED</div>
        <h1>Clarity for every<br/><em>moving part.</em></h1>
        <p>One thoughtful workspace to keep your stock, suppliers and business performance in sync.</p>
        <div className="auth-feature-list">
          <div><span><PackageCheck size={17}/></span><div><strong>Inventory, under control</strong><small>Track stock movement and batch health.</small></div></div>
          <div><span><ShieldCheck size={17}/></span><div><strong>Stay one step ahead</strong><small>Catch exceptions before they grow.</small></div></div>
          <div><span><BarChart3 size={17}/></span><div><strong>Decisions with context</strong><small>See the numbers behind performance.</small></div></div>
        </div>
      </div>
      <div className="auth-visual-footer">A calmer way to manage the moving parts of business.</div>
      <div className="auth-decoration auth-decoration-one"/><div className="auth-decoration auth-decoration-two"/>
    </section>
    <section className="auth-form-side">
      <div className="auth-mobile-brand"><div className="auth-brand-mark"><Boxes size={21}/></div><span>stockflow<span>.</span></span></div>
      <div className="auth-form-wrap">
        <div className="auth-form-eyebrow">{isSignup ? 'CREATE YOUR WORKSPACE ACCESS' : 'WELCOME BACK'}</div>
        <h2>{isSignup ? 'Create your account' : 'Sign in to StockFlow'}</h2>
        <p className="auth-subtitle">{isSignup ? 'A smarter inventory workspace starts here.' : 'Enter your details to continue to your workspace.'}</p>
        <form onSubmit={handleSubmit} className="auth-form">
          {isSignup && <label>Full name<div className="auth-input"><input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Aditi Sharma" autoComplete="name"/></div></label>}
          <label>Email address<div className="auth-input"><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" autoComplete="email"/></div></label>
          <label>Password<div className="auth-input"><input type={showPassword?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 6 characters" autoComplete={isSignup?'new-password':'current-password'}/><button type="button" onClick={()=>setShowPassword(!showPassword)} aria-label="Toggle password visibility">{showPassword?<EyeOff size={17}/>:<Eye size={17}/>}</button></div></label>
          {isSignup && <label>Confirm password<div className="auth-input"><input type={showPassword?'text':'password'} value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Re-enter your password" autoComplete="new-password"/></div></label>}
          {error && <div className="auth-error">{error}</div>}
          {!isSignup && <div className="auth-form-options"><label className="remember-option"><input type="checkbox"/> Remember me</label><span>Secure workspace access</span></div>}
          <button className="auth-submit" type="submit">{isSignup?'Create account':'Sign in'} <ArrowRight size={17}/></button>
        </form>
        <div className="auth-switch">{isSignup?'Already have an account?':'New to StockFlow?'} <Link to={isSignup?'/login':'/signup'}>{isSignup?'Sign in':'Create an account'}</Link></div>
        <div className="auth-terms">By continuing, you agree to use StockFlow in accordance with your organization's policies.</div>
      </div>
      <div className="auth-copyright">© 2026 StockFlow · Inventory intelligence, made simple.</div>
    </section>
  </div>
}
