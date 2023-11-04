import { useRouter } from "next/router";
import NavTwo from "@/components/NavTwo";
import Footer from "@/components/Footer";
import { AiOutlineCheck } from "react-icons/ai";

const Signup = ({ links }) => {

  const router = useRouter()

  return (
    <main className="row justify-content-center" style={{width: '100%', padding: '0', margin: '0'}}>
      <NavTwo type="Sair" />
      <section className="col-12 col-sm-8 col-lg-6 col-xl-3 d-flex flex-column gap-3 align-items-center justify-content-center my-5" style={{minHeight: '60vh'}}>
        <div className="d-flex flex-column gap-3 align-items-center">
          <span className="px-2 py-1 border-danger rounded-circle fs-5 text-danger" style={{"border": "3px solid red"}}> <AiOutlineCheck /> </span>
          <span style={{fontSize: '12px'}}>PASSO 1 DE 3</span>
        </div>
        <div className="d-flex flex-column gap-3 px-5">
          <h1 className="text-center" style={{fontWeight: '700', fontSize: '30px'}}>Escolha seu plano</h1>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex gap-2">
                <span className="fs-3 text-danger"> <AiOutlineCheck /> </span>
                <span className="fs-5"> Sem compromisso, cancele quando quiser. </span>
            </div>
            <div className="d-flex gap-2">
                <span className="fs-3 text-danger"> <AiOutlineCheck /> </span>
                <span className="fs-5"> Entretenimento sem fim, por um preço baixo. </span>
            </div>
            <div className="d-flex gap-2">
                <span className="fs-3 text-danger"> <AiOutlineCheck /> </span>
                <span className="fs-5"> Divirta-se com a Netflix em todos os seus aparelhos. </span>
            </div>
          </div>
          <button 
            className="btn text-white fs-3" 
            style={{background: 'red'}}
            onClick={() => router.push("/signup/planform")}
          >
            Próximo
          </button>
        </div>
      </section>
      <Footer links={links} background={"#f3f3f3"} />
    </main>
  );
};

export default Signup;

export async function getStaticProps() {
  const links = await import("../api/links.json");

  return {
    props: {
      links: links.links,
    },
  };
}
