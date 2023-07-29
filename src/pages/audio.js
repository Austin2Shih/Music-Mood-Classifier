import AudioPlayer from "@/components/AudioPlayer";

const url = 'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3'

export default function Audio() {
    return (
        <div>
            <AudioPlayer audioFileUrl={url}/>
        </div>
    )
}