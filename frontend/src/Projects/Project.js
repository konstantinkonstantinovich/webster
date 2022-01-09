export default ({ preview, title }) => {
    <div className="project">
        <img
            src={'https://ucode-webster-fork.herokuapp.com' + preview}
            alt={title}
        />
        <p>{title}</p>
    </div>;
};
