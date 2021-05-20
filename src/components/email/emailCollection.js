import React, { useRef, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const EmailCollection = () => {

    const inputEl = useRef(null);
    const [form, setForm] = useState(false);
    const [message, setMessage] = useState('');

    const subscribe = async (e) => {
        e.preventDefault();
        setForm({ state: 'loading' });

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
          setForm({
            state: 'error',
            message: error
          });

          return;
        }

        // 5. Clear the input value and show a success message.
        inputEl.current.value = '';
        setMessage('Success! You are now subscribed to our Newsletter.');
          setForm({
          state: 'success'
          // message: `Hooray! You're now on the list.`
        });
      };

    return (
        <div className="border border-black rounded p-6 my-4 w-full dark:border-gray-800 bg-gray-900 dark:bg-blue-opaque">
          <p className="text-lg md:text-xl font-bold text-gray-500 dark:text-gray-100">Subscribe to our Newsletter</p>
          <p className="my-1 text-gray-500 dark:text-gray-200">
            Get emails on psychology, literature, religion & living truthfully.
          </p>
          <form className="relative my-4" onSubmit={subscribe}>
          <input
              placeholder="tim@apple.com"
              ref={inputEl}
              aria-label="Email for newsletter"
              required
              type="email"
              autoComplete="email"
              className="px-4 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          <div>
              {message
              ? message
              : ``}
          </div>
          <button
            className="flex items-center justify-center absolute right-1 top-1 px-4 font-bold h-8 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-28"
            type="submit"
          >
            {form.state === 'loading' ? <LoadingSpinner /> : 'Subscribe'}

          </button>

          </form>
    </div>
    )
}

export default EmailCollection;