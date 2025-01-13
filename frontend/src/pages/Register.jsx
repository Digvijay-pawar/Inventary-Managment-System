import { useForm } from 'react-hook-form';
import useRegister from '../hooks/useRegister';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { mutate, status } = useRegister();

    const isLoading = status === 'pending';

    const onSubmit = (data) => {
        mutate(data);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control mb-4">
                        <label htmlFor="name" className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="input input-bordered w-full"
                            {...register('name', {
                                required: "Name is required"
                            })}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name.message}</p>
                        )}
                    </div>

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
                            {...register('password', { required: "Password is required" })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>

                    <button disabled={isLoading} type="submit" className="btn btn-primary w-full">
                        {isLoading ? "Loading..." : "Register"}
                    </button>

                    <p className="text-center mt-4">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-500 hover:underline">
                            Login
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
