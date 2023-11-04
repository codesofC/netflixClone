import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Users from "@/components/Users";
import Modal from "@/components/Modal";
import logoImg from "../../public/assets/logoN.png";
import profil from "../../public/assets/icon-profil.jpg";
import { BiSearch } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TiArrowSortedDown } from "react-icons/ti";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle, AiOutlineReload, AiOutlineLike } from "react-icons/ai";
import { MdArrowBackIos, MdKeyboardArrowDown } from "react-icons/md";
import { BsPlusLg, BsCheckLg } from 'react-icons/bs';
import { useStore } from "@/zustand/strore";


const Browse = ({ data }) => {

  const [changeNavbar, setChangeNavbar] = useState(false)
  const [slideValue, setSlideValue] = useState([])
  const [display, setDisplay] = useState(false)
  const [displayModal, setDisplayModal] = useState({ displayValue: false, data: {}, similarTitles: [] })
  const [indexBrandImg, setIndexBrandImg] = useState({ i1: 0, i2: 0 })


  const slideRefs = useRef([])

  const videoRef = useRef()

  const router = useRouter()

  let timeOut;

  //My list using zustand
  const { list, addOrRemoveToList } = useStore((state) => state)


  useEffect(() => {
    let arr = new Array(data.length),
      arr2 = new Array(data.length)

    for (let i = 0; i < arr.length; i++) {
      arr[i] = 0;
      arr2[i] = true
    }

    setSlideValue(arr)
    slideRefs.current = []
    const index1 = Math.trunc(Math.random() * data.length)
    const index2 = Math.trunc(Math.random() * data[index1].length)

    setIndexBrandImg({
      i1: index1,
      i2: index2
    })

    window.addEventListener("scroll", changeNavbarFunc)
    return () => {
      clearTimeout(timeOut)
      window.removeEventListener("scroll", changeNavbarFunc)
    }
  }, [])

  useEffect(() => {
    if(display){
      if(displayModal.displayValue){
        videoRef.current.pause()
      }else{
        playFunc()
      }
    }
  }, [displayModal.displayValue, display])

  async function playFunc() {
    try {
      await videoRef.current.play()
    } catch (err) {
      console.log("Error to autoplay video")
    }
  }

  const changeNavbarFunc = () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      setChangeNavbar(true)
    } else {
      setChangeNavbar(false)
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



  const handleSlide = (arg, index, e) => {

    if (arg === "prev") {
      if (slideValue[index] > 0) {
        slideValue[index] -= 100
      }
    }

    if (arg === "next") {
      if ((slideValue[index] !== ((parseInt(data[index].length / 5) * 100) - 100))) {
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

  const toMyList = (id) => {
    const findObject = list.findIndex(obj => obj.jawSummary.id === id)

    return findObject
  }



  return (
    <div className="position-relative h-100" style={{ overflowX: "hidden", background: "rgba(20, 20, 20)" }}>
      {!display ? <Users handleDisplay={handleDisplay} />
        :
        <section>
          <nav className="d-flex justify-content-between px-5 py-4 gap-2 position-fixed w-100 overflow-hidden" style={{ backgroundColor: `${!changeNavbar ? 'transparent' : 'black'}`, top: 0, left: 0, zIndex: 1 }} >
            <div className="d-flex gap-5 p-0 menu position-relative">

              <Image src={logoImg} width="90" alt="Picture" />
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
            <div className="d-flex gap-2 gap-md-3 text-white fs-5">
              <span role="button"> <BiSearch /> </span>
              <span role="button"> <IoMdNotificationsOutline /> </span>
              <div role="button" className="gap-3 profilMenu">
                <div style={{ "width": "25px", "height": "25px" }}>
                  <Image src={profil} with="25" height="25" alt="Profil" style={{ "objectFit": "contain" }} />
                </div>
                <span> <TiArrowSortedDown className="icon" /> </span>
              </div>
            </div>
          </nav>
          <div className="position-relative">
            <div className="position-relative videoTag" style={{ width: "100%" }}>
              {/*<Image src={`${data[indexBrandImg.i1][indexBrandImg.i2].jawSummary.backgroundImage.url}.${data[indexBrandImg.i1][indexBrandImg.i2].jawSummary.backgroundImage.extension}`} width="1200" height="1000" alt="picture" style={{ width: "100%", height: "100%", objectFit: "cover" }} />*/}
              <video autoPlay muted loop width="1000" height="1000" ref={videoRef} poster={`${data[indexBrandImg.i1][indexBrandImg.i2].jawSummary.backgroundImage.url}.${data[indexBrandImg.i1][indexBrandImg.i2].jawSummary.backgroundImage.extension}`} >
                <source src="/vide.mp4" type="video/mp4" />
              </video>
              <div className="d-flex justify-content-between align-items-center position-absolute top-0 description">
                <div className="d-flex flex-column gap-1 text-white px-5 w-lg-50 text-description">
                  <span style={{ fontSize: "14px" }}>{data[indexBrandImg.i1][indexBrandImg.i2].jawSummary.type.toUpperCase()}</span>
                  <span className="fs-1" style={{ fontWeight: "600" }}>{data[indexBrandImg.i1][indexBrandImg.i2].jawSummary.title}</span>
                  <p className="col-12 col-md-9 col-lg-6 col-xl-4">
                    {data[indexBrandImg.i1][indexBrandImg.i2].jawSummary.synopsis}
                  </p>
                  <p className="d-flex gap-5 mt-4">
                    <span role="button" className="bg-white d-flex align-items-center gap-2 text-black px-2 px-md-4 py-1 rounded" style={{ fontSize: "14px" }} onClick={() => router.push(`/watch/${data[indexBrandImg.i1][indexBrandImg.i2].jawSummary.id}`)}> <FaPlay /> Play </span>
                    <span role="button" className="bg-dark d-flex align-items-center gap-2 text-white rounded px-2 px-md-4 py-1" style={{ fontSize: "14px" }} onClick={() => handleModal(data[indexBrandImg.i1][indexBrandImg.i2], data[indexBrandImg.i1])}> <AiOutlineInfoCircle /> More infos </span>
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




            <div className="position-relative pb-5">
              <div className="position-relative d-flex flex-column w-100 gap-5 pt-3 pb-5 grand-container">


                {data && data.map((element, index) => (

                  <div className="w-100 position-relative containerSlide" key={index}>
                    <h1 className="fs-4 fw-bold text-white px-4"> Action movies and series </h1>
                    <div className="position-relative">

                      <div
                        className="d-flex align-items-center gap-3 position-relative"
                        ref={addToRefs}
                        style={{ transition: "transform .3s ease-in-out", padding: "0 5%" }}
                      >
                        {
                          element.map((item) => (
                            <div
                              key={item.jawSummary.id}
                              className={`position-relative col-5 col-sm-4 col-md-3 col-lg-2 text-danger d-flex flex-column element`}
                            >
                              <div className="w-100 h-100 element-container position-relative">
                                <div
                                  role="button"
                                  className="d-flex align-items-center justify-content-center position-relative w-100 h-100 overflow-hidden element-img"
                                  onClick={() => handleModal(item, element)}
                                >
                                  <Image src={`${item.jawSummary.backgroundImage?.url}.${item.jawSummary.backgroundImage?.extension}`} alt="Picture" property="false" width={`${item.jawSummary.backgroundImage?.width}`} height={`${item.jawSummary.backgroundImage?.height}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                  <div className="position-absolute px-1" style={{ width: "100%", height: "100%", top: "0", background: "rgba(0, 0, 0, .5)" }}>
                                    {item.jawSummary.logoImage && <Image src={`${item.jawSummary?.logoImage?.url}.${item.jawSummary?.logoImage?.extension}`} alt="Picture" property="false" width={`${item.jawSummary?.logoImage?.width}`} height={`${item.jawSummary?.logoImage?.height}`} style={{ width: "100%", height: "100%", objectFit: "contain" }} />}
                                  </div>
                                </div>
                                <div className=" position-absolute w-100 py-2 flex-column gap-4 element-infos">
                                  <div className="d-flex justify-content-between align-items-center px-1 icon-element">
                                    <div className="d-flex align-items-center gap-1 gap-md-2">
                                      <span
                                        role="button"
                                        className="p-1 bg-white rounded-circle text-black d-flex align-items-center justify-content-center"
                                        onClick={() => router.push(`/watch/${item.jawSummary.id}`)}
                                      >
                                        <FaPlay />
                                      </span>
                                      <span
                                        role="button"
                                        className="p-1 border border-white rounded-circle text-white d-flex align-items-center justify-content-center"
                                        onClick={() => addOrRemoveToList(item)}
                                      > { toMyList(item.jawSummary.id) !== -1 ? <BsCheckLg /> : <BsPlusLg />} </span>
                                      <span role="button" className="p-1 border border-white rounded-circle text-white d-flex align-items-center justify-content-center"> <AiOutlineLike /> </span>
                                    </div>
                                    <span role="button" className="p-1 border border-white rounded-circle text-white d-flex align-items-center justify-content-center" onClick={() => handleModal(item, element)}> <MdKeyboardArrowDown /> </span>
                                  </div>
                                  <div className="d-flex align-items-center gap-3 px-1">
                                    <span className="p-1 bg-danger text-white rounded" style={{ fontSize: "10px" }}> A14</span>
                                    {
                                      item.jawSummary.type === 'show' ? <span style={{ color: "#969695" }} className="movieOrSerie">
                                        {item.jawSummary?.episodeCount ? item.jawSummary?.episodeCount : 'x'} episodes
                                      </span> : (item.jawSummary.type === 'movie' ? <span style={{ color: "#969695" }} className='movieOrSerie'>
                                        {Math.trunc(item.jawSummary.runtime / 3600)} h {Math.trunc((item.jawSummary.runtime % 3600) / 60)} min
                                      </span> : '')
                                    }
                                  </div>
                                  <div className="d-flex align-items-center flex-wrap gap-2">
                                    {
                                      item.jawSummary.genres.map(genre => (
                                        <div className="d-flex align-items-center justify-content-center gap-1">
                                          <span key={genre.id} className="text-white text-gender">
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

                      {<div
                        role="button"
                        className={`position-absolute start-0 top-0 justify-content-center align-items-center px-1 px-md-2 text-white buttonNextPrev`}
                        onClick={() => handleSlide("prev", index)}
                      >
                        <MdArrowBackIos />
                      </div>}
                      {<div
                        role="button"
                        className={`position-absolute top-0 end-0 justify-content-center align-items-center px-1 px-md-2 text-white buttonNextPrev`}
                        onClick={(e) => handleSlide("next", index, e)}
                      >
                        <MdArrowBackIos style={{ transform: "rotate(180deg)" }} />
                      </div>}

                    </div>
                  </div>
                ))
                }

                { /* Add my list container */}
                {
                  list.length > 0 && (<div className="w-100 px-2 position-relative containerSlide">
                    <h1 className="fs-4 fw-bold text-white px-2"> My List </h1>
                    <div
                      className="d-flex align-items-center gap-3 position-relative"
                      ref={addToRefs}
                      style={{ transition: "transform .3s ease-in-out", padding: "0 5%" }}
                    >
                      {
                        list.map((item) => (
                          <div
                            key={item.jawSummary.id}
                            className={`position-relative col-4 col-md-3 col-lg-2 text-danger d-flex flex-column element`}
                          >
                            <div className="w-100 h-100 element-container position-relative">
                              <div
                                role="button"
                                className="d-flex align-items-center justify-content-center position-relative w-100 h-100 overflow-hidden element-img"
                                onClick={() => handleModal(item, data[0])}
                              >
                                <Image src={`${item.jawSummary.backgroundImage?.url}.${item.jawSummary.backgroundImage?.extension}`} alt="Picture" property="false" width={`${item.jawSummary.backgroundImage?.width}`} height={`${item.jawSummary.backgroundImage?.height}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                <div className="position-absolute px-1" style={{ width: "100%", height: "100%", top: "0", background: "rgba(0, 0, 0, .5)" }}>
                                  {item.jawSummary.logoImage && <Image src={`${item.jawSummary?.logoImage?.url}.${item.jawSummary?.logoImage?.extension}`} alt="Picture" property="false" width={`${item.jawSummary?.logoImage?.width}`} height={`${item.jawSummary?.logoImage?.height}`} style={{ width: "100%", height: "100%", objectFit: "contain" }} />}
                                </div>
                              </div>
                              <div className=" position-absolute w-100 px-2 py-2 flex-column gap-4 element-infos">
                                <div className="d-flex justify-content-between align-items-center px-1 icon-elemeeent">
                                  <div className="d-flex align-items-center gap-1 gap-md-2">
                                    <span role="button" className="p-1 bg-white rounded-circle text-black d-flex align-items-center justify-content-center" onClick={() => router.push(`/watch/${item.jawSummary.id}`)}> <FaPlay /> </span>
                                    <span
                                      role="button"
                                      className="p-1 border border-white rounded-circle text-white d-flex align-items-center justify-content-center"
                                      onClick={() => addOrRemoveToList(item)}
                                    > { toMyList(item.jawSummary.id) !== -1 ? <BsCheckLg /> : <BsPlusLg /> } </span>
                                    <span role="button" className="p-1 border border-white rounded-circle text-white d-flex align-items-center justify-content-center"> <AiOutlineLike /> </span>
                                  </div>
                                  <span role="button" className="p-1 border border-white rounded-circle text-white d-flex align-items-center justify-content-center"> <MdKeyboardArrowDown /> </span>
                                </div>
                                <div className="d-flex align-items-center gap-3 px-1">
                                  <span className="p-1 bg-danger text-white rounded" style={{ fontSize: "12px" }}> A14</span>
                                  {
                                    item.jawSummary.type === 'show' ? <span style={{ color: "#969695" }} className="movieOrSerie">
                                      {item.jawSummary?.episodeCount ? item.jawSummary?.episodeCount : 'x'} episodes
                                    </span> : (item.jawSummary.type === 'movie' ? <span style={{ color: "#969695" }} className='movieOrSerie'>
                                      {Math.trunc(item.jawSummary.runtime / 3600)} h {Math.trunc((item.jawSummary.runtime % 3600) / 60)} min
                                    </span> : '')
                                  }
                                </div>
                                <div className="d-flex align-items-center flex-wrap gap-2">
                                  {
                                    item.jawSummary.genres.map(genre => (
                                      <div className="d-flex align-items-center justify-content-center gap-1">
                                        <span key={genre.id} className="text-white text-gender">
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
                  </div>)
                }

              </div>
            </div>
          </div>
        </section>}
      {displayModal.displayValue && <Modal dataC={displayModal.data} similarTitles={displayModal.similarTitles} setDisplayValue={setDisplayModal} toMyList={toMyList} />
      }
    </div>
  );
};

export default Browse;

export async function getStaticProps() {

  const data = await import("../api/fake.json")
  let dataApi = []

  for (let i = 0; i < 1; i++) {
    dataApi.push(data.titles)
  }


  return {
    props: {
      data: dataApi
    },
  };
}
