import AuthForm from "./AuthForm";

export default function Login() {
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
    }
  ]

  return (
    <AuthForm
      authEndpoint={"login"}
      fields={fields}
      formName={"Zaloguj się"}
      shortText={"Login/Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing."}
    />
  );
}