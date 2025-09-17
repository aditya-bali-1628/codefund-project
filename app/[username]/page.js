// app/[username]/page.jsx (Server Component)
import Paymentpage from '../components/Paymentpage';
import User from '@/models/User';
import connect from '@/db/dbconnect';
import { notFound } from 'next/navigation';

// Optional: SEO Metadata
export function generateMetadata({ params }) {
  const { username } = params; // ✅ directly use params

  return {
    title: `${username} | Get Me a Chai`,
    description: `Support ${username} by sending them a chai and message.`,
  };
}

export default async function UserPage({ params }) {
  const { username } = params;

  await connect();
  const user = await User.findOne({ username });

  if (!user) notFound(); // Redirects to 404 page

  return <Paymentpage username={username} />;
}
