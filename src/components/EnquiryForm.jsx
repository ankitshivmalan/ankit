import { useState } from 'react';

const initialState = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
};

export const EnquiryForm = () => {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong while sending your enquiry.');
      }

      setForm(initialState);
      setStatus({
        type: 'success',
        message: 'Your enquiry has been saved and emailed successfully.',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Unable to submit your enquiry right now.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className='enquiry-form' onSubmit={handleSubmit}>
      <div className='form-grid'>
        <label>
          <span>Name</span>
          <input name='name' value={form.name} onChange={handleChange} required />
        </label>
        <label>
          <span>Email</span>
          <input name='email' type='email' value={form.email} onChange={handleChange} required />
        </label>
        <label>
          <span>Phone</span>
          <input name='phone' value={form.phone} onChange={handleChange} required />
        </label>
        <label>
          <span>Company</span>
          <input name='company' value={form.company} onChange={handleChange} />
        </label>
      </div>

      <label>
        <span>Service needed</span>
        <input
          name='service'
          value={form.service}
          onChange={handleChange}
          placeholder='Web app, mobile app, DevOps, consulting...'
          required
        />
      </label>

      <button className='button button--primary' type='submit' disabled={submitting}>
        {submitting ? 'Sending...' : 'Send enquiry'}
      </button>

      {status.message ? (
        <p className={`form-status ${status.type === 'success' ? 'success' : 'error'}`}>
          {status.message}
        </p>
      ) : null}
    </form>
  );
};
