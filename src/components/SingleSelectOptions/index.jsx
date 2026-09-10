const SingleSelectOptions =(props) => {

    const { setOfOptions } = props;
    const {id, text, is_correct} = setOfOptions;

    return (
        <div className="single-select-options">
            {setOfOptions.map((option) => (
                <button key={option.id} className="option-button">
                    {option.text}
                </button>
            ))}
        </div>
    );
}

export default SingleSelectOptions;