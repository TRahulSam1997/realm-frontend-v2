import React, { useRef, useState } from 'react';

const EmailCollectionFooter = () => {

    const inputEl = useRef(null);

    const [message, setMessage] = useState('');

    const subscribe = async (e) => {
        e.preventDefault();

        // 3. Send a request to our API with the user's email address.
        const res = await fetch('/api/subscribe', {
          body: JSON.stringify({
            email: inputEl.current.value
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        });

        const { error } = await res.json();

        if (error) {
          // 4. If there was an error, update the message in state.
          setMessage(error);

          return;
        }

        // 5. Clear the input value and show a success message.
        inputEl.current.value = '';
        setMessage('Success! You are now subscribed to our Newsletter.');
      };

    return (
        <>
            <p>Email Collection</p>
            <form onSubmit={subscribe}>
        <label htmlFor="email-input">{'Email Address'}</label>
        <input
            id="email-input"
            name="email"
            placeholder="you@awesome.com"
            ref={inputEl}
            required
            type="email"
        />
        <div>
            {message
            ? message
            : `New content, snippets, findings & more.`}
        </div>
        <button type="submit">{'Subscribe'}</button>
        </form>
    </>
    )
}

export default EmailCollectionFooter;