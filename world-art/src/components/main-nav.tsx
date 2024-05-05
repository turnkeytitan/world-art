import Link from "next/link";
function Nav() {
  return (
    <header className="min-h-14 w-full bg-black text-orange-300 flex justify-between items-center px-5 mb-7">
      <p>ARTLOGO</p>
      <nav>
        <ul className="flex gap-6">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/favs">My favorites</Link>
          </li>
        </ul>
      </nav>
      <p>USER</p>
    </header>
  );
}
export default Nav;
