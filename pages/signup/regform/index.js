import { useRef, useState } from "react";
import { useRouter } from "next/router";
import NavTwo from "@/components/NavTwo";
import Footer from "@/components/Footer";

const RegForm = ({ links }) => {
  const [feedback, setFeedback] = useState("");

  const inputPassword = useRef();

  const navigate = useRouter();

  const passwordHandle = () => {
    if (
      (inputPassword.current.value.length > 0 &&
        inputPassword.current.value.length < 6) ||
      inputPassword.current.value.length > 60
    ) {
      setFeedback("A senha deve ter entre 6 e 60 caracteres.");
    } else {
      setFeedback("");
    }
  };

  const formSubmit = e => {
    e.preventDefault();

    if(inputPassword.current.value.length === 0){
        setFeedback("A senha é obrigatória.")
        return;
    }else if((inputPassword.current.value.length < 6 ||
      inputPassword.current.value.length > 60)){
        return
      }

    navigate.push("/signup/paymentpicker")

  }

  return (
    <main
      className="row justify-content-center"
      style={{ width: "100%", padding: "0", margin: "0" }}
    >
      <NavTwo type="Entrar" />
      <section
        className="col-12 col-sm-8 col-lg-6 col-xl-3 d-flex flex-column gap-3 justify-content-center"
        style={{ height: "60vh" }}
      >
        <div className="px-5">
          <span style={{ fontSize: "14px" }}>PASSO 2 DE 3</span>
        </div>
        <div className="d-flex flex-column gap-1 px-5">
          <h1 style={{ fontWeight: "700", fontSize: "30px" }}>
            Crie uma senha para iniciar sua assinatura
          </h1>
          <p>
            Faltam só mais alguns passos! Nós também detestamos formulários.
          </p>
          <form onSubmit={formSubmit} action="" className="w-100 d-flex flex-column gap-2">
            <div class="form-floating col-8 col-lg-7 w-100 d-flex flex-column">
              <input
                type="email"
                className="form-control bg-transparent"
                id="floatingInput"
                name=""
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInput" className="mx-2">
                Email
              </label>
            </div>
            <div class="form-floating col-8 col-lg-7 w-100 d-flex flex-column gap-1">
              <input
                type="password"
                className="form-control bg-transparent"
                id="floatingInput"
                name=""
                ref={inputPassword}
                onChange={passwordHandle}
              />
              <label htmlFor="floatingInput" className="mx-2">
                Adicione uma senha
              </label>
              <p className="text-danger" style={{ fontSize: "12px" }}>
                {feedback}
              </p>
            </div>
            <button
              type="submit"
              className="btn text-white fs-3"
              style={{ background: "red" }}
            >
              Próximo
            </button>
          </form>
        </div>
      </section>
      <Footer links={links} background={"#f3f3f3"} />
    </main>
  );
};

export default RegForm;

export async function getStaticProps() {
  const links = await import("../../api/links.json");

  return {
    props: {
      links: links.links,
    },
  };
}
