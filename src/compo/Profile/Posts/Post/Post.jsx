import post from './Post.module.css'
import postImg from '../../../../img/postImg.jpg'

const Wall = (props) => {

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return (
    <div>
        <div className={post.item}>
            {props.name}: {props.text}
        </div>
        <div className={post.item}>
            <img src={postImg} alt={"img_post"}/>
            <div><span>Like: {getRndInteger(0, 100)}</span></div>
        </div>
    </div>
    );
}

export default Wall;