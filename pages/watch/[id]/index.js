import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import { FaPlay, FaArrowLeft, FaPause } from "react-icons/fa"
import { FiRotateCcw, FiRotateCw } from "react-icons/fi"
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5"
import { TfiCommentAlt } from "react-icons/tfi"
import { SiSpeedtest } from "react-icons/si"
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs"

const Watch = ({ data }) => {

    const [playItem, setPlayItem] = useState(false)
    const [isEnd, setIsEnd] = useState(false)
    const [fullTime, setFullTime] = useState({
        hour: 0,
        minutes: 0,
        second: 0
    })
    const [volume, setVolume] = useState(true)
    const [isFullscreen, setIsFullscreen] = useState(false)

    const router = useRouter()

    const videoRef = useRef(),
        progressBarRef = useRef(),
        progressBarThumb = useRef(),
        containerDiv = useRef()

    let timeOut

    useEffect(() => {
        playFunc()

        return () => {
            clearInterval(timeOut)
        }
    }, [])


    async function playFunc() {
        try {
            setPlayItem(true)
            await videoRef.current.play()
        } catch (err) {
            console.log("erreur")
        }
    }

    const playPauseFunction = () => {
        if (playItem) {
            setPlayItem(false)
            videoRef.current.pause()
        } else {
            playFunc()
        }
    }

    const handleDuration = (timeChanged) => {
        setFullTime({
            hour: Math.trunc(timeChanged / 3600),
            minutes: Math.trunc((timeChanged % 3600) / 60),
            second: Math.trunc(((timeChanged % 3600) % 60))
        })
    }

    //Progress TimeLine bar video
    const handleProgress = e => {
        let { currentTime, duration } = videoRef.current
        let percent = (currentTime / duration) * 100
        progressBarRef.current.style.width = `${percent}%`
        progressBarThumb.current.style.left = `${percent}%`

        handleDuration(duration - currentTime)

        if (percent === 100) {
            setIsEnd(true)
        }
    }

    //getting timeLine bar video
    const getProgress = e => {
        let timelineWidth = e.target.clientWidth
        if (e.clientX <= timelineWidth) {
            videoRef.current.currentTime = (e.clientX / timelineWidth) * videoRef.current.duration
        }
    }

    const handleForward = () => {
        videoRef.current.currentTime += 10
    }
    const handleBackward = () => {
        videoRef.current.currentTime -= 10
    }

    const handleVolume = () => {
        setVolume(prevState => (
            !prevState
        ))
        if (volume) {
            videoRef.current.volume = 0.0 //Muted
        } else {
            videoRef.current.volume = 0.5 //volume
        }
    }

    const handleFullScreen = () => {
        containerDiv.current.classList.toggle("fullscreen")
        if (document.fullscreenElement) {
            setIsFullscreen(false)
            // If video is already in fullscreen
            return document.exitFullscreen()
        }
        setIsFullscreen(true)
        containerDiv.current.requestFullscreen() //Go to fullscreen mode
    }


    return (
        <div className="w-100 overflow-hidden position-relative" ref={containerDiv} style={{ height: "100vh" }}>

            <div className='w-100 h-100 d-flex align-items-center justify-content-center z-1 container-video'>
                <video autoPlay width="500" height="500" ref={videoRef} onTimeUpdate={handleProgress}>
                    <source src='/vide.mp4' type='video/mp4' />
                </video>
            </div>
            <div className="position-fixed top-0 left-0 bg-transparent d-flex flex-column align-items-center justify-content-between gap-4 py-4 px-3 w-100 h-100 z-3">
                <div className="w-100 py-2 bg-transparent d-flex align-items-center justify-content-between z-3">
                    <div className="d-flex align-items-center gap-4">
                        <span className="d-flex align-items-center justify-content-center fs-1 text-white" onClick={() => router.push("/browse")}> <FaArrowLeft style={{ cursor: "pointer" }} /> </span>
                        { data.jawSummary && <span className="text-white fs-5"> {data.jawSummary.title} </span>}
                    </div>

                </div>
                <div className="w-100 d-flex flex-column gap-3 align-center">
                    <div className="d-flex align-items-center justify-content-between gap-2">
                        <div
                            className="position-relative" role="button"
                            style={{ width: "97%", backgroundColor: "rgba(255, 255, 255, .6)", height: "4px", borderRadius: "5px" }}
                            onClick={getProgress}
                        >
                            <div className="progress-bar" ref={progressBarRef}></div>
                            <span className="progress-thumb" ref={progressBarThumb}></span>
                        </div>
                        <span className="text-white">
                            {
                                fullTime.hour !== 0 ?
                                    (
                                        `(${fullTime.hour}):(${fullTime.minutes > 9 ? fullTime.minutes : `0${fullTime.minutes}`}):(${fullTime.second > 9 ? fullTime.second : `0${fullTime.second}`})`
                                    )
                                    : (
                                        `${fullTime.minutes > 9 ? fullTime.minutes : `0${fullTime.minutes}`}:${fullTime.second > 9 ? fullTime.second : `0${fullTime.second}`}`
                                    )
                            }
                        </span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between w-100">
                        <div className="d-flex align-items-center justify-content-center gap-4 fs-1 text-white">
                            <span role="button" onClick={playPauseFunction}> {playItem && !isEnd ? <FaPause className="icon-video" /> : <FaPlay className="icon-video" />} </span>
                            <span role="button" onClick={handleBackward}> <FiRotateCcw className="icon-video" /> </span>
                            <span role="button" onClick={handleForward}> <FiRotateCw className="icon-video" /> </span>
                            <span role="button" onClick={handleVolume}> {volume ? <IoVolumeHighOutline className="icon-video" /> : <IoVolumeMuteOutline className="icon-video" />} </span>
                        </div>
                        <div className="d-flex align-items-center justify-content-center gap-4 fs-1 text-white">
                            <span role="button"> <TfiCommentAlt className="icon-video" /> </span>
                            <span role="button"> <SiSpeedtest className="icon-video" /> </span>
                            <span role="button" onClick={handleFullScreen}>
                                {
                                    !isFullscreen ? <BsFullscreen className="icon-video" /> : <BsFullscreenExit className="icon-video" />
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Watch

export async function getStaticProps(context) {
    const id = context.params.id
    const dataApi = await import("../../api/fake.json")

    const data = dataApi.titles.find(item => item.jawSummary.id.toString() === id)

    if (!data) {

        return {
            notFound: true
        }
    }

    return {
        props: {
            data
        }
    }

}

export async function getStaticPaths() {

    const dataApi = await import("../../api/fake.json")

    const paths = dataApi.titles.map(item => ({
        params: { id: item.jawSummary.id.toString() }
    }))

    return {
        paths,
        fallback: false
    }

}