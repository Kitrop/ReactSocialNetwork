import post from './Post.module.css'
import {FC, lazy, Suspense} from 'react'
import Preloader from '../../../common/Preloader/Preloader'

const PhotoPost = lazy(() => import ('../PhotoPost/PhotoPost'))

type Props = {
    name: string
    text: string
}

const Post: FC<Props> = ({name, text}) => {

    return (
    <div>
        <div className={post.item}>
            {name}: {text}
        </div>
        <div className={post.item}>
            <Suspense fallback={<Preloader/>}>
               <PhotoPost />
            </Suspense>
            <div><span>Like: 0</span></div>
        </div>
    </div>
    );
}

export default Post;