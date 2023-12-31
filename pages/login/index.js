import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import brandImg from "../../public/assets/brand.jpg";
import logoNetflix from "../../public/assets/logoN.png";
import Footer from "@/components/Footer";

export default function Home({ links }) {
  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Generated by create next app" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-black position-relative">
        {/* HEADER BRAND */}
        <div
          className="position-relative"
          style={{ maxHeight: "110vh", overflow: "hidden" }}
        >
          <Image style={{ maxHeight: "110vh" }} src={brandImg} className="" />
          <div
            className="position-absolute top-0 start-0 d-flex flex-column pt-5"
            style={{
              height: "100%",
              width: "100%",
              background: "rgba(0, 0, 0, .7)",
            }}
          >
            <header className="position-absolute top-0 d-flex justify-content-between w-100 align-items-center px-3 py-3 px-lg-5">
              <div style={{ width: "30%" }}>
                <Image width="150" src={logoNetflix} className="logo" />
              </div>
            </header>

            <div className="row mt-5 justify-content-center">
              <div
                className="col-12 col-lg-6 col-xl-4 col-xxl-3 py-5 px-5 d-flex flex-column gap-3"
                style={{ background: "rgba(0, 0, 0, .8)" }}
              >
                <h1 className="text-white fs-2 fw-bold">Entrar</h1>
                <form
                  action=""
                  className="d-flex flex-column gap-5"
                  style={{ color: "#969695" }}
                >
                  <div>
                    <div class="form-floating mb-3">
                      <input
                        type="email"
                        class="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        style={{
                          background: "#333333",
                          border: "1px solid #333333",
                        }}
                      />
                      <label htmlFor="floatingInput">
                        Email ou número de telefone
                      </label>
                    </div>
                    <div class="form-floating">
                      <input
                        type="password"
                        class="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        style={{
                          background: "#333333",
                          border: "1px solid #333333",
                        }}
                      />
                      <label htmlFor="floatingPassword">Senha</label>
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <button
                      type="submit"
                      className="text-white w-100 py-3 fw-semibold"
                      style={{
                        background: "red",
                        border: "none",
                        borderRadius: "5px",
                      }}
                    >
                      Entrar
                    </button>
                    <div
                      className="d-flex justify-content-between"
                      style={{ fontSize: "13px" }}
                    >
                      <div className="d-flex gap-1">
                        <input type="checkbox" value="save" id="save-me" />
                        <label htmlFor="save-me"> Lembre-se de mim </label>
                      </div>
                      <Link
                        href="https://www.netflix.com/LoginHelp"
                        target="_blank"
                        className="text-white"
                      >
                        {" "}
                        Precisa de ajuda?{" "}
                      </Link>
                    </div>
                  </div>
                </form>
                <p style={{ color: "#969695" }} className="my-5">
                  Novo por aqui?{" "}
                  <Link href="/signup/registration" className="text-white">
                    Assine agora
                  </Link>
                </p>
              </div>
            </div>
            <div className="d-flex w-100 justify-content-center position-absolute bottom-0" style={{ background: "rgba(0, 0, 0, .8)" }}>
              <div
                className="col-12 col-lg-8 col-xl-7 col-xxl-6 d-flex flex-column gap-3 py-3 px-4"
                
              >
                <p style={{ color: "#969695" }}>
                  Dúvidas? Ligue{" "}
                  <Link href="" style={{ color: "#969695" }}>
                    0800 591 8942
                  </Link>
                </p>
                <div className="d-flex justify-content-between">
                  <ul className="list-unstyled">
                    <li>
                      <Link
                        href="https://help.netflix.com/support/412"
                        style={{ color: "#969695", fontSize: "13px" }}
                      >
                        Perguntas frequentes
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://help.netflix.com/support/412"
                        style={{ color: "#969695", fontSize: "13px" }}
                      >
                        Preferências de cookies
                      </Link>
                    </li>
                  </ul>
                  <ul className="list-unstyled">
                    <li>
                      <Link
                        href="https://help.netflix.com/"
                        style={{ color: "#969695", fontSize: "13px" }}
                      >
                        Central de Ajuda
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://help.netflix.com/legal/corpinfo"
                        style={{ color: "#969695", fontSize: "13px" }}
                      >
                        Informações corporativas
                      </Link>
                    </li>
                  </ul>
                  <ul className="list-unstyled">
                    <li>
                      <Link
                        href="https://help.netflix.com/legal/termsofuse"
                        style={{ color: "#969695", fontSize: "13px" }}
                      >
                        Termos de Uso
                      </Link>
                    </li>
                  </ul>
                  <ul className="list-unstyled">
                    <li>
                      <Link
                        href="https://help.netflix.com/legal/privacy"
                        style={{ color: "#969695", fontSize: "13px" }}
                      >
                        Privacidade
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <select className="bg-black text-white py-2 px-3" name="language" id="">
                    <option value="portugues">Português</option>
                    <option value="english">English</option>
                    <option value="francais">Français</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const links = await import("../api/links.json");

  return {
    props: {
      links: links.links,
    },
  };
}
