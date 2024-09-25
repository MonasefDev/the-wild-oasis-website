import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth();
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-2"
            >
              <img
                src={session.user.image}
                alt="User profile image"
                referrerPolicy="no-referrer"
                className="h-8 rounded-full"
              />
              <span className="ml-2">Guest area</span>
            </Link>
          ) : (
            <Link
              href="/api/auth/signin"
              className="hover:text-accent-400 transition-colors"
            >
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
