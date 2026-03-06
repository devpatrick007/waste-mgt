import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log("session on home:", session) // add this

  if (!session) {
    redirect('/login');
  }

  redirect('/main/dashboard'); // or wherever logged-in users should go
}