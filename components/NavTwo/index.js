import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/assets/logoN.png"

const NavTwo = ({ type }) => {

  const navLink = useRef();

  useEffect(() => {

    navLink.current.style.textDecoration = "none"

  }, []);

  return (
    <nav className="d-flex justify-content-between py-3 px-4 border-bottom">
      <div className="">
        <Image src={logo} width="100" />
      </div>
      <div className="link">
        <Link
          ref={navLink}
          href="/login"
          onMouseOut={(e) => (e.target.style.textDecoration = "none")}
          onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
          className=" text-dark fw-bold"
        >
          {type}
        </Link>
      </div>
    </nav>
  );
};

export default NavTwo;
