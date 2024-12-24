const MissingAccount = () => {
    return (
        <div style={{color: '#f32013'}}>
            The 'account' parameter is missing.
            Please provide the account using an element attribute or in the query string.
        </div>
    );
}

export default MissingAccount;
