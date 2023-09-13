import { useState } from 'react';
import Image from 'next/image'
import { FaPlay } from "react-icons/fa";
import { AiOutlineLike, AiOutlineClose } from "react-icons/ai";
import { BsPlusLg } from 'react-icons/bs';
import { RxSpeakerLoud } from "react-icons/rx"

const Modal = ({ dataC, setDisplayValue, similarTitles }) => {

    const [hoverSimilarTitle, setHoverSimilarTitle] = useState(false)


    return (
        <div className='w-100 h-100 position-fixed top-0 start-0 d-flex justify-content-center px-2 py-5' style={{ background: "rgba(0, 0, 0, .7)", zIndex: "10000", overflowY: "scroll" }} >
            <div className='d-flex flex-column align-items-center col-11 col-lg-6 justify-content-center position-absolute'>
                <div className='position-relative d-flex align-items-center justify-content-center w-100 overflow-hidden rounded' style={{ maxHeight: "60vh" }}>
                    {<Image src={`${dataC.jawSummary.backgroundImage.url}.${dataC.jawSummary.backgroundImage.extension}`} alt="Picture" width={dataC.jawSummary.backgroundImage.width} height={dataC.jawSummary.backgroundImage.height} style={{ width: "100%", height: "100%", objectFit: "fill" }} />}
                    <div className='position-absolute bottom-0 start-0 w-100 h-100 d-flex flex-column align-items-start justify-content-end gap-3' style={{ background: "linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .9))" }}>
                        <Image src={`${dataC.jawSummary.logoImage.url}.${dataC.jawSummary.backgroundImage.extension}`} alt="Picture" width={dataC.jawSummary.logoImage.width} height={dataC.jawSummary.backgroundImage.height} style={{ width: "100%", height: "auto", objectFit: "cover" }} />
                        <div className='d-flex align-items-center justify-content-between px-3 py-5 w-100'>
                            <div className='d-flex align-items-center gap-3'>
                                <span className='fs-4 d-flex align-items-center gap-3 bg-white px-4 py-1 rounded text-black' role="button"> <FaPlay className='fs-2' /> Play </span>
                                <span className='d-flex fs-3 text-white border p-2 rounded-circle' role="button"> <BsPlusLg /> </span>
                                <span className='d-flex fs-3 text-white border p-2 rounded-circle' role="button"> <AiOutlineLike /> </span>
                            </div>
                            <span className='d-flex fs-4 text-white border p-2 rounded-circle' role="button"> <RxSpeakerLoud /> </span>
                        </div>
                    </div>
                    <span
                        className='d-flex align-items-center justify-content-center position-absolute text-white bg-dark p-2 fs-4 rounded-circle'
                        style={{ top: "1rem", right: "2%", border: "none" }}
                        role="button"
                        onClick={() => setDisplayValue({ displayValue: false })}
                    >
                        <AiOutlineClose />
                    </span>
                </div>
                <div className='position-relative d-flex flex-column gap-4 py-3' style={{ background: "linear-gradient(transparent 0%, #181818 1%)", top: "72%", left: "0" }}>
                    <div className='w-100 position-absolute' style={{ height: "5vh", background: "linear-gradient(transparent 1%, #181818 40%)", top: "-1rem" }}></div>
                    <div className='d-flex justify-content-between align-items-start px-2 px-md-4 px-lg-5 py-5'>
                        <div className='d-flex flex-column gap-4' style={{ width: "60%" }}>
                            <div className='d-flex flex-wrap align-items-center gap-3 fs-6' style={{ color: "#969695" }}>
                                <span className='text-success'>Recommended 90%</span>
                                <span> {dataC.jawSummary.releaseYear} </span>
                                {
                                    dataC.jawSummary.type === 'show' ? <span style={{ color: "#969695" }} className="movieOrSerie">
                                        {dataC.episodeCount} episodes
                                    </span> : (dataC.jawSummary.type === 'movie' ? <span style={{ color: "#969695" }} className='movieOrSerie'>
                                        {Math.trunc(dataC.jawSummary.runtime / 3600)} h {Math.trunc((dataC.jawSummary.runtime % 3600) / 60)} min
                                    </span> : '')
                                }
                                <span>{dataC.jawSummary.delivery.quality}</span>
                            </div>
                            <div className='d-flex flex-wrap align-items-center gap-3 text-white fw-light'>
                                <span className='bg-danger px-1 py-2 fs-6 rounded'>A14</span>
                                {dataC.jawSummary.tags.map((item) => (
                                    <span key={item.id}> {item.name} {item.id !== dataC.jawSummary.tags[dataC.jawSummary.tags.length - 1] ? ', ' : ''} </span>
                                ))}
                            </div>
                            <div className='d-flex flex-wrap text-white'>
                                {dataC.jawSummary.synopsis}
                            </div>
                        </div>
                        <div className='d-flex flex-wrap flex-column gap-3 text-white'>
                            <p>
                                <span style={{ color: "#969695" }}>Distribution:</span>
                                {
                                    dataC.jawSummary.cast.map(item => (
                                        <span key={item.id}>
                                            {item.name} {item.id !== dataC.jawSummary.cast[dataC.jawSummary.cast.length - 1] ? ', ' : ''}
                                        </span>
                                    ))
                                }
                            </p>
                            <p>
                                <span style={{ color: "#969695" }}>Genres:</span>
                                {
                                    dataC.jawSummary.genres.map(item => (
                                        <span key={item.id}>
                                            {item.name} {item.id !== dataC.jawSummary.genres[dataC.jawSummary.genres.length - 1] ? ', ' : ''}
                                        </span>
                                    ))
                                }
                            </p>
                            <p>
                                <span style={{ color: "#969695" }}>this movie is:</span> great, suspense
                            </p>
                        </div>
                    </div>
                    <div className='w-100 position-relative d-flex flex-column gap-2 px-2'>
                        <h2 className='text-white fs-2'>Similar titles</h2>
                        <div className='similar-titles'>

                            {
                                similarTitles.map(item => (
                                    <div
                                        key={item.id}
                                        className='d-flex flex-column gap-2 rounded overflow-hidden'
                                        style={{ background: "#2f2f2f", border: "none" }}
                                        role="button"
                                        onMouseOver={() => setHoverSimilarTitle(true)}
                                        onMouseOut={() => setHoverSimilarTitle(false)}
                                    >
                                        <div className='position-relative w-100'>
                                            {<Image src={`${item.jawSummary.backgroundImage.url}.${item.jawSummary.backgroundImage.extension}`} alt="Picture" width={item.jawSummary.backgroundImage.width} height={item.jawSummary.backgroundImage.height} style={{ width: "100%", height: "100%", objectFit: "fill" }} />}
                                            <div className='position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end py-3 px-2' style={{ background: "rgba(0, 0, 0, .7)" }}>
                                                <Image src={`${item.jawSummary.logoImage.url}`} alt="Picture" width={item.jawSummary.logoImage.width} height={item.jawSummary.logoImage.height} style={{ width: "100%", height: "auto", objectFit: "cover" }} />
                                            </div>
                                            <p className='position-absolute top-0 end-0 text-white px-2 py-1'>
                                                {
                                                    item.jawSummary.type === 'show' ? <span style={{ color: "#969695" }} className="movieOrSerie">
                                                        {item.episodeCount} episodes
                                                    </span> : (item.jawSummary.type === 'movie' ? <span style={{ color: "#969695" }} className='movieOrSerie'>
                                                        {Math.trunc(item.jawSummary.runtime / 3600)} h {Math.trunc((item.jawSummary.runtime % 3600) / 60)} min
                                                    </span> : '')
                                                }
                                            </p>
                                            <p className={`text-white fs-3 border d-${hoverSimilarTitle ? 'flex' : 'none'} align-items-center justify-content-center p-3 position-absolute top-50 start-50 translate-middle rounded-circle`} style={{ background: "rgba(0, 0, 0, .5)" }}> <FaPlay /> </p>
                                        </div>
                                        <div className='d-flex align-items-center justify-content-between px-2'>
                                            <div className='d-flex flex-column gap-1'>
                                                <div className='text-success'>Recommended 80%</div>
                                                <p className='d-flex align-items-center gap-2 text-white'>
                                                    <span className='px-1 py-1 bg-danger rounded' style={{ fontSize: "12px" }}>A14</span>
                                                    <span>{item.jawSummary.releaseYear}</span>
                                                </p>
                                            </div>
                                            <div className='text-white border d-flex align-items-center justify-content-center fs-4 p-1 rounded-circle'>
                                                <BsPlusLg />
                                            </div>
                                        </div>
                                        <p className='text-white d-flex flex-wrap px-2 desc'>
                                            {item.jawSummary.synopsis}
                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal