export default function Project(props) {
    <div className='project'>
        <img src={"http://127.0.0.1:8000/" + props.preview} alt=''/>
        <p>{props.title}</p>
    </div>
};
