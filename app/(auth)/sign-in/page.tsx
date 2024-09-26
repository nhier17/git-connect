import AuthForm from '@/components/AuthForm'

const SignIn = () => {
  return (
    <section className="flex-center size-full max-sm:px-6 bg-[#101114]">
        <AuthForm type="sign-in" />
    </section>
  )
}

export default SignIn