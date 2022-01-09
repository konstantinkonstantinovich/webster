export default ({ preview, title }) => {
    <div className="project">
        <img src={preview} alt={title} />
        <p>{title}</p>
    </div>;
};
