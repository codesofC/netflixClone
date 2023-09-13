import Image from "next/image";

const BodySection = ({ body }) => {


  return (
    <div className="container-md" style={{background: "#090626"}}>
      {
        body.map(item => (
          <section key={item.index} className={`section-tv row py-5 mx-4 justify-content-center align-items-center ${item.index < body.length ? "border-bottom border-secondary" : ""}`}>
            <div className="col-12 col-md-6">
              <h1 className="text-white fs-1">{ item.title }</h1>
              <p className="text-white fs-6">
                { item.description }
              </p>
            </div>
            <div className="picture col-12 col-md-6">
              <Image
                src={item.url}
                width='500'
                height='450'
                style={{width: "100%", height: "100%", objectFit: "cover"}}
                alt="picture"
                
              />
            </div>
          </section>
        ))
      }
    </div>
  )
}

export default BodySection