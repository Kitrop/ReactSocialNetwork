import post from './Post.module.css'
import {lazy, Suspense} from 'react'
import Preloader from '../../../common/Preloader/Preloader'

const PhotoPost = lazy(() => import ('../PhotoPost/PhotoPost'))

const Post = (props) => {

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return (
    <div>
        <div className={post.item}>
            {props.name}: {props.text}
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