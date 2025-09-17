'use client';

import { fetchuser } from '@/actions/useractions';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { updateprofile } from '@/actions/useractions';

export default function Dashboard() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [hasChecked, setHasChecked] = useState(false);
  useEffect(() => {
    document.title = 'Dashboard | Get Me a Chai';
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    profilePicture: '',
    coverPicture: '',
    razorpayId: '',
    razorpaySecret: '',
  });

  useEffect(() => {
    if (status === 'loading') return;
    setHasChecked(true);

    if (status === 'unauthenticated') {
      router.push('/login');
    } else {
      getdata();
    }
  }, [status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getdata = async () => {
    if (!session?.user?.name) return;

    const u = await fetchuser(session.user.name);
    if (!u) return;

    setFormData({
      name: u.name || '',
      email: u.email || '',
      username: u.username || '',
      profilePicture: u.profilePicture || '',
      coverPicture: u.coverPicture || '',
      razorpayId: u.razorpayId || '',
      razorpaySecret: u.razorpaySecret || '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('User Form Data:', formData);

    update(); // Optional, updates session

    const result = await updateprofile(Object.entries(formData), session.user.name);

    if (result?.error) {
      alert(result.error);
    } else {
      alert("✅ Profile updated successfully!");
    }
  };

  if (!hasChecked || status === 'loading') {
    return <div className="text-white p-10">Loading...</div>;
  }

  if (!session || !session.user) {
    return (
      <div className="text-white p-10">
        <h1 className="text-2xl font-bold">Unable to load user data</h1>
        <p className="mt-2">Please try logging in again.</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-slate-950 flex flex-col">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] z-0" />

      {/* Dashboard Content */}
      <main className="relative z-10 flex-grow flex items-center justify-center pt-16 pb-32 px-4 sm:px-6 text-white">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-[#0f172a] p-4 sm:p-6 rounded-xl border border-gray-700 space-y-4 shadow-lg"
        >
          <h1 className="text-xl sm:text-2xl font-bold text-center">Welcome to your Dashboard</h1>

          <p className="text-center text-blue-400 text-xs sm:text-sm">
            Logged in as:{' '}
            <span className="font-medium">{session.user.email || 'No email'}</span>
          </p>

          {/* Grid Layout for Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Column 1 */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-[#1e293b] border border-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs mb-1">Email</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-[#1e293b] border border-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-[#1e293b] border border-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs mb-1">Profile Picture URL</label>
                <input
                  type="text"
                  name="profilePicture"
                  value={formData.profilePicture}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-[#1e293b] border border-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs mb-1">Cover Picture URL</label>
                <input
                  type="text"
                  name="coverPicture"
                  value={formData.coverPicture}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-[#1e293b] border border-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs mb-1 text-blue-400">Razorpay ID</label>
                <input
                  type="text"
                  name="razorpayId"
                  value={formData.razorpayId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-[#1e293b] border border-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Full width field for secret */}
          <div>
            <label className="block text-xs mb-1 text-blue-400">Razorpay Secret</label>
            <input
              type="text"
              name="razorpaySecret"
              value={formData.razorpaySecret}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-[#1e293b] border border-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors duration-300"
          >
            Save Changes
          </button>
        </form>
      </main>
    </div>
  );
}