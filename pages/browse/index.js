import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Users from "@/components/Users";
import Modal from "@/components/Modal";
import logoImg from "../../public/assets/logoN.png";
import brandImg from "../../public/assets/myname.jpg"
import profil from "../../public/assets/witcher.jpg";
import { BiSearch } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TiArrowSortedDown } from "react-icons/ti";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle, AiOutlineReload, AiOutlineLike } from "react-icons/ai";
import { MdArrowBackIos, MdKeyboardArrowDown } from "react-icons/md";
import { BsPlusLg } from 'react-icons/bs';


const Browse = () => {

  const fakeArray = [0, 0, 0, 0, 0]
  const [data, setData] = useState([])
  const [slideValue, setSlideValue] = useState([])
  const [display, setDisplay] = useState(false)
  const [displayModal, setDisplayModal] = useState({ displayValue: false, data: {}, similarTitles: [] })

  const slideRefs = useRef([])




  const changeBgNavbar = () => {
    setBgNavbar(false)
  }



  useEffect(() => {

    getDataNetflix()

  }, [])

  useEffect(() => {
    let arr = new Array(data.length),
      arr2 = new Array(data.length)

    for (let i = 0; i < arr.length; i++) {
      arr[i] = 0;
      arr2[i] = false
    }

    setSlideValue(arr)
    slideRefs.current = []
  }, [data])


  async function getDataNetflix() {

    if (localStorage.getItem('dataNetflix')) {
      setData(JSON.parse(localStorage.getItem('dataNetflix')))
    } else {

      /*===================== Options request axios ======================*/
      const options = {
        method: 'GET',
        url: 'https://netflix54.p.rapidapi.com/search/',
        params: {
          query: 'action',
          offset: '0',
          limit_titles: '50',
          limit_suggestions: '20',
          lang: 'en'
        },
        headers: {
          'X-RapidAPI-Key': '5257834396msheeafefe006a2c5bp12a68ejsnd4b10c39547e',
          'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
        }
      };

      try {
        const response = axios.request(options);
        const dataApp = (await response).data
        localStorage.setItem("dataNetflix", JSON.stringify(dataApp))
        setData(dataApp)

      } catch (error) {
        console.error(error);
      }

    }
  }

  const addToRefs = e => {
    if (e && !slideRefs.current.includes(e)) {
      slideRefs.current.push(e)
    }
  }

  const handleDisplay = arg => {
    setDisplay(arg)
  }



  const handleSlide = (arg, index) => {

    if (arg === "prev") {
      if (slideValue[index] > 0) {
        slideValue[index] -= 100
      }
    }

    if (arg === "next") {
      if (slideValue[index] !== (data.titles.length * 100 / 5)) {
        slideValue[index] += 100
      }
    }
    slideRefs.current[index].style.transform = "translateX(-" + slideValue[index] + "%)";
  }

  const handleModal = (arg, element) => {
    setDisplayModal(prevState => {
      return {
        displayValue: true,
        data: arg,
        similarTitles: element
      }
    })
  }




  return (
    <main className="position-relative" style={{ overflowX: 'hidden' }}>
      {!display ? <Users handleDisplay={handleDisplay} />
        :
        <section>
          <nav className="d-flex justify-content-between px-5 py-4 fixed-top" style={{ backgroundColor: 'transparent', border: "none" }} >
            <div className="d-flex gap-5 p-0 menu position-relative">

              <Image src={logoImg} width="90" alt="Logo" />
              <div className="menu-small">
                <span className="menu-small-device">Browse</span>
                <ul className="align-items-center list-unstyled gap-3">
                  <li>
                    <Link href="" className="text-white decoration" style={{ fontSize: "14px" }}> Home </Link>
                  </li>
                  <li>
                    <Link href="" className="text-white decoration" style={{ fontSize: "14px" }}> Series </Link>
                  </li>
                  <li>
                    <Link href="" className="text-white decoration" style={{ fontSize: "14px" }}> Movies </Link>
                  </li>
                  <li>
                    <Link href="" className="text-white decoration" style={{ fontSize: "14px" }}>Most watched new releases</Link>
                  </li>
                  <li>
                    <Link href="" className="text-white decoration" style={{ fontSize: "14px" }}>My list</Link>
                  </li>
                  <li>
                    <Link href="" className="text-white decoration" style={{ fontSize: "14px" }}>Explore by language</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="d-flex gap-3 text-white fs-4">
              <span role="button"> <BiSearch /> </span>
              <span role="button"> <IoMdNotificationsOutline /> </span>
              <div role="button" className="d-flex gap-3 profilMenu">
                <div style={{ "width": "25px", "height": "25px" }}>
                  <Image src={profil} with="25" height="25" alt="Profil" style={{ "objectFit": "contain" }} />
                </div>
                <span> <TiArrowSortedDown className="icon" /> </span>
              </div>
            </div>
          </nav>
          <div className="position-relative">
            <div className="position-relative" style={{ width: "100%", height: "100vh" }}>
              <Image src={`${data.titles[10].jawSummary.backgroundImage.url}.${data.titles[10].jawSummary.backgroundImage.extension}`} width="900" height="900" alt="picture" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div className="d-flex justify-content-between align-items-center position-absolute top-0" style={{ width: "100%", height: "100%", background: "rgba(0, 0, 0, .5)" }}>
                <div className="d-flex flex-column gap-2 text-white px-5 w-lg-50">
                  <span style={{ fontSize: "14px" }}>SÉRIE</span>
                  <span className="fs-1" style={{ fontWeight: "600" }}>MY NAME</span>
                  <p className="fs-6 col-12 col-md-9 col-lg-6 col-xl-4">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Sit aperiam alias asperiores illo vel illum ullam recusandae unde atque
                    nesciunt consequatur, modi delectus dolorem temporibus.
                  </p>
                  <p className="d-flex gap-5 mt-4">
                    <span role="button" className="bg-white text-black px-4 py-1 rounded" style={{ fontSize: "15px" }}> <FaPlay /> Play </span>
                    <span role="button" className="bg-dark text-white rounded px-4 py-1" style={{ fontSize: "15px" }}> <AiOutlineInfoCircle /> More infos </span>
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-center gap-2 gap-md-3 text-white fs-6">
                  <span role="button" className=" d-flex border rounded-circle p-2"> <AiOutlineReload /> </span>
                  <p className="d-flex gap-2 gap-md-3 bg-dark pe-2 pe-md-5">
                    <span className="bg-white" style={{ width: "5px" }}></span>
                    <span className="d-flex align-items-center justify-content-center py-1 px-1 px-md-2 rounded bg-danger" style={{ fontSize: "17px", fontWeight: "600" }}>16</span>
                  </p>
                </div>
              </div>
            </div>




            <div className="position-relative">
              <div className="position-absolute start-0 d-flex flex-column w-100 gap-5" style={{ "top": "-10rem", background: "linear-gradient(transparent 5%, rgba(20, 20, 20, 1) 7%)" }}>

                {fakeArray.map((element, index) => (
                  <div className="w-100  px-2 position-relative containerSlide" key={index}>
                    <div
                      className="d-flex align-items-center gap-3 position-relative"
                      ref={addToRefs}
                      style={{ transition: "transform .3s ease-in-out", padding: "0 5%" }}
                    >
                      {
                        data.titles.map((item) => (
                          item.jawSummary.backgroundImage.url &&
                          <div
                            key={item.summary.id}
                            role="button"
                            className={`position-relative col-4 col-md-3 col-lg-2 text-danger d-flex flex-column element`}
                            onClick={() => handleModal(item, data.titles)}
                          >
                            <div className="w-100 h-100 element-container position-relative">
                              <div className="d-flex align-items-center justify-content-center position-relative w-100 h-100 overflow-hidden element-img">
                                {<Image src={`${item.jawSummary.backgroundImage.url}.${item.jawSummary.backgroundImage.extension}`} alt="Picture" property="false" width={`${item.jawSummary.backgroundImage.width}`} height={`${item.jawSummary.backgroundImage.height}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                                {<div className="position-absolute px-1" style={{ width: "100%", height: "100%", bottom: "1rem", background: "rgba(0, 0, 0, .5)" }}>
                                  {item.jawSummary.logoImage && <Image src={`${item.jawSummary.logoImage.url}.${item.jawSummary.backgroundImage.extension}`} alt="Picture" property="false" width={`${item.jawSummary.logoImage.width}`} height={`${item.jawSummary.logoImage.height}`} style={{ width: "100%", objectFit: "contain" }} />}
                                </div>}
                              </div>
                              <div className=" position-absolute w-100 px-2 py-2 flex-column gap-4 element-infos">
                                <div className="d-flex justify-content-between align-items-center px-1 fs-5">
                                  <div className="d-flex align-items-center gap-1 gap-md-2">
                                    <span role="button" className="p-1 bg-white rounded-circle text-black d-flex align-items-center justify-content-center"> <FaPlay /> </span>
                                    <span role="button" className="p-1 border border-white rounded-circle text-white d-flex align-items-center justify-content-center"> <BsPlusLg /> </span>
                                    <span role="button" className="p-1 border border-white rounded-circle text-white d-flex align-items-center justify-content-center"> <AiOutlineLike /> </span>
                                  </div>
                                  <span role="button" className="p-1 border border-white rounded-circle text-white d-flex align-items-center justify-content-center"> <MdKeyboardArrowDown /> </span>
                                </div>
                                <div className="d-flex align-items-center gap-3 px-1">
                                  <span className="p-1 bg-danger text-white rounded" style={{ fontSize: "12px" }}> A14</span>
                                  {
                                    item.jawSummary.type === 'show' ? <span style={{ color: "#969695" }} className="movieOrSerie">
                                      {item.episodeCount} episodes
                                    </span> : (item.jawSummary.type === 'movie' ? <span style={{ color: "#969695" }} className='movieOrSerie'>
                                      {Math.trunc(item.jawSummary.runtime / 3600)} h {Math.trunc((item.jawSummary.runtime % 3600) / 60)} min
                                    </span> : '')
                                  }
                                </div>
                                <div className="d-flex align-items-center flex-wrap gap-2">
                                  {
                                    item.jawSummary.genres.map(genre => (
                                      <div className="d-flex align-items-center justify-content-center gap-1">
                                        <span key={genre.id} className="text-white" style={{ fontSize: "13px" }}>
                                          {genre.name}
                                        </span>
                                        {
                                          genre.id !== item.jawSummary.genres[item.jawSummary.genres.length - 1].id ? (
                                            <span className="rounded-circle" style={{ width: "5px", height: "5px", background: "gray" }}></span>
                                          ) : ''
                                        }
                                      </div>
                                    ))
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>

                    {(slideValue[index] !== 0) && <div
                      role="button"
                      className={`position-absolute start-0 top-0 justify-content-center align-items-center px-1 px-md-2 text-white buttonNextPrev`}
                      style={{ background: "rgba(0, 0, 0, .8)", width: "3%", height: "100%", zIndex: "1000" }}
                      onClick={() => handleSlide("prev", index)}
                    >
                      <MdArrowBackIos />
                    </div>}
                    {((slideValue[index] !== ((data.titles.length * 100 / 6) - 100))) && <div
                      role="button"
                      className={`position-absolute top-0 end-0 justify-content-center align-items-center px-1 px-md-2 text-white buttonNextPrev`}
                      style={{ background: "rgba(0, 0, 0, .8)", width: "3%", height: "100%", zIndex: "1000" }}
                      onClick={() => handleSlide("next", index)}
                    >
                      <MdArrowBackIos style={{ transform: "rotate(180deg)" }} />
                    </div>}
                  </div>
                ))
                }
              </div>
            </div>
          </div>
        </section>}
      {displayModal.displayValue && <Modal dataC={displayModal.data} similarTitles={displayModal.similarTitles} setDisplayValue={setDisplayModal} />
      }
    </main>
  );
};

export default Browse;


