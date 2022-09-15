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
    <div className={post.post}>
        <div>
            <span className={post.usernamePost}>{name}</span>: {text}
        </div>
        <div className={post.item}>
            <Suspense fallback={<Preloader/>}>
               <PhotoPost />
            </Suspense>
            <div><span className={post.item}>Like: 0</span></div>
        </div>
    </div>
    );
}

export default Post;