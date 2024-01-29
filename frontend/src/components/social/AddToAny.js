const AddToAny = ({className}) => {
  return (
    <div className={"a2a_kit a2a_kit_size_32 a2a_default_style" + (className && " " + className)}>
      <a className="a2a_button_facebook"></a>
      <a className="a2a_button_copy_link"></a>
      <a className="a2a_button_x"></a>
      <a className="a2a_button_pinterest"></a>
      <a className="a2a_button_wykop"></a>
      <a className="a2a_button_reddit"></a>
      <a className="a2a_button_whatsapp"></a>
      <a className="a2a_button_facebook_messenger"></a>
      <a className="a2a_button_linkedin"></a>
    </div>
  );
}

export default AddToAny;
