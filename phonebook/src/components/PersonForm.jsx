const PersonForm = ({ onSubmit, name, handleNameOnChange, number, handleNumberOnChange }) => {
    return (
        <>
            <form onSubmit={onSubmit}>
                <div>
                    name: <input value={name} onChange={handleNameOnChange} />
                </div>
                <div>number: <input value={number} onChange={handleNumberOnChange} /></div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default PersonForm;