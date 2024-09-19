import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/lib/actions/user.actions";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const loggedIn = await getLoggedInUser();
    
    if(!loggedIn) redirect('/sign-in');

  return (
    <div className="relative flex flex-col">
      <main className="relative flex bg-black-3">
        <Sidebar user={loggedIn} />
        <section className="flex min-h-screen flex-1 flex-col px-4 sm:px-14">
          <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">
            <div className="flex h-16 items-center justify-between md:hidden">
              <Image 
                src="/icons/logo1.svg"
                width={30}
                height={30}
                alt="menu icon"
              />
            </div>
            <div className="flex flex-col md:pb-14">
              {children}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}