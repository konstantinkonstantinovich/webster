export default ({ preview, title }) => {
    <div className="project">
        <img src={'http://127.0.0.1:8000/' + preview} alt={title} />
        <p>{title}</p>
    </div>;
};
