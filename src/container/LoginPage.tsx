import { useUser } from '../hooks/useUser';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

const userSchema = z.object({
    username: z.string().min(3, { message: "Username must contain at least 3 characters" }),
    password: z.string().min(8, { message: "Password must contain at least 8 characters" }),
})

type UserForm = z.infer<typeof userSchema>;

function LoginPage() {

    const { login } = useUser();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<UserForm>({
        defaultValues: {
            username: "",
            password: ""
        },
        resolver: zodResolver(userSchema),
    });

    const onSubmit: SubmitHandler<UserForm> = (data) => {
        login({ username: data.username });
        navigate({ to: '/' });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='animate-fade-in'>
            <Card className='p-4 w-[396px] rounded-lg' style={{ boxShadow: '0 2px 4px #0000001a, 0 8px 16px #0000001a' }}>
                <CardContent className='flex  justify-center items-center flex-col p-4 gap-4'>
                    <div className='w-full'>
                        <Input
                            type='text'
                            placeholder='Username'
                            {...register("username")}
                        />
                    </div>
                    {errors.username && <div className='text-red-500'>{errors.username.message}</div>}
                    <div className='w-full'>
                        <Input
                            type='password'
                            placeholder='Password'
                            {...register("password")}
                        />
                    </div>
                    {errors.password && <div className='text-red-500'>{errors.password.message}</div>}
                </CardContent>
                <CardFooter className='flex justify-center items-center'>
                    <Button type="submit">Login</Button>
                </CardFooter>
            </Card>
        </form>
    )
}

export default LoginPage