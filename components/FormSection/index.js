import { useState } from "react";
import { useRouter } from "next/router";
import { BsChevronRight } from "react-icons/bs";

const FormSection = () => {

  const [email, setEmail] = useState("")
  
  const router = useRouter()

  const handlePage = () => {
      router.push("/signup")
  }

  return (
    <div className="d-flex flex-column gap-2 text-white mt-4">
      <p className="fs-6" style={{ fontWeight: "600" }}>
        Quer assistir? Informe seu email para criar ou reiniciar sua assinatura.
      </p>
      <div className="gap-1 row">
        <div className="form-floating col-12 col-md-7">
          <input
            type="email"
            className="form-control bg-transparent"
            id="floatingInput"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <label htmlFor="floatingInput" className="mx-2">
            Email
          </label>
        </div>
        <div className="button col-8 col-md-4">
          <button
            type="submit"
            className="btn text-white py-2 py-lg-3"
            style={{ background: "red" }}
            onClick={handlePage}
          >
            Vamos lá <BsChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormSection;
