import info from './ProfileInfo.module.css';
import Preloader from "../../preloader/Preloader";

function ProfileInfo(props) {
    if(!props.profile) {
        return <Preloader />
    }
    return (
        <div>
            <div>
                <img className={info.bg_image}
                     src={"https://flytothesky.ru/wp-content/uploads/2012/10/midnight-sun-in-lofoten-norway.jpg"} alt={'img'}/>
            </div>
            <div className={info.descriptionBlock}>
                <img src={props.profile.photos.large} alt={'avatar'} />
            </div>
        </div>
    );
}
export default ProfileInfo;