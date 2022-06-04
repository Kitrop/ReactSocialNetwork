import info from './ProfileInfo.module.css';

function ProfileInfo() {
    return (
        <div>
            <div>
                <img className={info.bg_image}
                     src={"https://flytothesky.ru/wp-content/uploads/2012/10/midnight-sun-in-lofoten-norway.jpg"}/>
            </div>
            <div className={info.descriptionBlock}>
                ava + desc
            </div>
        </div>
    );
}
export default ProfileInfo;