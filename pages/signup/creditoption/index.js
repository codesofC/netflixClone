import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import NavTwo from "@/components/NavTwo";
import Footer from "@/components/Footer";
import { imgCard } from "@/pages/api/imgCard";
import { GoCreditCard } from "react-icons/go";

const CreditOption = ({ links }) => {

  const router = useRouter()

  const handlePage = e => {
    e.preventDefault()
    router.push("../browse")
  }

  return (
    <main
      className="row justify-content-center"
      style={{ width: "100%", padding: "0", margin: "0" }}
    >
      <NavTwo type="Sair" />
      <section
        className="col-12 col-sm-8 col-lg-8 col-xl-4 d-flex flex-column gap-3 align-items-center justify-content-center m-5"
        style={{ height: "auto" }}
      >
        <div
          className="d-flex flex-column gap-2 px-5"
          style={{ height: "auto" }}
        >
          <div className="">
            <span style={{ fontSize: "13px" }}>PASSO 3 DE 3</span>
          </div>
          <h1 style={{ fontWeight: "700", fontSize: "30px" }}>
            Informe os dados do seu cartão de crédito ou débito
          </h1>
          <div className="d-flex gap-2">
            {imgCard.map((item, index) => (
              <div
                key={index}
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "40px",
                  height: "25px",
                  border: "1px solid #3333",
                  padding: ".1rem .2rem",
                }}
              >
                <Image
                  src={item}
                  width="40"
                  height="25"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            ))}
          </div>
          <form action="" className="d-flex flex-column gap-4">
            <div
              class="form-floating w-100 d-flex align-items-center justify-content-between"
              style={{ border: "1px solid #3333" }}
            >
              <input
                type="text"
                className="form-control bg-transparent"
                id="floatingInput"
                name=""
                style={{ border: "none" }}
              />
              <label htmlFor="floatingInput" className="mx-2 text-secondary">
                Número do cartão
              </label>
              <span className="fs-2 px-1" style={{ color: "gray" }}>
                <GoCreditCard />
              </span>
            </div>
            <div className="d-flex gap-2">
              <div
                class="form-floating w-100 d-flex align-items-center justify-content-between"
                style={{ border: "1px solid #3333" }}
              >
                <input
                  type="text"
                  className="form-control bg-transparent"
                  id="floatingInput"
                  name=""
                  placeholder="MM/AA"
                  style={{ border: "none" }}
                />
                <label htmlFor="floatingInput" className="mx-2 text-secondary">
                  Data de validade
                </label>
              </div>
              <div
                class="form-floating w-100 d-flex align-items-center justify-content-between px-1"
                style={{ border: "1px solid #3333" }}
              >
                <input
                  type="text"
                  className="form-control bg-transparent"
                  id="floatingInput"
                  name=""
                  style={{ border: "none" }}
                />
                <label htmlFor="floatingInput" className="mx-2 text-secondary">
                  CVV
                </label>
                <span
                  role="button"
                  className="d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    border: "2px solid gray",
                    color: "gray",
                    fontWeight: "700",
                    width: "25px",
                    height: "25px",
                  }}
                >
                  ?
                </span>
              </div>
            </div>
            <div
              class="form-floating w-100 d-flex align-items-center justify-content-between"
              style={{ border: "1px solid #3333" }}
            >
              <input
                type="text"
                className="form-control bg-transparent"
                id="floatingInput"
                name=""
                style={{ border: "none" }}
              />
              <label htmlFor="floatingInput" className="mx-2 text-secondary">
                Nome
              </label>
            </div>
            <div
              class="form-floating w-100 d-flex align-items-center justify-content-between"
              style={{ border: "1px solid #3333" }}
            >
              <input
                type="text"
                className="form-control bg-transparent"
                id="floatingInput"
                name=""
                style={{ border: "none" }}
              />
              <label htmlFor="floatingInput" className="mx-2 text-secondary">
                Sobrenome
              </label>
            </div>
            <div className="d-flex flex-column gap-2">
              <h3 style={{ fontSize: "100%", fontWeight: "bold" }}>
                Escolha sua forma de pagamento preferida:
              </h3>
              <div className="d-flex align-items-center gap-2">
                <input
                  type="radio"
                  name="pagamento"
                  value="credito"
                  id="credito"
                  checked
                />{" "}
                <label htmlFor="credito" style={{ fontWeight: "550" }}>
                  Crédito
                </label>
              </div>
              <div className="d-flex align-items-center gap-2">
                <input
                  type="radio"
                  name="pagamento"
                  value="debito"
                  id="debito"
                />{" "}
                <label htmlFor="debito" style={{ fontWeight: "550" }}>
                  Débito
                </label>
              </div>
            </div>
            <div
              className="d-flex align-items-center justify-content-between px-2 py-3"
              style={{ background: "#f4f4f4", borderRadius: "5px" }}
            >
              <div className="d-flex flex-column gap-1">
                <span style={{ fontWeight: "600" }}>R$55,90/mês</span>
                <span>Premium</span>
              </div>
              <Link href="/signup/planform">Trocar</Link>
            </div>
            <div className="d-flex flex-column gap-3" style={{"fontSize": "14px", "fontWeight": "400", "color": "gray", "fontFamily": "Segoe UI"}}>
              <p>
                Cartões que suportam transações de débito e de crédito poderão
                ser processados de ambas as formas.
              </p>
              <p>
                Ao clicar no botão “Iniciar assinatura” abaixo, você concorda
                com nossos{" "}
                <Link href="https://help.netflix.com/legal/termsofuse">
                  Termos de Uso
                </Link>{" "}
                e com nossa{" "}
                <Link href="https://help.netflix.com/legal/privacy">
                  Declaração de Privacidade
                </Link>{" "}
                , confirma ter mais de 18 anos e aceita que a <span style={{"fontWeight": "600"}}> Netflix renove
                automaticamente sua assinatura e cobre o preço da assinatura
                (atualmente R$55,90/mês) da sua forma de pagamento até você
                cancelar. Você pode cancelar quando quiser para evitar cobranças
                futuras. </span> Para cancelar, acesse a página “Conta” e clique em
                “Cancelar assinatura”.
              </p>
              <button
                type="submit" 
                className="fs-4 text-white py-3" 
                style={{"background": "#f6121d", "border": "none", borderRadius: "5px", "cursor": "default"}}
                onClick={e => handlePage(e)}
                > 
                  Iniciar assinatura
                </button>
            </div>
          </form>
        </div>
      </section>
      <Footer links={links} background={"#f3f3f3"} />
    </main>
  );
};

export default CreditOption;

export async function getStaticProps() {
  const links = await import("../../api/links.json");

  return {
    props: {
      links: links.links,
    },
  };
}
