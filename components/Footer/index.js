import Link from "next/link";

const Footer = ({ links, background }) => {


  const bg = background ? background : ""

  return (
    <footer className={`d-flex flex-column gap-4 mt-5 ${bg ? 'p-3' : ''}`} style={{background: bg}}>
      <p className=" mt-4" style={{color: (bg ? 'black' : 'white')}}>
        Duvidas? Ligue {" "}
        <Link href="#" style={{color: (bg ? 'black' : 'white')}}>
          0800 591 8942
        </Link>
      </p>
      <ul className="list-unstyled row">
        {links.map((item) => (
          <li key={item.index} className={`${bg ? 'col-6 col-lg-3' : 'col-12 col-lg-4 col-md-6'} `}>
            <Link
              href={`/${item.link.replace(" ", "_")}`}
              style={{color: (bg ? 'black' : 'white'), fontSize: '14px', textDecoration: 'none'}}
            >
              {item.link}
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <select
          className={`bg-transparent fs-6 rounded border-${bg ? 'dark' : 'white'} py-2 px-3`}
          style={{color: (bg ? 'black' : 'white')}}
        >
          <option value="1">Português</option>
          <option value="2">English</option>
          <option value="3">Français</option>
        </select>
      </div>
      {!bg &&<p className="text-white" style={{fontSize: "14px"}}>Nextflix Brasil</p>}
    </footer>
  );
};

export default Footer;
