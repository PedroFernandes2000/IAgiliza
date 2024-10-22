import React, { useState, useEffect } from 'react';
import { getEmails } from './mockEmailApi';
import { Link } from 'react-router-dom';

const EmailList = ({ updateTrigger }) => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchEmails = async () => {
      const emailData = await getEmails();
      setEmails(emailData);
    };

    fetchEmails();
  }, [updateTrigger]);  // Atualiza quando updateTrigger mudar

  return (
    <div>
      <h2>Emails que precisam ser respondidos</h2>
      <ul>
        {emails.map(email => (
          <li key={email.id} style={{ marginBottom: '20px' }}>
            <h4>{email.subject}</h4>
            <p>{email.body}</p>
            <Link to={`/responder/${email.id}`}>
              <button>Responder</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailList;
