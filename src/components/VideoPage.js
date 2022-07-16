import React from 'react';
import "./VideoPage.css";
import VideoCard from "./VideoCard"

function RecomendetVideo() {
    return (
        <div className='recomendetVideo'>
            <h2>
                Last added video
            </h2>
            <div className='recomendedVideos__videos'>
                <VideoCard
                    title="BecomeaWeb Developer in 10 minutes|2019/2020"
                    views="2.3M Views"
                    timestamp="3days ago"
                    channelImage="https://yt3.ggpht.com/FjeN785fVWx0Pr6xCbwPhhq8hHj_gocc3FygDXYDEQgp2gE_FQzRNsFHFAjQ3oE-VJaeGR1a=s88-c-k-c0x00ffffff-no-rj"
                    channel="Sonny Sangha"
                    image="https://i.ytimg.com/vi/UaB_FtsdlYk/hqdefault.jpg?"
                />
                <VideoCard
                    title="5Uses for cloud functions"
                    views="850K Views"
                    timestamp="1days ago"
                    channelImage="https://yt3.ggpht.com/ytc/AKedOLR5CDv14gL4DQ7I4gxIlBMY6u-CNsq2qfeev48R2g=s68-c-k-c0x00ffffff-no-rj"
                    channel="Firebase"
                    image="https://i.ytimg.com/an_webp/77XmRDtOL7c/mqdefault_6s.webp?du=3000&sqp=CJ3JuJQG&rs=AOn4CLAWGmze7s5JmVBsR0hZJXhyXZFL3g"
                />
                <VideoCard
                    title="The Truth about OnePlus Nord!"
                    views="5M Views"
                    timestamp="58 Minutes ago"
                    channelImage="https://yt3.ggpht.com/a-/A0h14Gh18U30eJ01"
                    channel="Marques Brownlee"
                    image="https://i.ytimg.com/vi/Xzh8BdaaAvs/hq720.jpg?sqp"
                />
                <VideoCard
                    title="Whether we like it or not ..."
                    views="2M Views"
                    timestamp="4days ago"
                    channelImage="https://yt3.ggpht.com/a-/A0h14GjNWIVnoFb"
                    channel="Christian Guzman"
                    image="https://i.ytimg.com/vi/5JGlr-FVKsk/hq720.jpg?sqp"
                />
                <VideoCard
                    title="BecomeaWeb Developer in 10 minutes|2019/2020"
                    views="2.3M Views"
                    timestamp="3days ago"
                    channelImage="https://yt3.ggpht.com/FjeN785fVWx0Pr6xCbwPhhq8hHj_gocc3FygDXYDEQgp2gE_FQzRNsFHFAjQ3oE-VJaeGR1a=s88-c-k-c0x00ffffff-no-rj"
                    channel="Sonny Sangha"
                    image="https://i.ytimg.com/vi/UaB_FtsdlYk/hqdefault.jpg?"
                />
                <VideoCard
                    title="5Uses for cloud functions"
                    views="850K Views"
                    timestamp="1days ago"
                    channelImage="https://yt3.ggpht.com/ytc/AKedOLR5CDv14gL4DQ7I4gxIlBMY6u-CNsq2qfeev48R2g=s68-c-k-c0x00ffffff-no-rj"
                    channel="Firebase"
                    image="https://i.ytimg.com/vi/77XmRDt0L7c/hq720.jpg?sqp"
                />
                <VideoCard
                    title="The Truth about OnePlus Nord!"
                    views="5M Views"
                    timestamp="58 Minutes ago"
                    channelImage="https://yt3.ggpht.com/a-/A0h14Gh18U30eJ01"
                    channel="Marques Brownlee"
                    image="https://i.ytimg.com/vi/Xzh8BdaaAvs/hq720.jpg?sqp"
                />
                <VideoCard
                    title="Whether we like it or not ..."
                    views="2M Views"
                    timestamp="4days ago"
                    channelImage="https://yt3.ggpht.com/a-/A0h14GjNWIVnoFb"
                    channel="Christian Guzman"
                    image="https://i.ytimg.com/vi/5JGlr-FVKsk/hq720.jpg?sqp"
                />
            </div>
        </div>
    )
}

export default RecomendetVideo
