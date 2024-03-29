import Image from "next/image"
import Link from "next/link"
import profil from "../../public/assets/icon-profil.jpg"

const Users = ({ handleDisplay }) => {



    return (
        <div className='w-100 d-flex flex-column align-items-center justify-content-center gap-4 px-4' style={{ height: "100vh", background: "#141414" }}>
            <h1 className="text-white user-title">Quem está assistindo?</h1>
            <div className="w-100 d-flex gap-3 align-items-center justify-content-center flex-wrap px-5">
                <div className="d-flex flex-column gap-2 flex-wrap align-items-center browse-user" role="button" onClick={() => handleDisplay(true)}>
                    <div className="profil-browse">
                        <Image src={profil} width={200} height={200} alt="Picture" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <p className="fs-5">
                        Cristooo
                    </p>
                </div>
            </div>
            <div className="px-3 px-md-4 px-lg-5 py-2 mt-5 browse-link">
                <Link href="">Manage Profiles</Link>
            </div>
        </div>
    )
}

export default Users