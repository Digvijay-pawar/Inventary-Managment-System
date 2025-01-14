import { useForm, SubmitHandler } from 'react-hook-form';
import useLogin from '../hooks/auth/useLogin';

interface LoginForm {
    email: string;
    password: string;
}

const Login = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginForm>({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const login = useLogin();

    const onSubmit: SubmitHandler<LoginForm> = async (data) => {
        login.mutate(data, {
            onSuccess: () =>{
                reset();
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control mb-4">
                        <label htmlFor="email" className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="input input-bordered w-full"
                            {...register('email', {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: "Please enter a valid email address"
                                }
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="form-control mb-6">
                        <label htmlFor="password" className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="input input-bordered w-full"
                            {...register('password', { 
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters long"
                                }
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={`btn w-full ${login.status === 'pending' ? 'btn-disabled' : 'btn-primary'}`}
                        disabled={login.status === 'pending'}
                    >
                        {login.status === 'pending' ? 'Loading...' : 'Login'}
                    </button>

                    <p className="text-center mt-4">
                        Don't have an account?{' '}
                        <a href="/register" className="text-blue-500 hover:underline">
                            Register
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
