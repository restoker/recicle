'use client'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import React, { useRef } from 'react'

gsap.registerPlugin(SplitText);

const TitleHero = () => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {

        const split = SplitText.create([titleRef.current, subtitleRef.current], {
            type: 'words, lines',
            mask: 'lines',
            linesClass: 'line++',
            autoSplit: true,
        })
        const tl = gsap.timeline();
        tl.from(split.words, {
            autoAlpha: 0,
            y: 100,
            duration: 1,
            stagger: 0.05,
        })
    }, { dependencies: [] })

    return (
        <>
            <h1 ref={titleRef} className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Issue management for growing teams
            </h1>
            <p ref={subtitleRef} className="mt-6 text-xl text-gray-500">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
            </p>
        </>
    )
}

export default TitleHero