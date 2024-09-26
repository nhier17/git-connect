import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const DeveloperCard = ({ user }) => {
  return (
    <div className="rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl duration-300">
      <div className="flex flex-col items-center gap-5 mb-4">
        <Image
          src={user.avatar || '/icons/avatar.jpeg'}
          alt={user.name}
          className="aspect-square rounded-full object-cover"
          width={250}
          height={250}
        />
        <h3 className="text-xl font-semibold text-white-2">{user.name}</h3>
      </div>

      <div className="flex justify-between items-center py-4 gap-2">
        <Link href={`/profile/${user?.userId}`}>
          <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200">
            View Profile
          </Button>
        </Link>
        <Button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition duration-200">
          Connect
        </Button>
      </div>
    </div>
  );
}

export default DeveloperCard;
