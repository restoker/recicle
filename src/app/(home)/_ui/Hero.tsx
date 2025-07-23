'use client';
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Hero = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    useGSAP(() => {
        const tl = gsap.timeline();
        tl
            .from(videoRef.current, {
                yPercent: -100,
                ease: "elastic.out(1, 0.75)",
                duration: 1.2,
            })
            .from(videoRef.current, {
                clipPath: "circle(3.5%)",
                ease: "power3.out",
                duration: 1.2,
            });
    }, [])

    return (
        <>
            <video
                ref={videoRef}
                muted
                autoPlay
                loop
                src="https://cdn.cosmos.so/c4d37de1-365e-4b4c-bd42-3dd0df8708f9.mp4"
                className="w-full rounded-md shadow-xl ring-1 ring-black/20 ring-opacity-5 lg:h-full lg:w-full lg:object-cover [clip-path:circle(100%)]"
            ></video>
        </>
    )
}

export default Hero