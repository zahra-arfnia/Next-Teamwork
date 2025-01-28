import { IoLogoGithub } from "react-icons/io";

export default function Footer() {
  return (
    <footer className="footer-container">
      <p className="footer-text">more projects I've worked on!</p>
      <div className="footer-link">
        <IoLogoGithub className="footer-icon" />
        <p className="footer-text">@teamwoek-next on github</p>
      </div>
    </footer>
  );
}
