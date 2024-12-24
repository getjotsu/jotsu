const Fallback = (props: { error: {detail: string} }) => {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre style={{color: '#f32013'}}>{props.error.detail ? props.error.detail : props.error.toString()}</pre>
        </div>
    );
}

export default Fallback;
