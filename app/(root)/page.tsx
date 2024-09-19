import HeaderBox from '@/components/HeaderBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';

export default async function Home() {
  //get the current user
  const loggedIn = await getLoggedInUser();

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

      {/* get developers posts*/}
      <section>
      developers posts
      </section>

      {/* Footer Section */}
      <footer className="text-center py-8">
        <p className="text-gray-400">&copy; 2024 GitConnect. All rights reserved.</p>
      </footer>
      </div>
    </section>
  );
}
