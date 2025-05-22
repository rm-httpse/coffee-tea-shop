'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, logout } from '@/app/utils/auth';
import { GoChevronRight } from 'react-icons/go';

const AccountPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const current = getCurrentUser();
    if (!current) router.push('/login');
    else setUser(current);
  }, []);

  const handleEditInformation = async () => {
    const updatedData = {
      firstname: prompt("Enter your new first name", user.firstname),
      lastname: prompt("Enter your new last name", user.lastname),
      email: prompt("Enter your new email", user.email)
    };

    try {
      const response = await fetch('/api/update-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id, updatedData })
      });

      const result = await response.json();
      if (result.success) {
        alert('User information updated successfully');
        setUser(result.user); // Update local state
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Update failed');
      console.error(error);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;

    try {
      const response = await fetch('/api/delete-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id })
      });

      const result = await response.json();
      if (result.success) {
        alert('Account deleted successfully');
        logout(); // Clear session and context
        router.push('/');
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Delete failed');
      console.error(error);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 p-4">
      {/* Left Sidebar */}
      <div className="md:w-1/4 w-full bg-white shadow-lg p-6 mt-20">
        <p className="font-bold text-2xl mb-6 md:text-xl">Account</p>
        <nav>
          <ul className="space-y-4">
            <li className="flex justify-between items-center text-lg font-medium cursor-pointer hover:text-gray-800">
              Account Settings <GoChevronRight />
            </li>
            <li className="flex justify-between items-center text-lg font-medium cursor-pointer hover:text-gray-800">
              Order history <GoChevronRight />
            </li>
            <li className="flex justify-between items-center text-lg font-medium cursor-pointer hover:text-gray-800">
              Buy again <GoChevronRight />
            </li>
            <li className="flex justify-between items-center text-lg font-medium cursor-pointer hover:text-gray-800">
              Address book <GoChevronRight />
            </li>
            <li className="flex justify-between items-center text-lg font-medium cursor-pointer hover:text-gray-800">
              Reviews <GoChevronRight />
            </li>
            <li className="flex justify-between items-center text-lg font-medium cursor-pointer hover:text-gray-800">
              Wish list <GoChevronRight />
            </li>
            <li className="flex justify-between items-center text-lg font-medium cursor-pointer hover:text-gray-800">
              My Influencer <GoChevronRight />
            </li>
          </ul>
        </nav>
        <div className="mt-8">
          <p className="font-bold text-2xl mb-6 md:text-xl">Family Rewards Program</p>
          <nav>
            <ul className="space-y-4">
              <li className="flex justify-between items-center text-lg font-medium cursor-pointer hover:text-gray-800">
                Summary <GoChevronRight />
              </li>
              <li className="flex justify-between items-center text-lg font-medium cursor-pointer hover:text-gray-800">
                Reward Overview <GoChevronRight />
              </li>
              <li className="flex justify-between items-center text-lg font-medium cursor-pointer hover:text-gray-800">
                Recommend to a friend <GoChevronRight />
              </li>
              <li className="flex justify-between items-center text-lg font-medium cursor-pointer hover:text-gray-800">
                FAQ <GoChevronRight />
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-8">
          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
          >
            Log out
          </button>
        </div>
      </div>

      {/* Right Content */}
      <div className="md:w-3/4 w-full bg-white shadow-lg p-6 ml-0 md:ml-4 mt-20 md:mt-20">
        <h2 className="text-2xl font-bold mb-4">MY ACCOUNT</h2>

        {/* Membership Info */}
        <div className="flex items-center justify-between bg-gray-50 p-4 mb-6 shadow-md mt-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Hello {user.firstname} {user.lastname}</h3>
            <p className="text-sm text-gray-600">Member since: {user.registerdate}</p>
            <button className="bg-black text-white py-2 px-4 mt-2">My Rewards</button>
          </div>
          <div className="text-center p-4 bg-gray-200">
            <p className="text-3xl font-bold">{user.points}</p>
            <p className="text-sm">points</p>
            <p className="text-xs text-gray-600">*Points expire two years after earning them.</p>
          </div>
        </div>

        {/* Account Information */}
        <div className="mt-8 ml-4">
          <h3 className="text-xl font-bold mb-4">ACCOUNT INFORMATION</h3>

          <div className="space-y-2">
            <p className="text-lg font-bold">Name</p>
            <p className="text-gray-700">{user.firstname} {user.lastname}</p>
            <p className="text-lg font-bold">Email account</p>
            <p className="text-gray-700">{user.email}</p>
          </div>

          <div className="md:flex space-x-2 space-y-2 items-start mb-4 mt-6">
            <button className="bg-black text-white py-2 px-4 w-60 h-10" onClick={handleEditInformation}>Edit Information</button>
            <button className="border border-black py-2 px-4 w-60 h-10">Change Password</button>
          </div>
          <hr className='text-gray-300' />
        </div>

        {/* Contact preferences */}
        <div className="mt-8 ml-4">
          <h3 className="text-xl font-bold mb-4">Contact preferences</h3>
          <p className='md:text-base text-sm'>The management of preferences below refers to the <a href='/' className='underline'>Privacy Policy</a>.</p>
          <h3 className='font-bold mb-4 mt-2'>Special offers, new products</h3>

          <div className="flex items-center mb-4">
            <input id="email-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="email-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-900">Email</label>
          </div>
          <div className="flex items-center mb-4">
            <input id="sms-calls-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="sms-calls-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-900">SMS and Calls</label>
          </div>
          <div className="flex items-center mb-4">
            <input id="print-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="print-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-900">Print</label>
          </div>
          <div className="flex items-center mb-4">
            <input id="all-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="all-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-900">All of the above</label>
          </div>
          <hr className='text-gray-300' />
        </div>
        {/* Delete Account */}
        <div className="mt-8 ml-4">
          <h3 className='font-bold'>DELETE ACCOUNT</h3>
          <p className='md:text-base text-[10px] text-gray-600 mt-2'>Delete Account</p>
          <div className="md:flex space-x-2 space-y-2 items-start mb-4 mt-6">
            <button className="border border-[#bc403a] text-[#bc403a] py-2 px-4 w-60 h-10 font-bold" onClick={handleDeleteAccount}>DELETE ACCOUNT</button>

          </div>
          <hr className='text-gray-300' />
        </div>

        {/* Delete Account */}
        <div className="mt-8 ml-4">
          <h3 className='font-bold'>UNSUBSCRIBE FROM LUVEN.</h3>
          <p className='md:text-base text-[10px] text-gray-600 mt-2'>We're sad to see you go! Your account and all benefits will be removed. If you change your mind, you're welcome to join the family again at any time.</p>
          <div className="md:flex space-x-2 space-y-2 items-start mb-4 mt-6">
            <button className="border border-[#bc403a] text-[#bc403a] py-2 px-4 w-60 h-10 font-bold ">UNSUBSCRIBE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
