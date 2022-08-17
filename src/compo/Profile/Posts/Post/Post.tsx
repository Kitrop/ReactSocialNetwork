import post from './Post.module.css'
import {FC, lazy, Suspense} from 'react'
import Preloader from '../../../common/Preloader/Preloader'

const PhotoPost = lazy(() => import ('../PhotoPost/PhotoPost'))

type Props = {
    name: string
    text: string
}

const Post: FC<Props> = ({name, text, }) => {

    function getRndInteger(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return (
    <div>
        <div className={post.item}>
            {name}: {text}
        </div>
        <div className={post.item}>
            <Suspense fallback={<Preloader/>}>
               <PhotoPost />
            </Suspense>
            <div><span>Like: {getRndInteger(0, 100)}</span></div>
        </div>
    </div>
    );
}

export default Post;