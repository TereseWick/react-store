
import React, { useState } from 'react';
import styles from '../styles/ContactPage.module.css';

export default function ContactPage() {
  const [fullName, setFullName] = useState('');
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!fullName || fullName.trim().length < 3) e.fullName = 'Full name must be at least 3 characters.';
    if (!subject || subject.trim().length < 3) e.subject = 'Subject must be at least 3 characters.';
    if (!body || body.trim().length < 3) e.body = 'Body must be at least 3 characters.';
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) e.email = 'Please enter a valid email.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }
  function onSubmit(evt) {
    evt.preventDefault();
    if (!validate()) return;
    const data = { fullName, subject, email, body };
    console.log('Contact form data:', data);
    alert('Message sent! Check console for payload.');
    setFullName(''); setSubject(''); setEmail(''); setBody('');
  }

  return (
    <div className={styles.page}>
      <h1>Contact</h1>
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <label>
          Full name
          <input
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            minLength={3}
          />
          {errors.fullName && <span className={styles.error}>{errors.fullName}</span>}
        </label>
        <label>
          Subject
          <input
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            minLength={3}
          />
          {errors.subject && <span className={styles.error}>{errors.subject}</span>}
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </label>
        <label>
          Body
          <textarea
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={5}
          />
          {errors.body && <span className={styles.error}>{errors.body}</span>}
        </label>
        <button type="submit" className={styles.submit}>Send</button>
      </form>
    </div>
  );
}

