const ImageOption = (props) => {
  const { setOfOptions } = props;
  const {id , image_url, is_correct, text } = setOfOptions;
  return (
    <div className="image-option">
      {setOfOptions.map((option) => (
        <div key={option.id} className="image-option-container">
          <img src={option.image_url} alt={option.text} className="image-option-image" />
          <p className="image-option-text">{option.text}</p>
        </div>
      ))}
    </div>
  );
}

export default ImageOption;