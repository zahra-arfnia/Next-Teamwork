import "../app/globals.css";
import Image from "next/image";
import Link from "next/link";
import { FaMoon } from "react-icons/fa";

export default function Header() {
  const links = [
    { name: "HOME", path: "/" },
    { name: "QUESTIONS", path: "/questions" },
    { name: "ABOUT", path: "/about" },
  ];

  return (
    <div className="header">
      <div className="linksContainer">
        <Image
          src="/question.jpg"
          width={50}
          height={50}
          alt="Question"
          className="logo"
        />
        {links.map((item) => (
          <Link key={item.name} href={item.path} className="link">
            {item.name}
          </Link>
        ))}
      </div>
      <FaMoon className="icon" />
    </div>
  );
}
