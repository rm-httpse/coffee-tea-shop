'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useUser } from '@/app/context/UserContext';

const LoginPage = () => {
  const router = useRouter();
  const { updateUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Create a form object to send in the request body
      const form = { email, password };

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      if (result.success) {
        alert('Login successful');
        updateUser(result.user); // Update context
        router.push('/account');
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Login failed');
      console.error(error);
    }
  };


  const handleRegisterRedirect = () => {
    router.push('/register'); // Or wherever your register page is
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left: Image */}
      <div className="md:w-1/2 w-full h-64 md:h-auto">
        <img
          src="/images/login-register-side.jpg"
          alt="Product"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right: Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-6 md:p-12 bg-[#F9F9F9]">
        <div className="w-full max-w-md">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Log in to your account</h2>

          <form onSubmit={handleLogin}>
            <label className="block mb-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full border-b border-gray-400 py-2 px-1 bg-transparent focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="block mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full border-b border-gray-400 py-2 px-1 bg-transparent focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <div className="flex justify-end mb-6 text-sm text-gray-600 cursor-pointer hover:text-black">
              <span>Forgotten password?</span>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 font-medium hover:opacity-90 transition"
            >
              Login
            </button>
          </form>

          <div className="mt-8">
            <p className="text-lg font-medium">New to LUVEN.?</p>
            <p className="text-sm text-gray-600 mt-1 mb-4">
              With an account, you can save products, view orders, and checkout faster.
            </p>

            <button
              onClick={handleRegisterRedirect}
              className="w-full border border-black py-3 font-medium hover:bg-black hover:text-white transition flex items-center justify-between px-4"
            >
              Create account <span className="text-xl">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
