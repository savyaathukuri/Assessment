const DefaultOptions = (props) => {
   
    const { setOfOptions } = props;
    const {id, text, is_correct} = setOfOptions;
    return (
        <div className="default-options">
           {setOfOptions.map((options) => {
            return(
                <button key = {options.id} className="option-button">
                    {options.text}
                </button>
                )
           })}
        </div>
    );
}

export default DefaultOptions;