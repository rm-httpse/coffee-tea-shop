'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useUser } from '@/app/context/UserContext';

const RegisterPage = () => {
  const router = useRouter();
  const { updateUser } = useUser();
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      if (result.success) {
        alert('User registered successfully');
        updateUser(form); // Update context
        router.push('/account');
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Registration failed');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-1/2 w-full h-64 md:h-auto">
        <img
          src="/images/login-register-side.jpg"
          alt="Product"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="md:w-1/2 w-full flex items-center justify-center p-6 md:p-12 bg-[#F9F9F9]">
        <div className="w-full max-w-md">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Create your account</h2>

          <form onSubmit={handleRegister}>
            <label className="block mb-4">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                className="w-full border-b border-gray-400 py-2 px-1 bg-transparent focus:outline-none"
                value={form.firstname}
                onChange={handleChange}
              />
            </label>

            <label className="block mb-4">
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                className="w-full border-b border-gray-400 py-2 px-1 bg-transparent focus:outline-none"
                value={form.lastname}
                onChange={handleChange}
              />
            </label>

            <label className="block mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full border-b border-gray-400 py-2 px-1 bg-transparent focus:outline-none"
                value={form.email}
                onChange={handleChange}
              />
            </label>

            <label className="block mb-6">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full border-b border-gray-400 py-2 px-1 bg-transparent focus:outline-none"
                value={form.password}
                onChange={handleChange}
              />
            </label>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 font-medium hover:opacity-90 transition"
            >
              Create Account
            </button>
          </form>
          <div className="mt-8">
            <p className="text-lg font-medium">Already have an account?</p>
            <p className="text-sm text-gray-600 mt-1 mb-4">
              Log in to view your orders, save products and enjoy a faster checkout experience.
            </p>

            <button
              onClick={() => router.push('/login')}
              className="w-full border border-black py-3 font-medium hover:bg-black hover:text-white transition flex items-center justify-between px-4"
            >
              Back to Login <span className="text-xl">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
