export const dynamic = 'force-dynamic';


import HeaderBox from '@/components/HeaderBox';
import DeveloperCard from '@/components/DeveloperCard';
import { getLoggedInUser, getUsers } from '@/lib/actions/user.actions';

export default async function Home() {
  //get the current user
  const loggedIn = await getLoggedInUser();
  console.log('logged',loggedIn);

  //all the users
  const users =  await getUsers();

  return (
    <section className="home">
      <div className="home-content">
      <header className="home-header">
        <HeaderBox
        type="greeting"
        title="Welcome to GitConnect"
        subtext="Discover and connect with talented developers across the globe."
        user={loggedIn?.name || 'Guest'}
        />
      </header>

      <div className="user_grid">
      {users?.length > 0 ? (
            users.map((user) => (
              <DeveloperCard key={user.userId} user={user} />
            ))
          ) : (
            <p className="text-gray-400">No developers found.</p>
          )}
        </div>

      <footer className="text-center py-8">
        <p className="text-gray-400">&copy; 2024 GitConnect. All rights reserved.</p>
      </footer>
      </div>
    </section>
  );
}
