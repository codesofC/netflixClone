import Image from "next/image";
import { useRouter } from "next/router";
import NavTwo from "@/components/NavTwo";
import Footer from "@/components/Footer";
import { imgCard } from "@/pages/api/imgCard";
import { TfiLock } from "react-icons/tfi";
import { FiChevronRight } from 'react-icons/fi';
import { FcLock } from "react-icons/fc"
import logo from "../../../public/assets/logoN.png";

const PaymentPicker = ({ links }) => {

  const navigate = useRouter()

  return (
    <main
      className="row justify-content-center"
      style={{ width: "100%", padding: "0", margin: "0"}}
    >
      <NavTwo type="Sair" />
      <section
        className="col-12 col-sm-8 col-lg-8 col-xl-4 d-flex flex-column gap-3 align-items-center justify-content-center my-5"
        style={{ minHeight: "60vh" }}
      >
        <div className="d-flex flex-column gap-5 align-items-center">
          <span
            className=" d-flex p-2 fs-4 rounded-circle border-danger text-danger"
            style={{ border: "2px solid red" }}
          >
            <TfiLock />
          </span>
          <span style={{ fontSize: "13px" }}>PASSO 3 DE 3</span>
        </div>
        <div className="d-flex flex-column gap-1 px-5">
          <h1 style={{ fontWeight: "700", fontSize: "30px" }}>
            Escolha como você quer pagar
          </h1>
          <p>
            Sua forma de pagamento está criptografada e você pode mudá-la quando
            quiser.
          </p>
          <h2
            className="text-center"
            style={{ fontWeight: "600", fontSize: "18px" }}
          >
            Segurança e tranquilidade.
          </h2>
          <h2
            className="text-center"
            style={{ fontWeight: "600", fontSize: "18px" }}
          >
            Cancele online com facilidade.
          </h2>
          <div className="d-flex flex-column gap-2">
            <div className="d-flex align-items-center justify-content-end" style={{"fontSize": "13px"}}>Criptografia de ponta a ponta <span> <FcLock /> </span> </div>
            <div 
              className="d-flex align-items-center justify-content-between rounded py-3 px-2" 
              role="button" 
              style={{"border": "2px solid #3333"}}
              onClick={() => navigate.push("/signup/creditoption")}
            >
              <div className="d-flex flex-column gap-1">
                <span style={{"fontWeight": "500"}}>Cartão de crédito ou débito</span>
                <div className="d-flex gap-3">
                  {
                    imgCard.map((item, index) => (
                      <div key={index} className="d-flex align-items-center justify-content-center" style={{"width": "40px", "height": "25px", "border": "1px solid #3333", "padding": ".1rem .2rem"}}>
                        <Image src={item} width="100" height="100" style={{"width": "100%", "height": "100%", "objectFit": "contain"}} />
                      </div>
                    ))
                  }
                </div>
              </div>
              <span className="fs-3"> <FiChevronRight /> </span>
            </div>
            <div className="d-flex align-items-center justify-content-between rounded py-3 px-2" role="button" style={{"border": "2px solid #3333"}}>
              <div className="d-flex gap-3">
                <span style={{"fontWeight": "500"}}>Código do cartão pré-pago</span>
                <div className="d-flex align-items-center justify-content-center" style={{"width": "40px", "height": "25px", "border": "1px solid #3333", "padding": ".1rem .2rem"}}>
                        <Image src={logo} width="30" />
                      </div>
              </div>
              <span className="fs-3"> <FiChevronRight /> </span>
            </div>
          </div>
        </div>
      </section>
      <Footer links={links} background={"#f3f3f3"} />
    </main>
  );
};

export default PaymentPicker;

export async function getStaticProps() {
  const links = await import("../../api/links.json");

  return {
    props: {
      links: links.links,
    },
  };
}
