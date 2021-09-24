import React, { useRef, useState } from 'react';
import LoadingSpinner from '../email/LoadingSpinner';
import SuccessMessage from '../email/SuccessMessage';
import ErrorMessage from '../email/ErrorMessage';
import ShareButtons from '../share/share';

const SideBar = ({title, url, imageurl, quote}) => {

    const inputEl = useRef(null);
    const [form, setForm] = useState(false);

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
          setForm({
          state: 'success',
          message: `Success! You are now subscribed to our Newsletter.`
        });
      };

    return (
        <div className="h-62 flex flex-col border border-black rounded p-6 my-4 w-full dark:border-gray-800 bg-gray-900 dark:bg-blue-opaque">
          <div className="m-auto">
            <p className="text-lg text-center lg:text-2xl 2xl:text-2xl font-bold text-gray-300 dark:text-gray-100">Enjoying this essay?</p>
            <p className="text-lg text-left lg:text-lg 2xl:text-2xl text-gray-300 dark:text-gray-100">Subscribe to our Newsletter for similar content on the humanities, virtue & living truthfully.</p>
            <form className="relative my-4" onSubmit={subscribe}>
            <input
                placeholder="email"
                ref={inputEl}
                aria-label="Email for newsletter"
                required
                type="email"
                autoComplete="email"
                className="px-4 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <button
              className="flex items-center justify-center absolute right-1 top-1 px-4 font-bold h-8 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-28"
              type="submit"
            >
              {form.state === 'loading' ? <LoadingSpinner /> : 'Subscribe'}
            </button>

            </form>
            {form.state === 'error' ? (
              <ErrorMessage>{form.message}</ErrorMessage>
            ) : form.state === 'success' ? (
              <SuccessMessage>{form.message}</SuccessMessage>
            ) : (null)}

          </div>
          <div className="m-auto">
            <ShareButtons
              title={title}
              url={url}
              twitterHandle='realmproject'
              tags={['realm']}
              imageurl={imageurl}
              quote={quote}
            />
          </div>
        </div>
    )
}

export default SideBar;