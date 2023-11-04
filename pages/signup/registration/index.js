import Image from "next/image";
import { useRouter } from "next/router";
import NavTwo from "@/components/NavTwo";
import Footer from "@/components/Footer";
import devicesImg from "../../../public/assets/Devices.png";

const Registration = ({ links }) => {

  const router = useRouter()
  
  return (
    <main className="row justify-content-center" style={{width: '100%', padding: '0', margin: '0'}}>
      <NavTwo type="Entrar" />
      <section className="col-12 col-sm-8 col-lg-6 col-xl-3 d-flex flex-column gap-3 align-items-center justify-content-center my-5" style={{minHeight: '60vh'}}>
        <div className="d-flex flex-column gap-5">
          <Image src={devicesImg} width="300" alt="devices" />
          <span style={{fontSize: '14px'}}>PASSO 2 DE 3</span>
        </div>
        <div className="d-flex flex-column gap-1 px-5 text-center">
          <h1 style={{fontWeight: '700', fontSize: '30px'}}>Termine de configurar sua conta</h1>
          <p>
            A Netflix é personalizada para você. Crie uma senha para assistir em
            qualquer aparelho quando quiser.
          </p>
          <button 
            className="btn text-white fs-3" 
            style={{background: 'red'}}
            onClick={() => router.push("/signup/regform")}
          >
            Próximo
          </button>
        </div>
      </section>
      <Footer links={links} background={"#f3f3f3"} />
    </main>
  );
};

export default Registration;

export async function getStaticProps() {
  const links = await import("../../api/links.json");

  return {
    props: {
      links: links.links,
    },
  };
}
