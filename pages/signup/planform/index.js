import { useState } from "react";
import { useRouter } from "next/router";
import NavTwo from "@/components/NavTwo";
import Footer from "@/components/Footer";
import { AiOutlineCheck } from "react-icons/ai";
import { BsDashLg } from "react-icons/bs"

const Planform = ({ links }) => {

    const plans = [{
        type: "Padrão com anuncios",
        price: 18.90,
        qualityVideo: "Ótima",
        resolution: "1080p",
        devices: true,
        download: false
    },
    {
        type: "Básico",
        price: 25.90,
        qualityVideo: "Boa",
        resolution: "720p",
        devices: true,
        download: true
    },
    {
        type: "Padrão",
        price: 39.90,
        qualityVideo: "Ótima",
        resolution: "1080p",
        devices: true,
        download: true
    },
    {
        type: "Premium",
        price: 55.90,
        qualityVideo: "Excepcional",
        resolution: "4K + HDR",
        devices: true,
        download: true
    }]

    const [planChoose, setPlanChoose] = useState(3)

    const router = useRouter()

  return (
    <main className="row justify-content-center gap-5" style={{width: '100%', padding: '0', margin: '0'}}>
      <NavTwo type="Sair" />
      <section className="col-12 col-sm-10 col-lg-7  d-flex flex-column gap-3 align-items-center justify-content-center">
        <div className="d-flex flex-column gap-3 align-items-center">
          <span className="px-2 py-1 border-danger rounded-circle fs-5 text-danger" style={{"border": "3px solid red"}}> <AiOutlineCheck /> </span>
          <span style={{fontSize: '12px'}}>PASSO 1 DE 3</span>
        </div>
        <div className="d-flex flex-column gap-3 px-3">
          <h1 style={{fontWeight: '700', fontSize: '30px'}}>Escolha o melhor plano para você</h1>
          <div className="d-flex flex-column gap-1">
            <div className="d-flex gap-2 align-items-center">
                <span className="fs-4 text-danger"> <AiOutlineCheck /> </span>
                <span className="fs-6"> Assista o quanto quiser. </span>
            </div>
            <div className="d-flex gap-2 align-items-center">
                <span className="fs-4 text-danger"> <AiOutlineCheck /> </span>
                <span className="fs-6"> Recomendações especiais para você. </span>
            </div>
            <div className="d-flex gap-2 align-items-center ">
                <span className="fs-4 text-danger"> <AiOutlineCheck /> </span>
                <span className="fs-6"> Altere ou cancele seu plano quando quiser. </span>
            </div>
          </div>

          <>
            <table className="tablee w-100">
                <tbody>
                <tr>
                    <td></td>
                    {
                        plans.map((item, index) => (
                            <td key={index} className="text-center" onClick={() => setPlanChoose(index)}>
                                <span 
                                    className="text-white d-flex align-items-center justify-content-center plan" 
                                    style={{background: `${planChoose === index ? "rgba(220, 0, 0, .9)" : "rgba(220, 100, 100, .9)"}`, cursor: "default"}}
                                >
                                     {item.type} 
                                </span>
                            </td>
                        ))
                    }
                </tr>
                <tr className="border-active">
                    <td className="">Preço por mês</td>
                    {
                        plans.map((item, index) => (
                            <td key={index} className="text-center" onClick={() => setPlanChoose(index)}>
                                <span style={{color: `${planChoose === index ? "rgba(220, 0, 0, .9)" : "#6d6d6c"}`, fontWeight: 600}}> R${item.price} </span>
                            </td>
                        ))
                    }
                </tr>
                <tr className="border-active">
                    <td>Qualidade de video</td>
                    {
                        plans.map((item, index) => (
                            <td key={index} className="text-center" onClick={() => setPlanChoose(index)}>
                                <span style={{color: `${planChoose === index ? "rgba(220, 0, 0, .9)" : "#6d6d6c"}`, fontWeight: 600}}> {item.qualityVideo} </span>
                            </td>
                        ))
                    }
                </tr>
                <tr className="border-active">
                    <td>Resolução</td>
                    {
                        plans.map((item, index) => (
                            <td key={index} className="text-center" onClick={() => setPlanChoose(index)}>
                                <span  style={{color: `${planChoose === index ? "rgba(220, 0, 0, .9)" : "#6d6d6c"}`, fontWeight: 600}}> {item.resolution} </span>
                            </td>
                        ))
                    }
                </tr>
                <tr className="border-active">
                    <td>Assista na TV, computador, celular or tablet</td>
                    {
                        plans.map((item, index) => (
                            <td key={index} className="text-center" onClick={() => setPlanChoose(index)}>
                                <span style={{color: `${planChoose === index ? "rgba(220, 0, 0, .9)" : "#6d6d6c"}`, fontWeight: 600}}> 
                                    {item.devices ? <AiOutlineCheck /> : <span></span>} 
                                </span>
                            </td>
                        ))
                    }
                </tr>
                <tr>
                    <td>Downloads</td>
                    {
                        plans.map((item, index) => (
                            <td key={index} className="text-center" onClick={() => setPlanChoose(index)}>
                                <span style={{color: `${planChoose === index ? "rgba(220, 0, 0, .9)" : "#6d6d6c"}`, fontWeight: 600}}> 
                                    {item.download ? <AiOutlineCheck /> : 
                                        <span className="" style={{ colo: `${planChoose === index ? "rgba(220, 0, 0, .9)" : "#6d6d6c"}`}}>
                                            <BsDashLg />
                                        </span>} 
                                </span>
                            </td>
                        ))
                    }
                </tr>
                </tbody>
            </table>
          </>

          <button 
            className="btn text-white fs-3 col-6 col-xl-4 mx-auto" 
            style={{background: 'red'}}
            onClick={() => router.push("/signup/registration")}
          >
            Próximo
          </button>
        </div>
      </section>
      <Footer links={links} background={"#f3f3f3"} />
    </main>
  );
};

export default Planform;

export async function getStaticProps() {
  const links = await import("../../api/links.json");

  return {
    props: {
      links: links.links,
    },
  };
}
