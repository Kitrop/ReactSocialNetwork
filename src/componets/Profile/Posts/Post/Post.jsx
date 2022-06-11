import post from './Post.module.css'
function Wall(props) {
    return (
    <div>
        <div className={post.item}>
            {props.name}: {props.text}
        </div>
        <div className={post.item}>
            <img src={"https://funik.ru/wp-content/uploads/2019/09/f48cfb0030457662a30d-700x467.jpg"} alt={"img_post"}/>
            <div><span>Like: {props.likeCount}</span></div>
        </div>
    </div>
    );
}

export default Wall;