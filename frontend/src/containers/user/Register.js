import AuthForm from "./AuthForm";

const Register = () => {
  const fields = [
    {
      name: "email",
      label: "Adres e-mail",
      type: "email",
      placeholder: "E-mail",
      required: true
    },
    {
      name: "password",
      label: "Hasło",
      type: "password",
      placeholder: "Hasło",
      required: true
    },
    {
      name: "password2",
      label: "Powtórz hasło",
      type: "password",
      placeholder: "Powtórz hasło",
      required: true
    }
  ]

  return (
    <AuthForm
      authEndpoint={"register"}
      fields={fields}
      formName={"Zarejestruj się"}
      shortText={"Register/Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing."}
    />
  );
}

export default Register;